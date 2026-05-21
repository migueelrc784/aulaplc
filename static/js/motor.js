let motorRunning=false
let motorRPM=0
let motorMode="SIN CONFIGURAR"

let accelerationInterval=null

/* =====================================================
CONFIGURAR ESTRELLA
===================================================== */

function connectStar(){

motorMode="ESTRELLA"

document.getElementById("connectionMode")
.innerHTML="ESTRELLA"

log("Motor configurado en ESTRELLA")

}

/* =====================================================
CONFIGURAR TRIANGULO
===================================================== */

function connectDelta(){

motorMode="TRIANGULO"

document.getElementById("connectionMode")
.innerHTML="TRIANGULO"

log("Motor configurado en TRIANGULO")

}

/* =====================================================
ARRANCAR MOTOR
===================================================== */

function startIndustrialMotor(){

if(motorMode==="SIN CONFIGURAR"){

showAlarm(
"Debe seleccionar conexión estrella o triángulo"
)

return

}

if(motorRunning){
return
}

motorRunning=true

document.getElementById("motorState")
.innerHTML="MARCHA"

document.getElementById("plcState")
.innerHTML="PLC RUN"

document.getElementById("plcState")
.className="status-box run"

document.getElementById("greenPilot")
.className="pilot on-green"

document.getElementById("redPilot")
.className="pilot"

document.getElementById("fan")
.style.animationPlayState="running"

simulateAcceleration()

log("Motor iniciado en "+motorMode)

}

/* =====================================================
DETENER MOTOR
===================================================== */

function stopIndustrialMotor(){

motorRunning=false

clearInterval(accelerationInterval)

motorRPM=0

updateRPM()

document.getElementById("fan")
.style.animationPlayState="paused"

document.getElementById("motorState")
.innerHTML="DETENIDO"

document.getElementById("plcState")
.innerHTML="PLC STOP"

document.getElementById("plcState")
.className="status-box stop"

document.getElementById("greenPilot")
.className="pilot"

document.getElementById("redPilot")
.className="pilot on-red"

log("Motor detenido")

}

/* =====================================================
ACELERACION REAL
===================================================== */

function simulateAcceleration(){

clearInterval(accelerationInterval)

accelerationInterval=setInterval(()=>{

if(!motorRunning){

clearInterval(accelerationInterval)

return

}

if(motorMode==="ESTRELLA"){

if(motorRPM<900){
motorRPM+=20
}

}else{

if(motorRPM<1750){
motorRPM+=50
}

}

updateRPM()

},100)

}

/* =====================================================
RPM
===================================================== */

function updateRPM(){

document.getElementById("rpmValue")
.innerHTML=motorRPM+" RPM"

}