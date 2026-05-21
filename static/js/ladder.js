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
TOGGLE INPUT REAL
===================================================== */

function toggleInput(address){

/* TOGGLE STATE */

plcMemory.inputs[address]=
!plcMemory.inputs[address]

const state=
plcMemory.inputs[address]

/* =====================================================
INPUT CARD VISUAL
===================================================== */

const card=
document.getElementById(
`card-${address}`
)

if(card){

if(state){

card.classList.add("io-forced")

}else{

card.classList.remove("io-forced")

}

}

/* =====================================================
UPDATE CONTACTS
===================================================== */

const contacts=
document.querySelectorAll(
`.contact[data-address="${address}"]`
)

contacts.forEach(contact=>{

const type=
contact.dataset.type

/* NO */

if(type==="NO"){

if(state){

contact.classList.add("powered")

}else{

contact.classList.remove("powered")

}

}

/* NC */

if(type==="NC"){

if(state){

contact.classList.remove("powered")

}else{

contact.classList.add("powered")

}

}

})

/* =====================================================
LOG
===================================================== */

log(
`${address} = ${state}`
)

/* =====================================================
SCAN PLC
===================================================== */

scanPLC()

}

/* =====================================================
CONTACT CLICK
===================================================== */

document.addEventListener("click",e=>{

/* =====================================================
CLICK CONTACT
===================================================== */

if(e.target.classList.contains("contact")){

const address=
e.target.dataset.address

if(address.startsWith("I")){

toggleInput(address)

}

}

/* =====================================================
DELETE ELEMENT
===================================================== */

if(e.target.classList.contains("delete-element")){

e.target.parentElement.remove()

scanPLC()

}

})

/* =====================================================
RUN SIMULATION
===================================================== */

function runSimulation(){

scanPLC()

log("PLC RUNNING")

}

/* =====================================================
AUTO SCAN
===================================================== */

setInterval(()=>{

scanPLC()

updatePhysicalOutputs()

updateMemoryUI()

},100)

/* =====================================================
UPDATE OUTPUTS
===================================================== */

function updateOutputs(){

Object.keys(plcMemory.outputs)
.forEach(output=>{

const element=
document.querySelector(
`[data-output="${output}"]`
)

if(!element)return

const value=
plcMemory.outputs[output]

element.innerText=
value ? "TRUE":"FALSE"

if(value){

element.classList.add("on")

}else{

element.classList.remove("on")

}

})

}

/* =====================================================
UPDATE MEMORY UI
===================================================== */

function updateMemoryUI(){

/* MARKERS */

Object.keys(plcMemory.markers)
.forEach(marker=>{

const element=
document.getElementById(
marker.toLowerCase().replace(".","")
)

if(!element)return

const value=
plcMemory.markers[marker]

element.innerText=
value ? "TRUE":"FALSE"

})

/* TIMERS */

Object.keys(plcMemory.timers)
.forEach(timer=>{

const element=
document.getElementById(
timer.toLowerCase().replace(".","")
)

if(!element)return

const value=
plcMemory.timers[timer].done

element.innerText=
value ? "ON":"OFF"

})

}

/* =====================================================
PHYSICAL OUTPUTS
===================================================== */

function updatePhysicalOutputs(){

/* =====================================================
MOTOR
===================================================== */

const fan=
document.getElementById("fan")

const motorState=
document.getElementById("motorState")

const rpm=
document.getElementById("rpmValue")

if(fan){

if(plcMemory.outputs["Q0.0"]){

fan.classList.add("running")

if(motorState){

motorState.innerText=
"ENCENDIDO"

}

if(rpm){

rpm.innerText=
"1750 RPM"

}

}else{

fan.classList.remove("running")

if(motorState){

motorState.innerText=
"DETENIDO"

}

if(rpm){

rpm.innerText=
"0 RPM"

}

}

}

/* =====================================================
GREEN PILOT
===================================================== */

const green=
document.getElementById("greenPilot")

if(green){

if(plcMemory.outputs["Q0.1"]){

green.classList.add("active-green")

}else{

green.classList.remove("active-green")

}

}

/* =====================================================
RED PILOT
===================================================== */

const red=
document.getElementById("redPilot")

if(red){

if(plcMemory.outputs["Q0.2"]){

red.classList.add("active-red")

}else{

red.classList.remove("active-red")

}

}

/* =====================================================
YELLOW PILOT
===================================================== */

const yellow=
document.getElementById("bluePilot")

if(yellow){

if(plcMemory.outputs["Q0.3"]){

yellow.classList.add("active-yellow")

}else{

yellow.classList.remove("active-yellow")

}

}

}

/* =====================================================
ADD CONTACT NO
===================================================== */

function addNO(){

const address=
prompt(
"Direccion contacto NO\n\nI0.0 -> I0.5\nQ0.0 -> Q0.3",
"I0.0"
)

if(!address)return

createContact(
"NO",
address
)

}

/* =====================================================
ADD CONTACT NC
===================================================== */

function addNC(){

const address=
prompt(
"Direccion contacto NC",
"I0.1"
)

if(!address)return

createContact(
"NC",
address
)

}

/* =====================================================
CREATE CONTACT
===================================================== */

function createContact(type,address){

const rung=
document.querySelector(".rung:last-child")

const line=
document.createElement("div")

line.className="line"

const contact=
document.createElement("div")

contact.className="contact"

contact.dataset.type=type

contact.dataset.address=address

if(type==="NO"){

contact.innerHTML=
`
${address}

<div class="delete-element">
✕
</div>
`

}else{

contact.innerHTML=
`
/${address}

<div class="delete-element">
✕
</div>
`

}

rung.insertBefore(
line,
rung.lastElementChild
)

rung.insertBefore(
contact,
rung.lastElementChild
)

scanPLC()

}

/* =====================================================
ADD COIL
===================================================== */

function addCoil(){

const address=
prompt(
"Direccion bobina\nQ0.0 -> Q0.3",
"Q0.0"
)

if(!address)return

const rung=
document.querySelector(".rung:last-child")

const line=
document.createElement("div")

line.className="line"

const coil=
document.createElement("div")

coil.className="coil"

coil.dataset.address=address

coil.dataset.coil="normal"

coil.innerHTML=
`
(${address})

<div class="delete-element">
✕
</div>
`

rung.insertBefore(
line,
rung.lastElementChild
)

rung.insertBefore(
coil,
rung.lastElementChild
)

scanPLC()

}

/* =====================================================
ADD TON
===================================================== */

function addTON(){

const rung=
document.querySelector(".rung:last-child")

const line=
document.createElement("div")

line.className="line"

const timer=
document.createElement("div")

timer.className="timer"

timer.dataset.address="T0.0"

timer.dataset.preset="3000"

timer.innerHTML=
`
TON T0.0

<div class="delete-element">
✕
</div>
`

rung.insertBefore(
line,
rung.lastElementChild
)

rung.insertBefore(
timer,
rung.lastElementChild
)

scanPLC()

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

rung.innerHTML=
`

<div class="rail"></div>

<div class="line"></div>

<div class="rail"></div>

`

ladder.appendChild(rung)

}

/* =====================================================
LOGGER
===================================================== */

function log(text){

const logBox=
document.getElementById("logBox")

if(!logBox)return

const item=
document.createElement("div")

item.innerText=
`[PLC] ${text}`

logBox.prepend(item)

}