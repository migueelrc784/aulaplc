from flask import Flask, render_template, send_from_directory, redirect, Response, request, jsonify
from datetime import datetime
import mercadopago
import firebase_admin
from firebase_admin import credentials, firestore

app = Flask(__name__)

# ── MERCADOPAGO ───────────────────────────────────────────
MP_ACCESS_TOKEN = "TU_ACCESS_TOKEN_DE_PRODUCCION"   # ← reemplaza esto
sdk = mercadopago.SDK(MP_ACCESS_TOKEN)

# ── FIREBASE / FIRESTORE ──────────────────────────────────
# Solo inicializa si no está ya inicializado (evita error en recargas)
if not firebase_admin._apps:
    cred = credentials.Certificate("serviceAccountKey.json")  # ← tu archivo de credenciales
    firebase_admin.initialize_app(cred)

db = firestore.client()

PRECIO_POR_CREDITO = 1   # 1 peso chileno = 1 crédito
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
    """
    Recibe: { "monto": 3000, "uid": "abc123" }
    Devuelve: { "init_point": "https://www.mercadopago.cl/..." }
    """
    data   = request.get_json(silent=True) or {}
    monto  = int(data.get("monto", 0))
    uid    = str(data.get("uid", "anonimo"))

    if monto not in MONTOS_VALIDOS:
        return jsonify({"error": "Monto inválido"}), 400

    creditos = monto * PRECIO_POR_CREDITO

    preference_data = {
        "items": [{
            "title":      f"Ruleta AulaPLC — {creditos:,} créditos",
            "quantity":   1,
            "unit_price": monto,
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
        "auto_return":        "approved",
        "notification_url":   "https://aulaplc.com/api/casino/webhook"
    }

    result = sdk.preference().create(preference_data)

    if result["status"] != 201:
        return jsonify({"error": "Error al crear preferencia en MercadoPago"}), 500

    init_point = result["response"]["init_point"]
    return jsonify({"init_point": init_point})


# ── CASINO: WEBHOOK MERCADOPAGO ───────────────────────────
@app.route("/api/casino/webhook", methods=["POST"])
def casino_webhook():
    """
    MercadoPago llama aquí cuando se confirma un pago.
    Acredita los créditos en Firestore según el monto pagado.
    """
    data  = request.get_json(silent=True) or {}
    topic = request.args.get("topic") or data.get("type", "")

    # MP también puede enviar topic=payment como query param
    if topic not in ("payment", "payment.updated"):
        return "", 200

    payment_id = (
        str((data.get("data") or {}).get("id", ""))
        or request.args.get("id", "")
    )

    if not payment_id:
        return "", 200

    # ── Evitar doble acreditación ──
    pago_ref = db.collection("mp_pagos").document(payment_id)
    if pago_ref.get().exists:
        return "", 200   # ya procesado antes

    # ── Verificar estado del pago con la API de MP ──
    payment_info = sdk.payment().get(payment_id)
    payment      = payment_info.get("response", {})

    if payment.get("status") != "approved":
        return "", 200

    # ── Leer metadata que pusimos al crear la preferencia ──
    metadata = payment.get("metadata", {})
    uid      = metadata.get("uid", "")
    creditos = int(metadata.get("creditos", 0))

    if not uid or uid == "anonimo" or creditos <= 0:
        return "", 200

    # ── Marcar pago como procesado (antes de acreditar, por seguridad) ──
    pago_ref.set({
        "payment_id": payment_id,
        "uid":        uid,
        "creditos":   creditos,
        "procesado":  True,
        "fecha":      datetime.utcnow().isoformat()
    })

    # ── Acreditar créditos con transacción atómica ──
    user_ref = db.collection("usuarios").document(uid)

    @firestore.transactional
    def acreditar(transaction, ref):
        snap     = ref.get(transaction=transaction)
        actuales = (snap.to_dict() or {}).get("casino_credits", 0)
        transaction.update(ref, {"casino_credits": actuales + creditos})

    try:
        acreditar(db.transaction(), user_ref)
    except Exception as e:
        # Si falla la transacción, borramos el registro para poder reintentar
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