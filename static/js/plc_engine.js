/* =========================================================
PLC ENGINE - AUTOMATION STUDIO X
========================================================= */

window.inputs = {

"I0.0": false,
"I0.1": false,
"I0.2": false,
"I0.3": false,
"I0.4": false,
"I0.5": false

}

window.outputs = {

"Q0.0": false,
"Q0.1": false,
"Q0.2": false,
"Q0.3": false

}

window.markers = {

"M0.0": false,
"M0.1": false,
"M0.2": false,
"M0.3": false

}

window.plcRunning = false

window.selectedElement = null

/* =========================================================
TOGGLE INPUTS
========================================================= */

function toggleInput(address){

inputs[address] = !inputs[address]

const card =
document.getElementById(`card-${address}`)

if(card){

if(inputs[address]){

card.classList.add("io-forced")

}else{

card.classList.remove("io-forced")

}

}

scanPLC()

}

/* =========================================================
SIMULATION BUTTON
========================================================= */

function runSimulation(){

plcRunning = !plcRunning

const buttons =
document.querySelectorAll(".toolbar .btn")

buttons.forEach(btn=>{

if(
btn.innerText.includes("SIMULAR") ||
btn.innerText.includes("DETENER")
){

btn.innerText =
plcRunning
? "DETENER PLC"
: "SIMULAR PLC"

}

})

const cpu =
document.getElementById("cpuState")

const plc =
document.getElementById("plcState")

if(plcRunning){

cpu.innerText = "CPU RUN"
plc.innerText = "PLC RUN"

cpu.classList.remove("stop")
plc.classList.remove("stop")

cpu.classList.add("run")
plc.classList.add("run")

}else{

cpu.innerText = "CPU STOP"
plc.innerText = "PLC STOP"

cpu.classList.remove("run")
plc.classList.remove("run")

cpu.classList.add("stop")
plc.classList.add("stop")

}

scanPLC()

}

/* =========================================================
READ ADDRESS
========================================================= */

function readAddress(addr){

if(addr.startsWith("I")){

return inputs[addr] || false

}

if(addr.startsWith("Q")){

return outputs[addr] || false

}

if(addr.startsWith("M")){

return markers[addr] || false

}

return false

}

/* =========================================================
WRITE OUTPUT
========================================================= */

function writeOutput(addr,value){

if(addr.startsWith("Q")){

outputs[addr] = value

}

if(addr.startsWith("M")){

markers[addr] = value

}

}

/* =========================================================
CLEAR VISUALS
========================================================= */

function clearVisuals(){

document
.querySelectorAll(".powered")
.forEach(el=>el.classList.remove("powered"))

document
.querySelectorAll(".energized")
.forEach(el=>el.classList.remove("energized"))

document
.querySelectorAll(".active-rung")
.forEach(el=>el.classList.remove("active-rung"))

}

/* =========================================================
SCAN PLC
========================================================= */

function scanPLC(){

clearVisuals()

if(!plcRunning){

updateOutputs()
updateMotor()

return

}

/* RESET OUTPUTS */

Object.keys(outputs).forEach(q=>{

outputs[q] = false

})

/* RESET MARKERS */

Object.keys(markers).forEach(m=>{

markers[m] = false

})

const rungs =
document.querySelectorAll(".rung")

rungs.forEach(rung=>{

let power = true

const elements =
[...rung.children]

elements.forEach(el=>{

/* RAIL */

if(el.classList.contains("rail")){

if(power){

el.classList.add("powered")

}

}

/* LINE */

if(el.classList.contains("line")){

if(power){

el.classList.add("powered")

}

}

/* CONTACT */

if(el.classList.contains("contact")){

const addr =
el.dataset.address

const type =
el.dataset.type

const value =
readAddress(addr)

let result = false

if(type === "NO"){

result = value

}else{

result = !value

}

if(result){

el.classList.add("powered")

}

power = power && result

}

/* TIMER */

if(el.classList.contains("timer")){

if(power){

el.classList.add("powered")

}

}

/* COIL */

if(el.classList.contains("coil")){

const addr =
el.dataset.address

writeOutput(addr,power)

if(power){

el.classList.add("energized")

}

}

})

if(power){

rung.classList.add("active-rung")

}

})

updateOutputs()

updateMotor()

}

/* =========================================================
OUTPUTS UI
========================================================= */

function updateOutputs(){

document
.querySelectorAll("[data-output]")
.forEach(el=>{

const addr =
el.dataset.output

if(outputs[addr]){

el.innerText = "TRUE"
el.style.color = "#00ff99"

}else{

el.innerText = "FALSE"
el.style.color = "#ff4565"

}

})

}

/* =========================================================
MOTOR + PILOTS
========================================================= */

