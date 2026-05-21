/* =====================================================
PLC MEMORY
===================================================== */

const plcMemory={

"I0.0":false,
"I0.1":false,
"I0.2":false,
"I0.3":false,

"Q0.0":false,
"Q0.1":false,
"Q0.2":false,
"Q0.3":false,

}

/* =====================================================
CONTACTOS
===================================================== */

function evaluateContact(type,address){

const value=plcMemory[address]

if(type==="NO"){

return value

}

if(type==="NC"){

return !value

}

return false

}

/* =====================================================
SCAN PLC
===================================================== */

function scanPLC(){

const rungs=document.querySelectorAll(".rung")

/* RESET OUTPUTS */

plcMemory["Q0.0"]=false
plcMemory["Q0.1"]=false
plcMemory["Q0.2"]=false
plcMemory["Q0.3"]=false

rungs.forEach(rung=>{

let rungPower=true

const contacts=
rung.querySelectorAll(".contact")

const coil=
rung.querySelector(".coil")

const lines=
rung.querySelectorAll(".line")

/* =====================================================
CONTACTOS
===================================================== */

contacts.forEach(contact=>{

const result=evaluateContact(
contact.dataset.type,
contact.dataset.address
)

if(result){

contact.classList.add("powered")

}else{

contact.classList.remove("powered")

rungPower=false

}

})

/* =====================================================
LINEAS
===================================================== */

lines.forEach(line=>{

if(rungPower){

line.classList.add("powered")

}else{

line.classList.remove("powered")

}

})

/* =====================================================
BOBINA
===================================================== */

if(coil){

const address=coil.dataset.address

plcMemory[address]=rungPower

if(rungPower){

coil.classList.add("powered")

rung.classList.add("active")

}else{

coil.classList.remove("powered")

rung.classList.remove("active")

}

}

})

updateOutputs()

}