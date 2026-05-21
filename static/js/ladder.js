/* =====================================================
TOGGLE INPUT
===================================================== */

function toggleInput(address){

plcMemory[address]=
!plcMemory[address]

log(
address+
" = "+
plcMemory[address]
)

scanPLC()

}

/* =====================================================
SIMULAR PLC
===================================================== */

function runSimulation(){

scanPLC()

log("PLC SCAN")

}

/* =====================================================
SCAN AUTOMATICO
===================================================== */

setInterval(()=>{

scanPLC()

},100)