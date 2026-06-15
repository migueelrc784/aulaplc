from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/ads.txt")
def ads():
    return send_from_directory("static", "ads.txt")

# importante para Vercel
app = app

if __name__ == "__main__":
    app.run(debug=True)