function updateMotor(){

const fan =
document.getElementById("motorFan")

const rpm =
document.getElementById("rpmValue")

const state =
document.getElementById("motorState")

const green =
document.getElementById("greenPilot")

const red =
document.getElementById("redPilot")

const blue =
document.getElementById("bluePilot")

/* MOTOR */

if(outputs["Q0.0"]){

if(fan){

fan.style.animationPlayState =
"running"

fan.style.animationDuration =
"0.15s"

}

if(rpm){

rpm.innerText = "1750 RPM"

}

if(state){

state.innerText = "RUN"

}

}else{

if(fan){

fan.style.animationPlayState =
"paused"

}

if(rpm){

rpm.innerText = "0 RPM"

}

if(state){

state.innerText = "STOP"

}

}

/* PILOTOS */

if(green){

green.classList.toggle(
"on-green",
outputs["Q0.1"]
)

}

if(red){

red.classList.toggle(
"on-red",
outputs["Q0.2"]
)

}

if(blue){

blue.classList.toggle(
"on-blue",
outputs["Q0.3"]
)

}

}

/* =========================================================
SELECT ELEMENT
========================================================= */

document.addEventListener("click",e=>{

const element =
e.target.closest(
".contact,.coil,.timer"
)

if(element){

document
.querySelectorAll(".selected-element")
.forEach(el=>{

el.classList.remove(
"selected-element"
)

})

element.classList.add(
"selected-element"
)

selectedElement = element

}

})

/* =========================================================
DELETE ELEMENT
========================================================= */

document.addEventListener("click",e=>{

if(
e.target.classList.contains(
"delete-element"
)
){

const parent =
e.target.parentElement

if(parent){

parent.remove()

scanPLC()

}

}

})

/* =========================================================
DRAG AND DROP
========================================================= */

function enableDrag(){

document
.querySelectorAll(
".contact,.coil,.timer"
)
.forEach(el=>{

el.setAttribute(
"draggable",
"true"
)

el.addEventListener(
"dragstart",
dragStart
)

el.addEventListener(
"dragover",
dragOver
)

el.addEventListener(
"drop",
dropElement
)

})

}

let draggedElement = null

function dragStart(){

draggedElement = this

}

function dragOver(e){

e.preventDefault()

}

function dropElement(e){

e.preventDefault()

if(
draggedElement &&
draggedElement !== this
){

const parent =
this.parentNode

parent.insertBefore(
draggedElement,
this
)

scanPLC()

}

}

/* =========================================================
ADD ELEMENTS
========================================================= */

function createDeleteButton(){

const del =
document.createElement("div")

del.className =
"delete-element"

del.innerText = "✕"

return del

}

/* CONTACT NO */

function addNO(){

const rung =
document.querySelector(".rung")

if(!rung)return

const line =
document.createElement("div")

line.className = "line"

const contact =
document.createElement("div")

contact.className = "contact"

contact.dataset.type = "NO"

contact.dataset.address = "I0.0"

contact.innerHTML = `I0.0`

contact.appendChild(
createDeleteButton()
)

rung.insertBefore(
line,
rung.lastElementChild
)

rung.insertBefore(
contact,
rung.lastElementChild
)

enableDrag()

scanPLC()

}

/* CONTACT NC */

function addNC(){

const rung =
document.querySelector(".rung")

if(!rung)return

const line =
document.createElement("div")

line.className = "line"

const contact =
document.createElement("div")

contact.className = "contact"

contact.dataset.type = "NC"

contact.dataset.address = "I0.1"

contact.innerHTML = `/I0.1`

contact.appendChild(
createDeleteButton()
)

rung.insertBefore(
line,
rung.lastElementChild
)

rung.insertBefore(
contact,
rung.lastElementChild
)

enableDrag()

scanPLC()

}

/* COIL */

function addCoil(){

const rung =
document.querySelector(".rung")

if(!rung)return

const line =
document.createElement("div")

line.className = "line"

const coil =
document.createElement("div")

coil.className = "coil"

coil.dataset.address = "Q0.0"

coil.innerHTML = `(Q0.0)`

coil.appendChild(
createDeleteButton()
)

rung.insertBefore(
line,
rung.lastElementChild
)

rung.insertBefore(
coil,
rung.lastElementChild
)

enableDrag()

scanPLC()

}

/* TIMER */

function addTON(){

const rung =
document.querySelector(".rung")

if(!rung)return

const line =
document.createElement("div")

line.className = "line"

const timer =
document.createElement("div")

timer.className = "timer"

timer.dataset.address = "T0.0"

timer.innerHTML = `T0.0`

timer.appendChild(
createDeleteButton()
)

rung.insertBefore(
line,
rung.lastElementChild
)

rung.insertBefore(
timer,
rung.lastElementChild
)

enableDrag()

scanPLC()

}

/* =========================================================
ADD NEW RUNG
========================================================= */

function addRung(){

const ladder =
document.getElementById("ladder")

const rung =
document.createElement("div")

rung.className = "rung"

rung.innerHTML = `

<div class="rail"></div>

<div class="rail"></div>

`

ladder.appendChild(rung)

}

/* =========================================================
AUTO SCAN
========================================================= */

setInterval(()=>{

if(plcRunning){

scanPLC()

}

},120)

/* =========================================================
INIT
========================================================= */

window.addEventListener("load",()=>{

enableDrag()

updateOutputs()

updateMotor()

})