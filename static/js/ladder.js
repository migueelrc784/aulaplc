/* =====================================================
TOGGLE INPUT
===================================================== */

function toggleInput(address){

plcMemory.inputs[address]=
!plcMemory.inputs[address]

log(
address+
" = "+
plcMemory.inputs[address]
)

scanPLC()

}

/* =====================================================
SIMULATE PLC
===================================================== */

function runSimulation(){

scanPLC()

log("PLC RUNNING")

}

/* =====================================================
AUTO SCAN
===================================================== */

setInterval(()=>{

scanPLC()

},100)

/* =====================================================
OUTPUTS UI
===================================================== */

function updateOutputs(){

Object.keys(plcMemory.outputs)
.forEach(output=>{

const element=
document.querySelector(
`[data-output="${output}"]`
)

if(!element)return

const value=
plcMemory.outputs[output]

element.innerText=
value ? "TRUE" : "FALSE"

if(value){

element.classList.add("on")

}else{

element.classList.remove("on")

}

})

}

/* =====================================================
LOGGER
===================================================== */

function log(text){

console.log(text)

}