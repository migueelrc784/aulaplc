window.onload=()=>{

setTimeout(()=>{

const loader=document.getElementById("loader")
const app=document.getElementById("app")

if(loader){
loader.style.display="none"
}

if(app){
app.style.display="block"
}

console.log("AUTOMATION STUDIO X INICIADO")

},1200)

}
function updateOutputs(){

/* MOTOR */

if(plcMemory["Q0.0"]){

startIndustrialMotor()

}else{

stopIndustrialMotor()

}

}