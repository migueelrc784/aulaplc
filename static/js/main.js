/* =========================================================
VARIABLES
========================================================= */

let running = false
let rpm = 0
let temp = 25

let fillLevel = 0
let valveOpen = false

/* =========================================================
PAGE
========================================================= */

function showPage(page){

document.querySelectorAll(".page")
.forEach(p => p.style.display = "none")

document.getElementById(page)
.style.display = "block"

}

/* =========================================================
LOG
========================================================= */

function log(text){

const p = document.createElement("p")

p.innerHTML =
new Date().toLocaleTimeString() +
" → " +
text

document.getElementById("logBox")
.prepend(p)

}

/* =========================================================
INPUTS
========================================================= */

function toggleInput(type){

if(type === "start"){

running = true

document.getElementById("plcStatus")
.innerHTML = "PLC RUN"

document.getElementById("plcStatus")
.classList.remove("offline")

document.getElementById("plcStatus")
.classList.add("online")

document.getElementById("fan")
.style.animationPlayState = "running"

document.getElementById("greenLight")
.classList.add("on-green")

document.getElementById("redLight")
.classList.remove("on-red")

document.getElementById("blueLight")
.classList.remove("on-blue")

log("I0.0 START ACTIVADO")

}

if(type === "stop"){

running = false

document.getElementById("fan")
.style.animationPlayState = "paused"

document.getElementById("greenLight")
.classList.remove("on-green")

document.getElementById("redLight")
.classList.add("on-red")

document.getElementById("blueLight")
.classList.remove("on-blue")

log("I0.1 STOP ACTIVADO")

}

if(type === "emergency"){

running = false

document.getElementById("fan")
.style.animationPlayState = "paused"

document.getElementById("greenLight")
.classList.remove("on-green")

document.getElementById("redLight")
.classList.add("on-red")

document.getElementById("blueLight")
.classList.add("on-blue")

log("EMERGENCIA ACTIVADA")

}

}

/* =========================================================
REALISTIC MOTOR
========================================================= */

setInterval(() => {

if(running){

rpm += Math.random() * 150

if(rpm > 1750){
rpm = 1750
}

temp += Math.random() * 0.8

if(temp > 85){
temp = 85
}

}else{

rpm -= 80

if(rpm < 0){
rpm = 0
}

temp -= 0.3

if(temp < 25){
temp = 25
}

}

document.getElementById("rpmText")
.innerHTML = Math.floor(rpm) + " RPM"

document.getElementById("rpmFill")
.style.width = (rpm / 17.5) + "%"

document.getElementById("tempText")
.innerHTML = Math.floor(temp)

document.getElementById("tempFill")
.style.width = temp + "%"

},100)

/* =========================================================
LADDER
========================================================= */

function addContact(){

const rung = document.createElement("div")

rung.className = "rung"

rung.innerHTML = `

<div class="contact" contenteditable="true">
I0.X
</div>

<div class="line"></div>

<div class="coil" contenteditable="true">
Q0.X
</div>

`

document.getElementById("ladder")
.appendChild(rung)

log("Nuevo contacto agregado")

}

function addCoil(){

const rung = document.createElement("div")

rung.className = "rung"

rung.innerHTML = `

<div class="contact" contenteditable="true">
I0.X
</div>

<div class="line"></div>

<div class="coil" contenteditable="true">
Q0.X
</div>

`

document.getElementById("ladder")
.appendChild(rung)

log("Nueva bobina agregada")

}

function addTimer(){

const rung = document.createElement("div")

rung.className = "rung"

rung.innerHTML = `

<div class="contact" contenteditable="true">
I0.0
</div>

<div class="line"></div>

<div class="timer" contenteditable="true">
TON T1 5s
</div>

<div class="line"></div>

<div class="coil" contenteditable="true">
Q0.3
</div>

`

document.getElementById("ladder")
.appendChild(rung)

log("Temporizador agregado")

}

function simulatePLC(){

log("PLC SIMULADO")

}

/* =========================================================
TANK
========================================================= */

function openValve(){

valveOpen = true

log("Válvula abierta")

}

function closeValve(){

valveOpen = false

log("Válvula cerrada")

}

setInterval(() => {

let kp = document.getElementById("kp").value

document.getElementById("kpText")
.innerHTML =
"Velocidad = " + kp + "%"

if(valveOpen){

fillLevel += kp / 50

if(fillLevel > 100){
fillLevel = 100
}

}else{

fillLevel -= kp / 80

if(fillLevel < 0){
fillLevel = 0
}

}

document.getElementById("water")
.style.height = fillLevel + "%"

let volume = Math.floor(fillLevel * 100)

document.getElementById("liters")
.innerHTML =
volume + " cm³"

},50)

/* =========================================================
INIT
========================================================= */

log("Automation Studio iniciado")