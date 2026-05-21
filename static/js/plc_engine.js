/* =====================================================
PLC MEMORY
===================================================== */

const plcMemory = {

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
"I0.3"
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

return plcMemory.timers[address].done

}

return false

}

/* =====================================================
WRITE ADDRESS
===================================================== */

function writeAddress(address,value){

if(address.startsWith("Q")){

plcMemory.outputs[address]=value

}

if(address.startsWith("M")){

plcMemory.markers[address]=value

}

}

/* =====================================================
CONTACT EVALUATION
===================================================== */

function evaluateContact(contact){

const type=contact.dataset.type
const address=contact.dataset.address

const value=readAddress(address)

if(type==="NO"){

return value

}

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

const address=timer.dataset.address

const preset=
parseInt(timer.dataset.preset || 3000)

const t=plcMemory.timers[address]

if(!t){

plcMemory.timers[address]={

done:false,
running:false,
start:0,
preset:preset

}

}

const current=plcMemory.timers[address]

if(power){

if(!current.running){

current.running=true
current.start=Date.now()

}

const elapsed=
Date.now()-current.start

if(elapsed>=preset){

current.done=true

}

}else{

current.running=false
current.done=false
current.start=0

}

updateVisual(timer,current.done)

return current.done

}

/* =====================================================
PROCESS COIL
===================================================== */

function processCoil(coil,power){

const address=coil.dataset.address

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

updateVisual(coil,readAddress(address))

}

/* =====================================================
SCAN PLC
===================================================== */

function scanPLC(){

const rungs=
document.querySelectorAll(".rung")

rungs.forEach(rung=>{

let power=true

const elements=
rung.querySelectorAll(
".contact,.timer,.coil,.line"
)

elements.forEach(element=>{

/* CONTACT */

if(
element.classList.contains("contact")
){

const result=
evaluateContact(element)

power=power && result

updateVisual(element,result)

}

/* TIMER */

if(
element.classList.contains("timer")
){

power=
processTON(element,power)

}

/* LINE */

if(
element.classList.contains("line")
){

updateVisual(element,power)

}

/* COIL */

if(
element.classList.contains("coil")
){

processCoil(element,power)

}

})

if(power){

rung.classList.add("active")

}else{

rung.classList.remove("active")

}

})

updateOutputs()

}