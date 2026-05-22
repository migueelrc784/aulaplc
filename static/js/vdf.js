let vfd = {

running:false,
reverse:false,

freq:0,
targetFreq:60,

rpm:0,
amps:0,
volts:380,

accelTime:5,
decelTime:4,

temperature:32,

alarm:false,
alarmText:"NINGUNA",

mode:"LOCAL"

}

/* =========================
   INIT
========================= */

window.addEventListener("load",()=>{

const slider=document.getElementById("freqSlider")

if(slider){

slider.value=60

}

vfd.targetFreq=60

updateVFDUI()

startVFDSimulation()

})

/* =========================
   LOOP SIMULACION REAL
========================= */

function startVFDSimulation(){

setInterval(()=>{

simulateVFD()

},100)

}

function simulateVFD(){

/* ACELERACION */

if(vfd.running){

const accelStep=
vfd.targetFreq/(vfd.accelTime*10)

if(vfd.freq < vfd.targetFreq){

vfd.freq += accelStep

if(vfd.freq > vfd.targetFreq){

vfd.freq = vfd.targetFreq

}

}

}

/* DESACELERACION */

else{

const decelStep=
60/(vfd.decelTime*10)

if(vfd.freq > 0){

vfd.freq -= decelStep

if(vfd.freq < 0){

vfd.freq = 0

}

}

}

/* CALCULOS */

vfd.rpm=Math.floor(vfd.freq*29.16)

vfd.amps=(vfd.freq/6).toFixed(1)

vfd.volts=Math.floor(120+(vfd.freq*4.3))

/* TEMPERATURA */

if(vfd.running){

vfd.temperature += 0.02

}else{

vfd.temperature -= 0.01

}

vfd.temperature=Math.max(
28,
Math.min(85,vfd.temperature)
)

/* ALARMAS */

checkVFDAlarms()

/* UPDATE UI */

updateVFDUI()

}

/* =========================
   UI
========================= */

function updateVFDUI(){

/* DISPLAY */

setText("freqDisplay",
vfd.freq.toFixed(2))

setText("vfdFreqBig",
vfd.freq.toFixed(2)+" Hz")

setText("vfdRpmBig",
vfd.rpm+" RPM")

setText("vfdAmp",
vfd.amps+" A")

/* GAUGES */

setText("freqGaugeText",
vfd.freq.toFixed(0)+" Hz")

setText("rpmGaugeText",
vfd.rpm+" RPM")

setText("ampGaugeText",
vfd.amps+" A")

setText("voltGaugeText",
vfd.volts+" V")

/* ESTADO */

const status=document.getElementById("vfdStatus")

if(status){

status.innerHTML=
vfd.alarm
? "ALARM"
: (vfd.running ? "RUNNING" : "STOP")

status.style.color=
vfd.alarm
? "#ff3355"
: (vfd.running ? "#00ff99" : "#ff3355")

}

/* DIRECCION */

setText(
"vfdDirection",
vfd.reverse ? "REV" : "FWD"
)

/* TABLA */

setText(
"tableFreq",
vfd.freq.toFixed(1)+" Hz"
)

setText(
"tableTemp",
vfd.temperature.toFixed(0)+" °C"
)

setText(
"tableVolt",
vfd.volts+" V"
)

setText(
"tableAmp",
vfd.amps+" A"
)

setText(
"alarmText",
vfd.alarmText
)

/* AGUJAS */

rotateNeedle(
"needleFreq",
(vfd.freq/120)*180-90
)

rotateNeedle(
"needleRPM",
(vfd.rpm/3000)*180-90
)

rotateNeedle(
"needleAmp",
(vfd.amps/20)*180-90
)

rotateNeedle(
"needleVolt",
(vfd.volts/500)*180-90
)

}

/* =========================
   COMANDOS
========================= */

function startVFD(){

if(vfd.alarm){

return

}

vfd.running=true

}

function stopVFD(){

vfd.running=false

}

function reverseVFD(){

vfd.reverse=!vfd.reverse

}

function resetVFDAlarm(){

vfd.alarm=false

vfd.alarmText="NINGUNA"

}

/* =========================
   FRECUENCIA
========================= */

function updateVFD(freq){

vfd.targetFreq=parseFloat(freq)

}

function vfdFreqUp(){

const slider=document.getElementById("freqSlider")

if(!slider)return

slider.value=Math.min(
120,
parseInt(slider.value)+5
)

updateVFD(slider.value)

}

function vfdFreqDown(){

const slider=document.getElementById("freqSlider")

if(!slider)return

slider.value=Math.max(
0,
parseInt(slider.value)-5
)

updateVFD(slider.value)

}

/* =========================
   PARAMETROS
========================= */

function setAccelTime(value){

vfd.accelTime=parseFloat(value)

}

function setDecelTime(value){

vfd.decelTime=parseFloat(value)

}

function setLocalMode(){

vfd.mode="LOCAL"

}

function setRemoteMode(){

vfd.mode="REMOTE"

}

/* =========================
   ALARMAS
========================= */

function checkVFDAlarms(){

if(vfd.temperature >= 80){

vfd.alarm=true

vfd.running=false

vfd.alarmText="OVER TEMP"

}

if(vfd.amps >= 18){

vfd.alarm=true

vfd.running=false

vfd.alarmText="OVER CURRENT"

}

}

/* =========================
   HELPERS
========================= */

function setText(id,value){

const el=document.getElementById(id)

if(el){

el.innerHTML=value

}

}

function rotateNeedle(id,deg){

const el=document.getElementById(id)

if(el){

el.style.transform=
`rotate(${deg}deg)`

}

}