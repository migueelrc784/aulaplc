/* =========================================================
PLC TAGS
========================================================= */

window.PLC = {

inputs:{
"I0.0":false,
"I0.1":false,
"I0.2":false,
"I0.3":false,
"I0.4":false,
"I0.5":false
},

outputs:{
"Q0.0":false,
"Q0.1":false,
"Q0.2":false,
"Q0.3":false
},

running:false

}

/* =========================================================
SIMULATION
========================================================= */

function runSimulation(){

PLC.running=!PLC.running

const btn=document.querySelector(".run-btn")

if(PLC.running){

btn.innerText="DETENER PLC"
btn.classList.add("stop")

scanPLC()

log("PLC EN RUN")

}else{

btn.innerText="SIMULAR PLC"
btn.classList.remove("stop")

log("PLC DETENIDO")

}

}

/* =========================================================
INPUTS
========================================================= */

function toggleInput(address){

PLC.inputs[address]=!PLC.inputs[address]

const card=document.getElementById(`card-${address}`)

if(PLC.inputs[address]){

card.classList.add("active-input")

}else{

card.classList.remove("active-input")

}

scanPLC()

}

/* =========================================================
SCAN
========================================================= */

function scanPLC(){

if(!PLC.running)return

const rungs=document.querySelectorAll(".rung")

PLC.outputs["Q0.0"]=false
PLC.outputs["Q0.1"]=false
PLC.outputs["Q0.2"]=false
PLC.outputs["Q0.3"]=false

rungs.forEach(rung=>{

let power=true

const elements=rung.querySelectorAll(".ladder-element")

elements.forEach(el=>{

if(el.classList.contains("contact")){

const type=el.dataset.type
const address=el.dataset.address

let state=false

if(address.startsWith("I")){

state=PLC.inputs[address]

}

if(address.startsWith("Q")){

state=PLC.outputs[address]

}

if(type==="NO"){

power=power && state

}else{

power=power && !state

}

if(power){

el.classList.add("energized")

}else{

el.classList.remove("energized")

}

}

if(el.classList.contains("coil")){

const address=el.dataset.address

PLC.outputs[address]=power

if(power){

el.classList.add("energized")

}else{

el.classList.remove("energized")

}

}

})

if(power){

rung.classList.add("rung-powered")

}else{

rung.classList.remove("rung-powered")

}

})

updateOutputs()

updateMotor()

setTimeout(scanPLC,120)

}

/* =========================================================
OUTPUTS UI
========================================================= */

function updateOutputs(){

document.querySelectorAll("[data-output]").forEach(el=>{

const address=el.dataset.output

const state=PLC.outputs[address]

el.innerText=state?"TRUE":"FALSE"

if(state){

el.classList.add("on")

}else{

el.classList.remove("on")

}

})

}

/* =========================================================
ADD ELEMENTS
========================================================= */

function createContact(type){

const div=document.createElement("div")

div.className="ladder-element contact"

div.dataset.type=type

div.dataset.address="I0.0"

div.innerHTML=`

<div class="contact-symbol ${type==="NC"?"nc":""}">
<div class="line-left"></div>
<div class="line-right"></div>
${type==="NC"?"<div class='diag'></div>":""}
</div>

<div class="tag" contenteditable="true">I0.0</div>

`

makeEditable(div)

makeDraggable(div)

return div

}

function createCoil(){

const div=document.createElement("div")

div.className="ladder-element coil"

div.dataset.address="Q0.0"

div.innerHTML=`

<div class="coil-symbol"></div>

<div class="tag" contenteditable="true">Q0.0</div>

`

makeEditable(div)

makeDraggable(div)

return div

}

/* =========================================================
BUTTONS
========================================================= */

function addNO(){

const rung=document.querySelector(".rung")

rung.appendChild(createContact("NO"))

}

function addNC(){

const rung=document.querySelector(".rung")

rung.appendChild(createContact("NC"))

}

function addCoil(){

const rung=document.querySelector(".rung")

rung.appendChild(createCoil())

}

function addRung(){

const ladder=document.getElementById("ladder")

const rung=document.createElement("div")

rung.className="rung"

rung.innerHTML=`

<div class="rail left"></div>

<div class="wire"></div>

<div class="rail right"></div>

`

ladder.appendChild(rung)

}

/* =========================================================
EDIT TAGS
========================================================= */

function makeEditable(el){

const tag=el.querySelector(".tag")

tag.addEventListener("input",()=>{

const value=tag.innerText.trim().toUpperCase()

el.dataset.address=value

})

}

/* =========================================================
DRAG
========================================================= */

function makeDraggable(el){

el.draggable=true

el.addEventListener("dragstart",()=>{

el.classList.add("dragging")

})

el.addEventListener("dragend",()=>{

el.classList.remove("dragging")

})

}

document.addEventListener("dragover",e=>{

e.preventDefault()

const dragging=document.querySelector(".dragging")

const rung=e.target.closest(".rung")

if(rung && dragging){

rung.appendChild(dragging)

}

})