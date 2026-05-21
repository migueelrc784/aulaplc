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

log(
address+
" = "+
plcMemory.inputs[address]
)

scanPLC()

}

/* =====================================================
CLICK CONTACT
===================================================== */

document.addEventListener("click",e=>{

/* CONTACT */

if(e.target.classList.contains("contact")){

const address=
e.target.dataset.address

/* ONLY INPUTS */

if(address.startsWith("I")){

toggleInput(address)

}

}

/* DELETE ELEMENT */

if(e.target.classList.contains("delete-element")){

e.target.parentElement.remove()

scanPLC()

}

})

/* =====================================================
SIMULATION
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

},100)

/* =====================================================
UPDATE OUTPUTS UI
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
PHYSICAL OUTPUTS
===================================================== */

function updatePhysicalOutputs(){

/* =====================================================
Q0.0 MOTOR
===================================================== */

const motor=
document.getElementById("fan")

if(motor){

if(plcMemory.outputs["Q0.0"]){

motor.classList.add("running")

}else{

motor.classList.remove("running")

}

}

/* =====================================================
Q0.1 GREEN
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
Q0.2 RED
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
Q0.3 YELLOW
===================================================== */

const blue=
document.getElementById("bluePilot")

if(blue){

if(plcMemory.outputs["Q0.3"]){

blue.classList.add("active-yellow")

}else{

blue.classList.remove("active-yellow")

}

}

}

/* =====================================================
ADD CONTACT NO
===================================================== */

function addNO(){

const address=
prompt(
"Direccion contacto NO:\n\nI0.0 hasta I0.5\nQ0.0 hasta Q0.3",
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
"Direccion bobina:\nQ0.0 hasta Q0.3",
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
NEW RUNG
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