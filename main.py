from flask import Flask, render_template, send_from_directory, redirect, Response
from datetime import datetime

app = Flask(__name__)

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

# ── SITEMAP ───────────────────────────────────────────────
@app.route("/sitemap.xml")
def sitemap():
    pages = [
        {"url": "/cursos",              "priority": "1.0", "changefreq": "weekly"},
        {"url": "/simulador-plc",       "priority": "0.9", "changefreq": "weekly"},
        {"url": "/simulador-vfd",       "priority": "0.9", "changefreq": "weekly"},
        {"url": "/cursos/tia-portal",   "priority": "0.8", "changefreq": "monthly"},
        {"url": "/cursos/hmi-scada",    "priority": "0.8", "changefreq": "monthly"},
        {"url": "/comunidad",           "priority": "0.7", "changefreq": "daily"},
        {"url": "/dudas",               "priority": "0.6", "changefreq": "weekly"},
        {"url": "/tienda",              "priority": "0.6", "changefreq": "weekly"},
    ]
    today = datetime.utcnow().strftime("%Y-%m-%d")
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
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
    return Response(xml, mimetype='application/xml')

# ── ROBOTS.TXT ────────────────────────────────────────────
@app.route("/robots.txt")
def robots():
    content = (
        "User-agent: *\n"
        "Allow: /\n"
        "Disallow: /static/\n\n"
        "Sitemap: https://aulaplc.com/sitemap.xml\n"
    )
    return Response(content, mimetype='text/plain')

# ── IMPORTANTE PARA VERCEL ────────────────────────────────
app = app

if __name__ == "__main__":
    app.run(debug=True)