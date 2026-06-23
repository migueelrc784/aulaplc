from flask import Flask, render_template, send_from_directory, redirect, Response, request, jsonify
from datetime import datetime
import os, json

app = Flask(__name__)

# ── MERCADOPAGO ───────────────────────────────────────────
try:
    import mercadopago
    MP_ACCESS_TOKEN = os.environ.get("MP_ACCESS_TOKEN", "")
    sdk = mercadopago.SDK(MP_ACCESS_TOKEN) if MP_ACCESS_TOKEN else None
except ImportError:
    sdk = None

# ── FIREBASE / FIRESTORE ──────────────────────────────────
_firebase_init_error = None
try:
    import firebase_admin
    from firebase_admin import credentials, firestore as fs

    if not firebase_admin._apps:
        cred_json = os.environ.get("FIREBASE_CREDENTIALS")
        if cred_json:
            cred = credentials.Certificate(json.loads(cred_json))
        elif os.path.exists("serviceAccountKey.json"):
            cred = credentials.Certificate("serviceAccountKey.json")
        else:
            cred = None
            _firebase_init_error = "No se encontró FIREBASE_CREDENTIALS ni serviceAccountKey.json"

        if cred:
            firebase_admin.initialize_app(cred)

    db = fs.client() if firebase_admin._apps else None
except Exception as e:
    print(f"Firebase init error: {e}")
    _firebase_init_error = f"{type(e).__name__}: {e}"
    db = None


# ── DIAGNÓSTICO TEMPORAL (borrar después de usar) ─────────
@app.route("/api/debug/firebase")
def debug_firebase():
    cred_json_raw = os.environ.get("FIREBASE_CREDENTIALS", "")
    info = {
        "db_inicializado": db is not None,
        "firebase_credentials_existe": bool(cred_json_raw),
        "firebase_credentials_largo": len(cred_json_raw),
        "error": _firebase_init_error,
    }
    if cred_json_raw:
        try:
            parsed = json.loads(cred_json_raw)
            info["json_valido"] = True
            info["project_id"] = parsed.get("project_id")
            info["client_email"] = parsed.get("client_email")
        except Exception as e:
            info["json_valido"] = False
            info["json_error"] = str(e)
    return jsonify(info)

PRECIO_POR_CREDITO = 1
MONTOS_VALIDOS     = {1000, 2000, 3000, 5000, 10000}

# ── PÁGINA PRINCIPAL ──────────────────────────────────────
@app.route("/")
def home():
    return redirect("/cursos")

# ── ADS ───────────────────────────────────────────────────
@app.route("/ads.txt")
def ads():
    return send_from_directory("static", "ads.txt")

# ── SECCIONES PRINCIPALES ─────────────────────────────────
@app.route("/cursos")
def cursos():
    return render_template("cursos.html")

@app.route("/cursos/tia-portal")
def tia_portal():
    return render_template("tia-portal.html")

@app.route("/cursos/hmi-scada")
def hmi_scada():
    return render_template("hmi-scada.html")

@app.route("/comunidad")
def comunidad():
    return render_template("comunidad.html")

@app.route("/simulador-plc")
def simulador_plc():
    return render_template("simulador-plc.html")

@app.route("/simulador-vfd")
def simulador_vfd():
    return render_template("simulador-vfd.html")

@app.route("/dudas")
def dudas():
    return render_template("dudas.html")

@app.route("/tienda")
def tienda():
    return render_template("tienda.html")

@app.route("/casino")
def casino():
    return render_template("casino.html")

# ── CASINO: CREAR PREFERENCIA DE PAGO ────────────────────
@app.route("/api/casino/comprar", methods=["POST"])
def casino_comprar():
    if not sdk:
        return jsonify({"error": "Pagos no configurados"}), 503

    data     = request.get_json(silent=True) or {}
    monto    = int(data.get("monto", 0))
    uid      = str(data.get("uid", "")).strip()

    # Bloquear compras sin sesión iniciada
    if not uid or uid == "anonimo":
        return jsonify({"error": "Debes iniciar sesión para comprar créditos"}), 401

    if not db:
        return jsonify({"error": "Servicio no disponible"}), 503

    # Verificar que el uid corresponda a un usuario real registrado
    user_snap = db.collection("usuarios").document(uid).get()
    if not user_snap.exists:
        return jsonify({"error": "Usuario no válido"}), 401

    if monto not in MONTOS_VALIDOS:
        return jsonify({"error": "Monto inválido"}), 400

    creditos = monto * PRECIO_POR_CREDITO

    preference_data = {
        "items": [{
            "title":       f"Ruleta AulaPLC — {creditos:,} créditos",
            "quantity":    1,
            "unit_price":  monto,
            "currency_id": "CLP"
        }],
        "metadata": {
            "uid":      uid,
            "creditos": creditos
        },
        "back_urls": {
            "success": "https://aulaplc.com/casino?mp_status=approved",
            "failure": "https://aulaplc.com/casino?mp_status=failure",
            "pending": "https://aulaplc.com/casino?mp_status=pending"
        },
        "auto_return":      "approved",
        "notification_url": "https://aulaplc.com/api/casino/webhook"
    }

    result = sdk.preference().create(preference_data)

    if result["status"] != 201:
        return jsonify({"error": "Error MercadoPago"}), 500

    return jsonify({"init_point": result["response"]["init_point"]})


