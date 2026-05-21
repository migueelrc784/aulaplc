/* =====================================================
PLC MEMORY
===================================================== */

const plcMemory={

/* ENTRADAS */

"I0.0":false,
"I0.1":false,
"I0.2":false,

/* SALIDAS */

"Q0.0":false,
"Q0.1":false,
"Q0.2":false,

}

/* =====================================================
EVALUAR CONTACTO
===================================================== */

function evaluateContact(type,address){

const value=plcMemory[address]

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
SCAN PLC
===================================================== */

function scanPLC(){

const rungs=document.querySelectorAll(".rung")

/* RESET OUTPUTS */

plcMemory["Q0.0"]=false
plcMemory["Q0.1"]=false
plcMemory["Q0.2"]=false

rungs.forEach(rung=>{

let rungPower=true

const elements=rung.querySelectorAll(
".contact,.coil"
)

elements.forEach(el=>{

/* =====================================================
CONTACTOS
===================================================== */

if(el.classList.contains("contact")){

const type=el.dataset.type

const address=el.dataset.address

const result=
evaluateContact(type,address)

if(result){

el.classList.add("powered")

}else{

el.classList.remove("powered")

rungPower=false

}

}

/* =====================================================
BOBINAS
===================================================== */

if(el.classList.contains("coil")){

const address=el.dataset.address

plcMemory[address]=rungPower

if(rungPower){

el.classList.add("powered")

}else{

el.classList.remove("powered")

}

}

})

})

updateOutputs()

}