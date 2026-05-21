/* =========================================================
PLC RUN
========================================================= */

setInterval(()=>{

scanPLC()

},100)

/* =========================================================
SIMULATION BUTTON
========================================================= */

function runSimulation(){

plcRunning=!plcRunning

const plcState=
document.getElementById("plcState")

const cpuState=
document.getElementById("cpuState")

if(plcRunning){

plcState.innerText=
"PLC RUN"

cpuState.innerText=
"CPU RUN"

plcState.classList.add("run")
cpuState.classList.add("run")

log("PLC RUNNING")

}else{

plcState.innerText=
"PLC STOP"

cpuState.innerText=
"CPU STOP"

plcState.classList.remove("run")
cpuState.classList.remove("run")

log("PLC STOPPED")

resetVisualPower()

}

}

/* =========================================================
RESET VISUAL
========================================================= */

function resetVisualPower(){

document
.querySelectorAll(
".powered"
)
.forEach(el=>{

el.classList.remove(
"powered"
)

})

}

/* =========================================================
TOGGLE INPUTS
========================================================= */

function toggleInput(address){

plcMemory.inputs[address]=
!plcMemory.inputs[address]

const card=
document.getElementById(
"card-"+address
)

if(card){

card.classList.toggle(
"io-forced",
plcMemory.inputs[address]
)

}

scanPLC()

}

/* =========================================================
OUTPUTS
========================================================= */

function updateOutputs(){

document
.querySelectorAll("[data-output]")
.forEach(el=>{

const address=
el.dataset.output

const value=
plcMemory.outputs[address]

el.innerText=
value ? "TRUE":"FALSE"

el.classList.toggle(
"on",
value
)

})

updateMotor()

updatePilots()

}

/* =========================================================
MOTOR
========================================================= */

function updateMotor(){

const motor=
plcMemory.outputs["Q0.0"]

const fan=
document.getElementById("fan")

const rpm=
document.getElementById("rpmValue")

const state=
document.getElementById("motorState")

if(motor){

fan.style.animation=
"spinMotor .5s linear infinite"

rpm.innerText=
"1750 RPM"

state.innerText=
"ENCENDIDO"

}else{

fan.style.animation=
"none"

rpm.innerText=
"0 RPM"

state.innerText=
"DETENIDO"

}

}

/* =========================================================
PILOTS
========================================================= */

function updatePilots(){

document
.getElementById("greenPilot")
?.classList.toggle(
"active-green",
plcMemory.outputs["Q0.1"]
)

document
.getElementById("redPilot")
?.classList.toggle(
"active-red",
plcMemory.outputs["Q0.2"]
)

document
.getElementById("bluePilot")
?.classList.toggle(
"active-yellow",
plcMemory.outputs["Q0.3"]
)

}

/* =========================================================
DELETE BUTTONS
========================================================= */

function initDeleteButtons(){

document
.querySelectorAll(".delete-element")
.forEach(btn=>{

btn.onclick=(e)=>{

e.stopPropagation()

btn.parentElement.remove()

scanPLC()

}

})

}

/* =========================================================
REFRESH
========================================================= */

function refreshLadder(){

initDeleteButtons()

scanPLC()

}

/* =========================================================
INIT
========================================================= */

window.addEventListener(
"DOMContentLoaded",
()=>{

refreshLadder()

}
)