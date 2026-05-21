/* =========================================================
PLC ENGINE
========================================================= */

window.inputs={

"I0.0":false,
"I0.1":false,
"I0.2":false,
"I0.3":false,
"I0.4":false,
"I0.5":false

}

window.outputs={

"Q0.0":false,
"Q0.1":false,
"Q0.2":false,
"Q0.3":false

}

window.plcRunning=false

/* =========================================================
TOGGLE INPUTS
========================================================= */

function toggleInput(address){

inputs[address]=!inputs[address]

const card=document.getElementById(
`card-${address}`
)

if(inputs[address]){

card.classList.add("io-forced")

}else{

card.classList.remove("io-forced")

}

scanPLC()

}

/* =========================================================
SIMULATION BUTTON
========================================================= */

function runSimulation(){

plcRunning=!plcRunning

const btns=document.querySelectorAll(".toolbar .btn")

btns.forEach(btn=>{

if(btn.innerText.includes("SIMULAR")){

btn.innerText=plcRunning
? "DETENER PLC"
: "SIMULAR PLC"

}

})

const cpu=document.getElementById("cpuState")
const plc=document.getElementById("plcState")

if(plcRunning){

cpu.innerText="CPU RUN"
plc.innerText="PLC RUN"

cpu.style.background="#00ff99"
plc.style.background="#00ff99"

log("PLC EN RUN")

}else{

cpu.innerText="CPU STOP"
plc.innerText="PLC STOP"

cpu.style.background="#ff3355"
plc.style.background="#ff3355"

log("PLC DETENIDO")

}

scanPLC()

}

/* =========================================================
SCAN PLC
========================================================= */

function scanPLC(){

if(!plcRunning){

document.querySelectorAll(".powered")
.forEach(el=>el.classList.remove("powered"))

document.querySelectorAll(".energized")
.forEach(el=>el.classList.remove("energized"))

return

}

Object.keys(outputs).forEach(q=>{

outputs[q]=false

})

const rungs=document.querySelectorAll(".rung")

rungs.forEach(rung=>{

let power=true

const elements=[...rung.children]

elements.forEach(el=>{

/* rail */

if(el.classList.contains("rail")){

if(power){

el.classList.add("powered")

}else{

el.classList.remove("powered")

}

}

/* line */

if(el.classList.contains("line")){

if(power){

el.classList.add("powered")

}else{

el.classList.remove("powered")

}

}

/* contacts */

if(el.classList.contains("contact")){

const addr=el.dataset.address
const type=el.dataset.type

let value=false

if(addr.startsWith("I")){

value=inputs[addr]

}else{

value=outputs[addr]

}

let result=false

if(type==="NO"){

result=value

}else{

result=!value

}

power=power && result

if(power){

el.classList.add("powered")

}else{

el.classList.remove("powered")

}

}

/* timer */

if(el.classList.contains("timer")){

if(power){

el.classList.add("powered")

}else{

el.classList.remove("powered")

}

}

/* coils */

if(el.classList.contains("coil")){

const addr=el.dataset.address

outputs[addr]=power

if(power){

el.classList.add("energized")

}else{

el.classList.remove("energized")

}

}

})

})

updateOutputs()

updateMotor()

}

/* =========================================================
OUTPUTS UI
========================================================= */

function updateOutputs(){

document.querySelectorAll("[data-output]")
.forEach(el=>{

const addr=el.dataset.output

if(outputs[addr]){

el.innerText="TRUE"
el.classList.add("on")

}else{

el.innerText="FALSE"
el.classList.remove("on")

}

})

}

/* =========================================================
AUTO SCAN
========================================================= */

setInterval(()=>{

if(plcRunning){

scanPLC()

}

},120)