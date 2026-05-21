/* =====================================================
MOTOR INDUSTRIAL PRO
===================================================== */

let motorRunning=false

let motorRPM=0

let motorMode="SIN CONFIGURAR"

let accelerationInterval=null

/* =====================================================
CONFIGURAR ESTRELLA
===================================================== */

function connectStar(){

motorMode="ESTRELLA"

/* TEXTO */

document.getElementById("connectionMode")
.innerHTML="ESTRELLA"

/* CAMBIAR IMAGEN */

document.getElementById("connectionImage")
.src="/static/img/estrella.png"

log("Motor configurado en ESTRELLA")

}

/* =====================================================
CONFIGURAR TRIANGULO
===================================================== */

function connectDelta(){

motorMode="TRIANGULO"

/* TEXTO */

document.getElementById("connectionMode")
.innerHTML="TRIANGULO"

/* CAMBIAR IMAGEN */

document.getElementById("connectionImage")
.src="/static/img/delta.png"

log("Motor configurado en TRIANGULO")

}

/* =====================================================
ARRANCAR MOTOR
===================================================== */

function startIndustrialMotor(){

if(motorMode==="SIN CONFIGURAR"){

alert(
"Debe seleccionar conexión estrella o triángulo"
)

log("ERROR: motor sin conexión")

return

}

if(motorRunning){
return
}

motorRunning=true

/* =====================================================
ESTADOS
===================================================== */

document.getElementById("motorState")
.innerHTML="MARCHA"

document.getElementById("plcState")
.innerHTML="PLC RUN"

document.getElementById("plcState")
.className="status-box run"

/* =====================================================
PILOTOS
===================================================== */

document.getElementById("greenPilot")
.className="pilot on-green"

document.getElementById("redPilot")
.className="pilot"

/* =====================================================
MOTOR FAN
===================================================== */

document.getElementById("fan")
.style.animationPlayState="running"

/* =====================================================
RPM
===================================================== */

simulateAcceleration()

log(
"Motor iniciado en "+motorMode
)

}

/* =====================================================
DETENER MOTOR
===================================================== */

function stopIndustrialMotor(){

motorRunning=false

clearInterval(accelerationInterval)

motorRPM=0

updateRPM()

/* =====================================================
FAN
===================================================== */

document.getElementById("fan")
.style.animationPlayState="paused"

/* =====================================================
ESTADOS
===================================================== */

document.getElementById("motorState")
.innerHTML="DETENIDO"

document.getElementById("plcState")
.innerHTML="PLC STOP"

document.getElementById("plcState")
.className="status-box stop"

/* =====================================================
PILOTOS
===================================================== */

document.getElementById("greenPilot")
.className="pilot"

document.getElementById("redPilot")
.className="pilot on-red"

log("Motor detenido")

}

/* =====================================================
SIMULACION ACELERACION
===================================================== */

function simulateAcceleration(){

clearInterval(accelerationInterval)

accelerationInterval=setInterval(()=>{

if(!motorRunning){

clearInterval(accelerationInterval)

return

}

/* =====================================================
RPM SEGUN MODO
===================================================== */

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
UPDATE RPM
===================================================== */

function updateRPM(){

document.getElementById("rpmValue")
.innerHTML=
motorRPM+" RPM"

}

/* =====================================================
INIT
===================================================== */

console.log("motor.js cargado")