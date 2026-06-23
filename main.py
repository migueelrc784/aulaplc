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

        if cred:
            firebase_admin.initialize_app(cred)

    db = fs.client() if firebase_admin._apps else None
except Exception as e:
    print(f"Firebase init error: {e}")
    db = None

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


# ── CASINO: SOLICITAR RETIRO ───────────────────────────────
RETIRO_MINIMO = 1000

TIPOS_CUENTA_VALIDOS = {"cuenta_rut", "cuenta_corriente", "cuenta_vista", "cuenta_ahorro"}

@app.route("/api/casino/retiro", methods=["POST"])
def casino_retiro():
    if not db:
        return jsonify({"error": "Servicio no disponible"}), 503

    data       = request.get_json(silent=True) or {}
    uid        = str(data.get("uid", "")).strip()
    datos_pago_raw = data.get("datos_pago") or {}

    if not isinstance(datos_pago_raw, dict):
        return jsonify({"error": "Datos de pago inválidos"}), 400

    nombre        = str(datos_pago_raw.get("nombre", "")).strip()
    apellido      = str(datos_pago_raw.get("apellido", "")).strip()
    rut           = str(datos_pago_raw.get("rut", "")).strip()
    banco         = str(datos_pago_raw.get("banco", "")).strip()
    tipo_cuenta   = str(datos_pago_raw.get("tipo_cuenta", "")).strip()
    numero_cuenta = str(datos_pago_raw.get("numero_cuenta", "")).strip()
    correo        = str(datos_pago_raw.get("correo", "")).strip()

    try:
        monto = int(data.get("monto", 0))
    except (TypeError, ValueError):
        return jsonify({"error": "Monto inválido"}), 400

    if not uid or uid == "anonimo":
        return jsonify({"error": "Debes iniciar sesión para retirar"}), 401

    if monto < RETIRO_MINIMO:
        return jsonify({"error": f"El monto mínimo de retiro es {RETIRO_MINIMO}"}), 400

    if not all([nombre, apellido, rut, banco, numero_cuenta, correo]):
        return jsonify({"error": "Debes completar todos los datos de pago"}), 400

    if tipo_cuenta not in TIPOS_CUENTA_VALIDOS:
        return jsonify({"error": "Tipo de cuenta inválido"}), 400

    if "@" not in correo:
        return jsonify({"error": "Correo inválido"}), 400

    datos_pago = {
        "nombre":        nombre,
        "apellido":      apellido,
        "rut":           rut,
        "banco":         banco,
        "tipo_cuenta":   tipo_cuenta,
        "numero_cuenta": numero_cuenta,
        "correo":        correo,
    }

    user_ref = db.collection("usuarios").document(uid)
    user_snap = user_ref.get()
    if not user_snap.exists:
        return jsonify({"error": "Usuario no válido"}), 401

    # Descontar el saldo de forma atómica: falla si no hay saldo suficiente,
    # evitando que el usuario quede con saldo negativo o retire dos veces
    # el mismo crédito con solicitudes simultáneas.
    @fs.transactional
    def descontar(transaction, ref):
        snap     = ref.get(transaction=transaction)
        actuales = (snap.to_dict() or {}).get("casino_credits", 0)
        if actuales < monto:
            raise ValueError("saldo_insuficiente")
        transaction.update(ref, {"casino_credits": actuales - monto})
        return actuales - monto

    try:
        nuevo_saldo = descontar(db.transaction(), user_ref)
    except ValueError:
        return jsonify({"error": "Saldo insuficiente"}), 400
    except Exception as e:
        print(f"Error descontando saldo para retiro: {e}")
        return jsonify({"error": "Error al procesar el retiro"}), 500

    # Crear la solicitud de retiro pendiente de pago manual
    retiro_ref = db.collection("retiros").document()
    retiro_ref.set({
        "uid":         uid,
        "monto":       monto,
        "datos_pago":  datos_pago,
        "estado":      "pendiente",
        "fecha":       datetime.utcnow().isoformat()
    })

    return jsonify({"ok": True, "nuevo_saldo": nuevo_saldo, "retiro_id": retiro_ref.id})


# ── CASINO: GESTIÓN DE RETIROS (admin) ────────────────────
# Endpoints protegidos con RECOVERY_SECRET_KEY (header X-Recovery-Key)
# para que el dueño del sitio liste, apruebe o rechace solicitudes.

@app.route("/api/casino/retiros", methods=["GET"])
def casino_listar_retiros():
    secret = os.environ.get("RECOVERY_SECRET_KEY", "")
    if not secret or request.headers.get("X-Recovery-Key", "") != secret:
        return jsonify({"error": "No autorizado"}), 401
    if not db:
        return jsonify({"error": "Servicio no disponible"}), 503

    estado = request.args.get("estado", "pendiente")
    query  = db.collection("retiros")
    if estado != "todos":
        query = query.where("estado", "==", estado)

    docs = query.stream()
    retiros = []
    for d in docs:
        item = d.to_dict()
        item["id"] = d.id
        retiros.append(item)

    retiros.sort(key=lambda r: r.get("fecha", ""), reverse=True)
    return jsonify({"retiros": retiros})


