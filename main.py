from flask import Flask, render_template, send_from_directory, redirect

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

# ── IMPORTANTE PARA VERCEL ────────────────────────────────
app = app

if __name__ == "__main__":
    app.run(debug=True)