# ── CASINO: WEBHOOK MERCADOPAGO ───────────────────────────
@app.route("/api/casino/webhook", methods=["POST"])
def casino_webhook():
    if not sdk or not db:
        return "", 200

    data  = request.get_json(silent=True) or {}
    topic = request.args.get("topic") or data.get("type", "")

    if topic not in ("payment", "payment.updated"):
        return "", 200

    payment_id = (
        str((data.get("data") or {}).get("id", ""))
        or request.args.get("id", "")
    )

    if not payment_id:
        return "", 200

    # Evitar doble acreditación (chequeo rápido, la protección real es el create() atómico de abajo)
    pago_ref = db.collection("mp_pagos").document(payment_id)
    if pago_ref.get().exists:
        return "", 200

    # Verificar pago con MP
    payment_info = sdk.payment().get(payment_id)
    payment      = payment_info.get("response", {})

    if payment.get("status") != "approved":
        return "", 200

    metadata = payment.get("metadata", {})
    uid      = metadata.get("uid", "")
    creditos = int(metadata.get("creditos", 0))

    if not uid or uid == "anonimo" or creditos <= 0:
        return "", 200

    # Marcar como procesado de forma ATÓMICA: create() falla si el documento
    # ya existe, evitando que dos webhooks simultáneos (reintentos de MP)
    # acrediten el mismo pago dos veces.
    try:
        pago_ref.create({
            "payment_id": payment_id,
            "uid":        uid,
            "creditos":   creditos,
            "procesado":  True,
            "fecha":      datetime.utcnow().isoformat()
        })
    except Exception:
        # Ya fue creado por otra petición concurrente: pago ya procesado
        return "", 200

    # Acreditar con transacción atómica
    user_ref = db.collection("usuarios").document(uid)

    @fs.transactional
    def acreditar(transaction, ref):
        snap     = ref.get(transaction=transaction)
        actuales = (snap.to_dict() or {}).get("casino_credits", 0)
        transaction.update(ref, {"casino_credits": actuales + creditos})

    try:
        acreditar(db.transaction(), user_ref)
    except Exception as e:
        pago_ref.delete()
        print(f"Error acreditando créditos: {e}")
        return "", 500

    return "", 200


# ── SITEMAP ───────────────────────────────────────────────
@app.route("/sitemap.xml")
def sitemap():
    pages = [
        {"url": "/cursos",            "priority": "1.0", "changefreq": "weekly"},
        {"url": "/simulador-plc",     "priority": "0.9", "changefreq": "weekly"},
        {"url": "/simulador-vfd",     "priority": "0.9", "changefreq": "weekly"},
        {"url": "/cursos/tia-portal", "priority": "0.8", "changefreq": "monthly"},
        {"url": "/cursos/hmi-scada",  "priority": "0.8", "changefreq": "monthly"},
        {"url": "/comunidad",         "priority": "0.7", "changefreq": "daily"},
        {"url": "/dudas",             "priority": "0.6", "changefreq": "weekly"},
        {"url": "/tienda",            "priority": "0.6", "changefreq": "weekly"},
    ]
    today = datetime.utcnow().strftime("%Y-%m-%d")
    xml   = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml  += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    for page in pages:
        xml += (
            f'  <url>\n'
            f'    <loc>https://aulaplc.com{page["url"]}</loc>\n'
            f'    <lastmod>{today}</lastmod>\n'
            f'    <changefreq>{page["changefreq"]}</changefreq>\n'
            f'    <priority>{page["priority"]}</priority>\n'
            f'  </url>\n'
        )
    xml += '</urlset>'
    return Response(xml, mimetype="application/xml")


# ── ROBOTS.TXT ────────────────────────────────────────────
@app.route("/robots.txt")
def robots():
    content = (
        "User-agent: *\n"
        "Allow: /\n"
        "Disallow: /static/\n\n"
        "Sitemap: https://aulaplc.com/sitemap.xml\n"
    )
    return Response(content, mimetype="text/plain")


if __name__ == "__main__":
    app.run(debug=True)