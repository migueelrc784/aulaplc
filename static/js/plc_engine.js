/* =========================================================
PLC ENGINE REAL
========================================================= */

let plcRunning=false

/* =========================================================
PLC MEMORY
========================================================= */

const plcMemory={

inputs:{},
outputs:{},
markers:{},
timers:{}

}

/* =========================================================
INIT INPUTS
========================================================= */

[
"I0.0",
"I0.1",
"I0.2",
"I0.3",
"I0.4",
"I0.5"
].forEach(i=>{

plcMemory.inputs[i]=false

})

/* =========================================================
INIT OUTPUTS
========================================================= */

[
"Q0.0",
"Q0.1",
"Q0.2",
"Q0.3"
].forEach(q=>{

plcMemory.outputs[q]=false

})

/* =========================================================
TIMERS
========================================================= */

plcMemory.timers["T0.0"]={

EN:false,
DN:false,
TT:false,
ACC:0,
PRE:3000,
START:0

}

/* =========================================================
READ ADDRESS
========================================================= */

function readAddress(address){

if(address.startsWith("I")){

return plcMemory.inputs[address]

}

if(address.startsWith("Q")){

return plcMemory.outputs[address]

}

if(address.startsWith("M")){

return plcMemory.markers[address]

}

if(address.startsWith("T")){

return plcMemory.timers[address]?.DN || false

}

return false

}

/* =========================================================
WRITE ADDRESS
========================================================= */

function writeAddress(address,value){

if(address.startsWith("Q")){

plcMemory.outputs[address]=value

}

if(address.startsWith("M")){

plcMemory.markers[address]=value

}

}

/* =========================================================
SET POWER FLOW
========================================================= */

function setPower(element,power){

element.classList.toggle(
"powered",
power
)

}

/* =========================================================
CONTACT EVALUATION
========================================================= */

function evaluateContact(contact){

const type=
contact.dataset.type

const address=
contact.dataset.address

const value=
readAddress(address)

/* CONTACT VISUAL */

if(type==="NO"){

contact.classList.remove("closed")

if(value){

contact.classList.add("closed")

}

return value

}

/* NC */

if(type==="NC"){

contact.classList.add("closed")

if(value){

contact.classList.remove("closed")

}

return !value

}

return false

}

/* =========================================================
TON
========================================================= */

function processTON(timer,power){

const address=
timer.dataset.address

const preset=
parseInt(
timer.dataset.preset || 3000
)

if(!plcMemory.timers[address]){

plcMemory.timers[address]={

EN:false,
DN:false,
TT:false,
ACC:0,
PRE:preset,
START:0

}

}

const t=
plcMemory.timers[address]

if(power){

t.EN=true

if(t.START===0){

t.START=Date.now()

}

t.ACC=
Date.now()-t.START

t.TT=
t.ACC<preset

t.DN=
t.ACC>=preset

}else{

t.EN=false
t.DN=false
t.TT=false
t.ACC=0
t.START=0

}

timer.innerHTML=`

TON ${address}

<small>
${(t.ACC/1000).toFixed(1)}s
</small>

<div class="delete-element">
✕
</div>

`

setPower(timer,t.DN)

return t.DN

}

/* =========================================================
COIL
========================================================= */

function processCoil(coil,power){

const address=
coil.dataset.address

writeAddress(address,power)

setPower(coil,power)

}

/* =========================================================
RESET OUTPUTS
========================================================= */

function resetOutputs(){

Object.keys(plcMemory.outputs)
.forEach(output=>{

plcMemory.outputs[output]=false

})

}

/* =========================================================
SCAN PLC
========================================================= */

function scanPLC(){

if(!plcRunning)return

resetOutputs()

const rungs=
document.querySelectorAll(".rung")

rungs.forEach(rung=>{

let rungPower=true

const elements=
rung.querySelectorAll(
".contact,.line,.timer,.coil"
)

elements.forEach(element=>{

/* CONTACT */

if(
element.classList.contains("contact")
){

const result=
evaluateContact(element)

rungPower=
rungPower && result

setPower(
element,
rungPower
)

}

/* LINE */

if(
element.classList.contains("line")
){

setPower(
element,
rungPower
)

}

/* TIMER */

if(
element.classList.contains("timer")
){

rungPower=
processTON(
element,
rungPower
)

}

/* COIL */

if(
element.classList.contains("coil")
){

processCoil(
element,
rungPower
)

}

})

rung.classList.toggle(
"active",
rungPower
)

})

updateOutputs()

}