@app.route("/api/casino/retiros/<retiro_id>/marcar-pagado", methods=["POST"])
def casino_marcar_pagado(retiro_id):
    secret = os.environ.get("RECOVERY_SECRET_KEY", "")
    if not secret or request.headers.get("X-Recovery-Key", "") != secret:
        return jsonify({"error": "No autorizado"}), 401
    if not db:
        return jsonify({"error": "Servicio no disponible"}), 503

    retiro_ref = db.collection("retiros").document(retiro_id)
    snap = retiro_ref.get()
    if not snap.exists:
        return jsonify({"error": "Retiro no encontrado"}), 404
    if snap.to_dict().get("estado") != "pendiente":
        return jsonify({"error": "Este retiro ya fue procesado"}), 400

    retiro_ref.update({
        "estado":      "pagado",
        "fecha_pago":  datetime.utcnow().isoformat()
    })
    return jsonify({"ok": True})


@app.route("/api/casino/retiros/<retiro_id>/rechazar", methods=["POST"])
def casino_rechazar_retiro(retiro_id):
    secret = os.environ.get("RECOVERY_SECRET_KEY", "")
    if not secret or request.headers.get("X-Recovery-Key", "") != secret:
        return jsonify({"error": "No autorizado"}), 401
    if not db:
        return jsonify({"error": "Servicio no disponible"}), 503

    retiro_ref = db.collection("retiros").document(retiro_id)
    snap = retiro_ref.get()
    if not snap.exists:
        return jsonify({"error": "Retiro no encontrado"}), 404

    retiro = snap.to_dict()
    if retiro.get("estado") != "pendiente":
        return jsonify({"error": "Este retiro ya fue procesado"}), 400

    uid    = retiro.get("uid")
    monto  = int(retiro.get("monto", 0))
    user_ref = db.collection("usuarios").document(uid)

    # Devolver los créditos al usuario de forma atómica
    @fs.transactional
    def devolver(transaction, ref):
        snap_u   = ref.get(transaction=transaction)
        actuales = (snap_u.to_dict() or {}).get("casino_credits", 0)
        transaction.update(ref, {"casino_credits": actuales + monto})

    try:
        devolver(db.transaction(), user_ref)
    except Exception as e:
        print(f"Error devolviendo créditos al rechazar retiro: {e}")
        return jsonify({"error": "Error al devolver créditos"}), 500

    retiro_ref.update({
        "estado":      "rechazado",
        "fecha_pago":  datetime.utcnow().isoformat()
    })
    return jsonify({"ok": True})


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


# ── CASINO: RECUPERACIÓN DE PAGOS NO ACREDITADOS ──────────
# Endpoint temporal protegido. Revisa los pagos aprobados en MercadoPago
# de los últimos N días y acredita los que falten en Firestore (casos en
# que el webhook no pudo escribir porque Firebase Admin estaba mal
# configurado). Requiere header X-Recovery-Key con el valor de la
# variable de entorno RECOVERY_SECRET_KEY.
@app.route("/api/casino/recuperar-pagos", methods=["POST"])
def casino_recuperar_pagos():
    secret = os.environ.get("RECOVERY_SECRET_KEY", "")
    if not secret or request.headers.get("X-Recovery-Key", "") != secret:
        return jsonify({"error": "No autorizado"}), 401

    if not sdk or not db:
        return jsonify({"error": "Servicio no disponible"}), 503

    dias = int((request.get_json(silent=True) or {}).get("dias", 30))
    desde = (datetime.utcnow() - __import__("datetime").timedelta(days=dias)).strftime("%Y-%m-%dT00:00:00.000-00:00")

    resultado = {
        "revisados":          0,
        "ya_acreditados":     0,
        "recien_acreditados": [],
        "sin_metadata":       [],
        "errores":            []
    }

    offset = 0
    limit  = 50

    while True:
        search = sdk.payment().search({
            "range":        "date_created",
            "begin_date":   desde,
            "end_date":     "NOW",
            "sort":         "date_created",
            "criteria":     "desc",
            "offset":       offset,
            "limit":        limit
        })

        results = (search.get("response") or {}).get("results", [])
        if not results:
            break

        for payment in results:
            resultado["revisados"] += 1

            if payment.get("status") != "approved":
                continue

            payment_id = str(payment.get("id", ""))
            if not payment_id:
                continue

            pago_ref = db.collection("mp_pagos").document(payment_id)
            if pago_ref.get().exists:
                resultado["ya_acreditados"] += 1
                continue

            metadata = payment.get("metadata", {}) or {}
            uid      = metadata.get("uid", "")
            creditos = int(metadata.get("creditos", 0) or 0)

            if not uid or uid == "anonimo" or creditos <= 0:
                resultado["sin_metadata"].append(payment_id)
                continue

            try:
                pago_ref.create({
                    "payment_id": payment_id,
                    "uid":        uid,
                    "creditos":   creditos,
                    "procesado":  True,
                    "fecha":      datetime.utcnow().isoformat(),
                    "via":        "recuperacion_manual"
                })
            except Exception:
                resultado["ya_acreditados"] += 1
                continue

            user_ref = db.collection("usuarios").document(uid)

            @fs.transactional
            def acreditar(transaction, ref):
                snap     = ref.get(transaction=transaction)
                actuales = (snap.to_dict() or {}).get("casino_credits", 0)
                transaction.update(ref, {"casino_credits": actuales + creditos})

            try:
                acreditar(db.transaction(), user_ref)
                resultado["recien_acreditados"].append({
                    "payment_id": payment_id,
                    "uid":        uid,
                    "creditos":   creditos
                })
            except Exception as e:
                pago_ref.delete()
                resultado["errores"].append({"payment_id": payment_id, "uid": uid, "error": str(e)})

        if len(results) < limit:
            break
        offset += limit

    return jsonify(resultado)
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