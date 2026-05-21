/* =====================================================
AVAILABLE ADDRESSES
===================================================== */

const inputAddresses=[

"I0.0",
"I0.1",
"I0.2",
"I0.3",
"I0.4",
"I0.5"

]

const outputAddresses=[

"Q0.0",
"Q0.1",
"Q0.2",
"Q0.3"

]

/* =====================================================
TOGGLE INPUT
===================================================== */

function toggleInput(address){

plcMemory.inputs[address]=
!plcMemory.inputs[address]

const card=
document.getElementById(
"card-"+address
)

if(card){

if(plcMemory.inputs[address]){

card.classList.add("io-forced")

}else{

card.classList.remove("io-forced")

}

}

log(
address+
" = "+
plcMemory.inputs[address]
)

scanPLC()

}

/* =====================================================
RUN PLC
===================================================== */

function runSimulation(){

scanPLC()

log("PLC SCAN")

}

/* =====================================================
AUTO SCAN
===================================================== */

setInterval(()=>{

scanPLC()

},100)

/* =====================================================
UPDATE OUTPUTS
===================================================== */

function updateOutputs(){

document
.querySelectorAll("[data-output]")
.forEach(element=>{

const address=
element.dataset.output

const value=
plcMemory.outputs[address]

element.innerText=
value ? "TRUE" : "FALSE"

if(value){

element.classList.add("on")

}else{

element.classList.remove("on")

}

})

/* =====================================================
MOTOR
===================================================== */

const motor=
plcMemory.outputs["Q0.0"]

const fan=
document.getElementById("fan")

const motorState=
document.getElementById("motorState")

const rpm=
document.getElementById("rpmValue")

if(fan){

if(motor){

fan.style.animation=
"spin 0.7s linear infinite"

motorState.innerText=
"ENCENDIDO"

rpm.innerText=
"1750 RPM"

}else{

fan.style.animation=
"none"

motorState.innerText=
"DETENIDO"

rpm.innerText=
"0 RPM"

}

}

/* =====================================================
PILOTS
===================================================== */

const green=
document.getElementById("greenPilot")

const red=
document.getElementById("redPilot")

const yellow=
document.getElementById("bluePilot")

if(green){

green.classList.toggle(
"active-green",
plcMemory.outputs["Q0.1"]
)

}

if(red){

red.classList.toggle(
"active-red",
plcMemory.outputs["Q0.2"]
)

}

if(yellow){

yellow.classList.toggle(
"active-yellow",
plcMemory.outputs["Q0.3"]
)

}

}

/* =====================================================
CONTACT CLICK FORCE
===================================================== */

function initContactEvents(){

document
.querySelectorAll(".contact")
.forEach(contact=>{

contact.onclick=(e)=>{

if(
e.target.classList.contains(
"delete-element"
)
){

return

}

const address=
contact.dataset.address

/* ONLY INPUTS */

if(address.startsWith("I")){

toggleInput(address)

}

/* TOGGLE TYPE */

if(contact.dataset.type==="NO"){

contact.dataset.type="NC"

contact.innerHTML=
"/"+address+
'<div class="delete-element">✕</div>'

}else{

contact.dataset.type="NO"

contact.innerHTML=
address+
'<div class="delete-element">✕</div>'

}

scanPLC()

}

})

}

/* =====================================================
DELETE ELEMENTS
===================================================== */

function initDeleteButtons(){

document
.querySelectorAll(".delete-element")
.forEach(button=>{

button.onclick=(e)=>{

e.stopPropagation()

const parent=
button.parentElement

if(parent){

parent.remove()

scanPLC()

}

}

})

}

/* =====================================================
DRAG SYSTEM
===================================================== */

let dragged=null

function initDrag(){

document
.querySelectorAll(
".contact,.coil,.timer"
)
.forEach(element=>{

element.draggable=true

element.addEventListener(
"dragstart",
()=>{

dragged=element

})

element.addEventListener(
"dragover",
(e)=>{

e.preventDefault()

})

element.addEventListener(
"drop",
(e)=>{

e.preventDefault()

if(
dragged &&
dragged!==element
){

const parent=
element.parentNode

parent.insertBefore(
dragged,
element
)

scanPLC()

}

})

})

}

/* =====================================================
ADD NO
===================================================== */

function addNO(){

const rung=
document.querySelector(".rung")

const address=
prompt(
"Direccion INPUT",
"I0.0"
)

if(!address)return

const contact=
document.createElement("div")

contact.className="contact"

contact.dataset.type="NO"

contact.dataset.address=address

contact.innerHTML=
address+
'<div class="delete-element">✕</div>'

const line=
document.createElement("div")

line.className="line"

rung.insertBefore(
line,
rung.lastElementChild
)

rung.insertBefore(
contact,
line
)

refreshLadder()

}

/* =====================================================
ADD NC
===================================================== */

function addNC(){

const rung=
document.querySelector(".rung")

const address=
prompt(
"Direccion INPUT",
"I0.1"
)

if(!address)return

const contact=
document.createElement("div")

contact.className="contact"

contact.dataset.type="NC"

contact.dataset.address=address

contact.innerHTML=
"/"+address+
'<div class="delete-element">✕</div>'

const line=
document.createElement("div")

line.className="line"

rung.insertBefore(
line,
rung.lastElementChild
)

rung.insertBefore(
contact,
line
)

refreshLadder()

}

/* =====================================================
ADD COIL
===================================================== */

function addCoil(){

const rung=
document.querySelector(".rung")

const address=
prompt(
"Direccion OUTPUT",
"Q0.0"
)

if(!address)return

const coil=
document.createElement("div")

coil.className="coil"

coil.dataset.address=address

coil.dataset.coil="normal"

coil.innerHTML=
"("+address+")"+
'<div class="delete-element">✕</div>'

const line=
document.createElement("div")

line.className="line"

rung.insertBefore(
line,
rung.lastElementChild
)

rung.insertBefore(
coil,
line
)

refreshLadder()

}

/* =====================================================
ADD TON
===================================================== */

function addTON(){

const rung=
document.querySelector(".rung")

const timer=
document.createElement("div")

timer.className="timer"

timer.dataset.address="T0.1"

timer.dataset.preset="5000"

timer.innerHTML=
"TON T0.1"+
'<div class="delete-element">✕</div>'

const line=
document.createElement("div")

line.className="line"

rung.insertBefore(
line,
rung.lastElementChild
)

rung.insertBefore(
timer,
line
)

refreshLadder()

}

/* =====================================================
ADD RUNG
===================================================== */

function addRung(){

const ladder=
document.getElementById("ladder")

const rung=
document.createElement("div")

rung.className="rung"

rung.innerHTML=`

<div class="rail"></div>

<div class="rail"></div>

`

ladder.appendChild(rung)

}

/* =====================================================
REFRESH
===================================================== */

function refreshLadder(){

initContactEvents()

initDeleteButtons()

initDrag()

scanPLC()

}

/* =====================================================
INIT
===================================================== */

window.addEventListener(
"DOMContentLoaded",
()=>{

refreshLadder()

}
)