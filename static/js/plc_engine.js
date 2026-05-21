/* =====================================================
PLC MEMORY
===================================================== */

const plcMemory={

inputs:{},
outputs:{},
markers:{},
timers:{}

}

/* =====================================================
INIT INPUTS
===================================================== */

[
"I0.0",
"I0.1",
"I0.2",
"I0.3",
"I0.4",
"I0.5"
].forEach(input=>{

plcMemory.inputs[input]=false

})

/* =====================================================
INIT OUTPUTS
===================================================== */

[
"Q0.0",
"Q0.1",
"Q0.2",
"Q0.3"
].forEach(output=>{

plcMemory.outputs[output]=false

})

/* =====================================================
INIT MARKERS
===================================================== */

[
"M0.0",
"M0.1",
"M0.2",
"M0.3"
].forEach(marker=>{

plcMemory.markers[marker]=false

})

/* =====================================================
INIT TIMERS
===================================================== */

plcMemory.timers["T0.0"]={

done:false,
running:false,
start:0,
preset:3000

}

plcMemory.timers["T0.1"]={

done:false,
running:false,
start:0,
preset:5000

}

/* =====================================================
READ ADDRESS
===================================================== */

function readAddress(address){

/* INPUTS */

if(address.startsWith("I")){

return plcMemory.inputs[address] || false

}

/* OUTPUTS */

if(address.startsWith("Q")){

return plcMemory.outputs[address] || false

}

/* MARKERS */

if(address.startsWith("M")){

return plcMemory.markers[address] || false

}

/* TIMERS */

if(address.startsWith("T")){

if(!plcMemory.timers[address]){

return false

}

return plcMemory.timers[address].done

}

return false

}

/* =====================================================
WRITE ADDRESS
===================================================== */

function writeAddress(address,value){

/* OUTPUT */

if(address.startsWith("Q")){

plcMemory.outputs[address]=value

}

/* MARKER */

if(address.startsWith("M")){

plcMemory.markers[address]=value

}

}

/* =====================================================
CONTACT EVALUATION
===================================================== */

function evaluateContact(contact){

const type=
contact.dataset.type

const address=
contact.dataset.address

const value=
readAddress(address)

/* NORMAL OPEN */

if(type==="NO"){

return value

}

/* NORMAL CLOSED */

if(type==="NC"){

return !value

}

return false

}

/* =====================================================
UPDATE VISUAL
===================================================== */

function updateVisual(element,powered){

if(powered){

element.classList.add("powered")

}else{

element.classList.remove("powered")

}

}

/* =====================================================
TON TIMER
===================================================== */

function processTON(timer,power){

const address=
timer.dataset.address

const preset=
parseInt(
timer.dataset.preset || 3000
)

/* CREATE TIMER */

if(!plcMemory.timers[address]){

plcMemory.timers[address]={

done:false,
running:false,
start:0,
preset:preset

}

}

const t=
plcMemory.timers[address]

/* TIMER POWERED */

if(power){

if(!t.running){

t.running=true

t.start=Date.now()

}

const elapsed=
Date.now()-t.start

if(elapsed>=preset){

t.done=true

}

/* TIMER OFF */

}else{

t.running=false

t.done=false

t.start=0

}

updateVisual(timer,t.done)

return t.done

}

/* =====================================================
PROCESS COIL
===================================================== */

function processCoil(coil,power){

const address=
coil.dataset.address

const mode=
coil.dataset.coil || "normal"

/* NORMAL */

if(mode==="normal"){

writeAddress(address,power)

}

/* SET */

if(mode==="set"){

if(power){

writeAddress(address,true)

}

}

/* RESET */

if(mode==="reset"){

if(power){

writeAddress(address,false)

}

}

updateVisual(
coil,
readAddress(address)
)

}

/* =====================================================
RESET OUTPUTS EACH SCAN
===================================================== */

function resetOutputs(){

Object.keys(plcMemory.outputs)
.forEach(output=>{

plcMemory.outputs[output]=false

})

}

/* =====================================================
SCAN PLC
===================================================== */

function scanPLC(){

/* RESET OUTPUTS */

resetOutputs()

/* GET RUNGS */

const rungs=
document.querySelectorAll(".rung")

/* =====================================================
PROCESS RUNGS
===================================================== */

rungs.forEach(rung=>{

let rungPower=true

const elements=
rung.querySelectorAll(
".contact,.timer,.line,.coil"
)

/* =====================================================
ELEMENT LOOP
===================================================== */

elements.forEach(element=>{

/* =====================================================
CONTACT
===================================================== */

if(
element.classList.contains("contact")
){

const result=
evaluateContact(element)

rungPower=
rungPower && result

updateVisual(
element,
result
)

}

/* =====================================================
TIMER
===================================================== */

if(
element.classList.contains("timer")
){

rungPower=
processTON(
element,
rungPower
)

}

/* =====================================================
LINE
===================================================== */

if(
element.classList.contains("line")
){

updateVisual(
element,
rungPower
)

}

/* =====================================================
COIL
===================================================== */

if(
element.classList.contains("coil")
){

processCoil(
element,
rungPower
)

}

})

/* =====================================================
RUNG VISUAL
===================================================== */

if(rungPower){

rung.classList.add("active")

}else{

rung.classList.remove("active")

}

})

/* =====================================================
UPDATE UI
===================================================== */

updateOutputs()

}