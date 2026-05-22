/* =========================================================
AUTOMATION STUDIO X - LADDER.JS
========================================================= */

/* =========================================================
AVAILABLE ADDRESSES
========================================================= */

const inputAddresses = [

"I0.0",
"I0.1",
"I0.2",
"I0.3",
"I0.4",
"I0.5"

]

const outputAddresses = [

"Q0.0",
"Q0.1",
"Q0.2",
"Q0.3"

]

/* =========================================================
BUILD NC DIAGONALS
========================================================= */

function buildNC(){

document.querySelectorAll(
'.contact[data-type="NC"]'
).forEach(contact=>{

if(!contact.querySelector(".diag")){

const diag =
document.createElement("div")

diag.className = "diag"

contact.appendChild(diag)

}

})

}

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
SELECT ELEMENT
========================================================= */

document.addEventListener("click",e=>{

const element =
e.target.closest(
".contact,.coil,.timer"
)

if(!element) return

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

})

/* =========================================================
ENABLE DRAG
========================================================= */

let draggedElement = null

function enableDrag(){

document.querySelectorAll(
".contact,.coil,.timer"
).forEach(el=>{

el.setAttribute(
"draggable",
"true"
)

el.removeEventListener(
"dragstart",
dragStart
)

el.removeEventListener(
"dragover",
dragOver
)

el.removeEventListener(
"drop",
dropElement
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

function dragStart(){

draggedElement = this

}

function dragOver(e){

e.preventDefault()

}

function dropElement(e){

e.preventDefault()

if(
!draggedElement ||
draggedElement===this
){

return

}

const parent =
this.parentNode

parent.insertBefore(
draggedElement,
this
)

scanPLC()

}

/* =========================================================
CREATE DELETE BUTTON
========================================================= */

function createDeleteButton(){

const del =
document.createElement("div")

del.className =
"delete-element"

del.innerText = "✕"

return del

}

/* =========================================================
CREATE ADDRESS SELECT
========================================================= */

function createAddressSelect(
element,
addresses,
selected
){

const select =
document.createElement("select")

select.className =
"address-select"

addresses.forEach(addr=>{

const option =
document.createElement("option")

option.value = addr
option.innerText = addr

if(addr===selected){

option.selected = true

}

select.appendChild(option)

})

select.addEventListener("change",()=>{

element.dataset.address =
select.value

updateElementLabel(element)

scanPLC()

})

return select

}

/* =========================================================
UPDATE LABEL
========================================================= */

function updateElementLabel(element){

const address =
element.dataset.address

/* CONTACT */

if(
element.classList.contains(
"contact"
)
){

const type =
element.dataset.type

if(type==="NO"){

element.childNodes[0].nodeValue =
address

}else{

element.childNodes[0].nodeValue =
"/"+address

}

}

/* COIL */

if(
element.classList.contains(
"coil"
)
){

element.childNodes[0].nodeValue =
"("+address+")"

}

/* TIMER */

if(
element.classList.contains(
"timer"
)
){

element.childNodes[0].nodeValue =
"TON "+address

}

}

/* =========================================================
ADD CONTACT NO
========================================================= */

function addNO(){

const rung =
document.querySelector(".rung")

if(!rung) return

const line =
document.createElement("div")

line.className = "line"

const contact =
document.createElement("div")

contact.className = "contact"

contact.dataset.type = "NO"
contact.dataset.address = "I0.0"

contact.innerHTML = "I0.0"

contact.appendChild(
createDeleteButton()
)

contact.appendChild(
createAddressSelect(
contact,
inputAddresses,
"I0.0"
)
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

/* =========================================================
ADD CONTACT NC
========================================================= */

function addNC(){

const rung =
document.querySelector(".rung")

if(!rung) return

const line =
document.createElement("div")

line.className = "line"

const contact =
document.createElement("div")

contact.className = "contact"

contact.dataset.type = "NC"
contact.dataset.address = "I0.1"

contact.innerHTML = "/I0.1"

const diag =
document.createElement("div")

diag.className = "diag"

contact.appendChild(diag)

contact.appendChild(
createDeleteButton()
)

contact.appendChild(
createAddressSelect(
contact,
inputAddresses,
"I0.1"
)
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

/* =========================================================
ADD COIL
========================================================= */

function addCoil(){

const rung =
document.querySelector(".rung")

if(!rung) return

const line =
document.createElement("div")

line.className = "line"

const coil =
document.createElement("div")

coil.className = "coil"

coil.dataset.address = "Q0.0"

coil.innerHTML = "(Q0.0)"

coil.appendChild(
createDeleteButton()
)

coil.appendChild(
createAddressSelect(
coil,
outputAddresses,
"Q0.0"
)
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

/* =========================================================
ADD TON TIMER
========================================================= */

function addTON(){

const rung =
document.querySelector(".rung")

if(!rung) return

const line =
document.createElement("div")

line.className = "line"

const timer =
document.createElement("div")

timer.className = "timer"

timer.dataset.address = "T0.0"

timer.innerHTML = "TON T0.0"

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

<div class="contact"
data-type="NO"
data-address="I0.0">

I0.0

<div class="delete-element">
✕
</div>

</div>

<div class="line"></div>

<div class="coil"
data-address="Q0.0">

(Q0.0)

<div class="delete-element">
✕
</div>

</div>

<div class="rail"></div>

`

ladder.appendChild(rung)

buildNC()

enableDrag()

scanPLC()

}

/* =========================================================
INIT
========================================================= */

window.addEventListener("load",()=>{

buildNC()

enableDrag()

})