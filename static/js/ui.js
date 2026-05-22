/* =========================================================
AUTOMATION STUDIO X - UI.JS
========================================================= */

console.log("UI JS cargado")

/* =========================================================
SHOW PAGE
========================================================= */

function showPage(pageId){

document.querySelectorAll(".page")
.forEach(page=>{

page.style.display = "none"

})

const selected =
document.getElementById(pageId)

if(selected){

selected.style.display = "block"

}

}

/* =========================================================
SHOW SECTION
========================================================= */

function showSection(sectionId,btn){

const sections = [

"simulatorSection",
"coursesSection",
"vfdSection"

]

sections.forEach(id=>{

const section =
document.getElementById(id)

if(section){

section.style.display = "none"

}

})

const activeSection =
document.getElementById(sectionId)

if(activeSection){

activeSection.style.display = "block"

}

document.querySelectorAll(".nav-btn")
.forEach(b=>{

b.classList.remove("active-nav")

})

if(btn){

btn.classList.add("active-nav")

}

}

/* =========================================================
BACK TO SIMULATOR
========================================================= */

function backSimulator(){

showSection(

"simulatorSection",

document.querySelectorAll(".nav-btn")[0]

)

}

/* =========================================================
POPUP MESSAGE
========================================================= */

function showToast(message,type="success"){

const toast =
document.createElement("div")

toast.className =
`toast toast-${type}`

toast.innerText = message

document.body.appendChild(toast)

setTimeout(()=>{

toast.classList.add("show")

},50)

setTimeout(()=>{

toast.classList.remove("show")

setTimeout(()=>{

toast.remove()

},300)

},2500)

}

/* =========================================================
MODAL
========================================================= */

function createModal(title,content){

const overlay =
document.createElement("div")

overlay.className =
"modal-overlay"

const modal =
document.createElement("div")

modal.className =
"modal-box"

modal.innerHTML = `

<div class="modal-header">

<h2>${title}</h2>

<button class="modal-close">
✕
</button>

</div>

<div class="modal-content">

${content}

</div>

`

overlay.appendChild(modal)

document.body.appendChild(overlay)

modal.querySelector(".modal-close")
.onclick = ()=>{

overlay.remove()

}

overlay.addEventListener("click",e=>{

if(e.target===overlay){

overlay.remove()

}

})

}

/* =========================================================
SELECT LADDER ELEMENT
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
DOUBLE CLICK CONFIG
========================================================= */

document.addEventListener("dblclick",e=>{

const contact =
e.target.closest(".contact")

const coil =
e.target.closest(".coil")

/* CONTACT */

if(contact){

const current =
contact.dataset.address

const newAddress =
prompt(
"Direccion contacto:",
current
)

if(newAddress){

contact.dataset.address =
newAddress

const type =
contact.dataset.type

if(type==="NO"){

contact.childNodes[0].nodeValue =
newAddress

}else{

contact.childNodes[0].nodeValue =
"/"+newAddress

}

if(typeof scanPLC==="function"){

scanPLC()

}

}

}

/* COIL */

if(coil){

const current =
coil.dataset.address

const newAddress =
prompt(
"Direccion bobina:",
current
)

if(newAddress){

coil.dataset.address =
newAddress

coil.childNodes[0].nodeValue =
"("+newAddress+")"

if(typeof scanPLC==="function"){

scanPLC()

}

}

}

})

/* =========================================================
KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener("keydown",e=>{

/* DELETE */

if(e.key==="Delete"){

const selected =
document.querySelector(
".selected-element"
)

if(selected){

selected.remove()

if(typeof scanPLC==="function"){

scanPLC()

}

}

}

/* CTRL + R */

if(e.ctrlKey && e.key==="r"){

e.preventDefault()

if(typeof runSimulation==="function"){

runSimulation()

}

}

/* CTRL + N */

if(e.ctrlKey && e.key==="n"){

e.preventDefault()

if(typeof addRung==="function"){

addRung()

}

}

})

/* =========================================================
WINDOW LOAD
========================================================= */

window.addEventListener("load",()=>{

console.log(
"INTERFAZ INICIADA"
)

})