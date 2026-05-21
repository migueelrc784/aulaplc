function startMotor(){

document.getElementById("fan")
.style.animationPlayState="running"

log("Motor energizado")

}

function stopMotor(){

document.getElementById("fan")
.style.animationPlayState="paused"

log("Motor detenido")

}
