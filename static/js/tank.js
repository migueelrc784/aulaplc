let tankLevel=40

function fillTank(){

if(tankLevel<100){

tankLevel+=10

updateTank()

log("Tanque llenando")

}

}

function emptyTank(){

if(tankLevel>0){

tankLevel-=10

updateTank()

log("Tanque vaciando")

}

}

function updateTank(){

document.getElementById("water")
.style.height=tankLevel+"%"

document.getElementById("tankValue")
.innerHTML=tankLevel+"%"

}
