/* =========================================================
   AUTOMATION STUDIO X - VFD.JS PRO
========================================================= */

const vfd = {

running:false,
reverse:false,

freq:0,
targetFreq:0,

rpm:0,
amps:0,
volts:380,

accelTime:5,
decelTime:4,

temperature:30,

alarm:false,
alarmText:"NINGUNA",

mode:"LOCAL",

interval:null

}

/* =========================================================
   INIT
========================================================= */

window.addEventListener("DOMContentLoaded",()=>{

initializeVFD()

})

function initializeVFD(){

console.log("VFD INIT OK")

const slider=document.getElementById("freqSlider")

if(slider){

slider.min=0
slider.max=120
slider.step=1
slider.value=0

/* =====================================
   EVENTO SLIDER
===================================== */

slider.addEventListener("input",(e)=>{

updateVFD(e.target.value)

})

}

/* =====================================
   RESET VARIABLES
===================================== */

vfd.freq=0
vfd.targetFreq=0
vfd.rpm=0
vfd.amps=0
vfd.temperature=30

updateVFDUI()

startVFDSimulation()

}

/* =========================================================
   MAIN LOOP
========================================================= */

function startVFDSimulation(){

if(vfd.interval){

clearInterval(vfd.interval)

}

vfd.interval=setInterval(()=>{

simulateVFD()

},100)

}

/* =========================================================
   SIMULATION
========================================================= */

function simulateVFD(){

/* =====================================
   RUN
===================================== */

if(vfd.running && !vfd.alarm){

let accelStep=

Math.max(
0.05,
vfd.targetFreq /
(vfd.accelTime * 10)
)

/* SUBE */

if(vfd.freq < vfd.targetFreq){

vfd.freq += accelStep

if(vfd.freq > vfd.targetFreq){

vfd.freq = vfd.targetFreq

}

}

/* BAJA */

if(vfd.freq > vfd.targetFreq){

vfd.freq -= accelStep

if(vfd.freq < vfd.targetFreq){

vfd.freq = vfd.targetFreq

}

}

}

/* =====================================
   STOP
===================================== */

if(!vfd.running){

let decelStep=

Math.max(
0.08,
120 /
(vfd.decelTime * 10)
)

if(vfd.freq > 0){

vfd.freq -= decelStep

}

if(vfd.freq < 0){

vfd.freq = 0

}

}

/* =====================================
   CALCULOS
===================================== */

vfd.rpm = Math.floor(vfd.freq * 29.2)

vfd.amps = parseFloat(
(vfd.freq * 0.16).toFixed(1)
)

vfd.volts =
Math.floor(
120 + (vfd.freq * 4.3)
)

/* =====================================
   TEMPERATURA
===================================== */

if(vfd.running){

vfd.temperature +=
0.015 + (vfd.freq / 10000)

}else{

vfd.temperature -= 0.03

}

if(vfd.temperature < 28){

vfd.temperature = 28

}

if(vfd.temperature > 90){

vfd.temperature = 90

}

/* =====================================
   ALARMAS
===================================== */

checkVFDAlarms()

/* =====================================
   UPDATE UI
===================================== */

updateVFDUI()

}

/* =========================================================
   UI UPDATE
========================================================= */

function updateVFDUI(){

/* =====================================
   DISPLAY PRINCIPAL
===================================== */

setText(
"freqDisplay",
vfd.freq.toFixed(2) + " Hz"
)

setText(
"vfdFreqBig",
vfd.freq.toFixed(2) + " Hz"
)

setText(
"vfdRpmBig",
vfd.rpm + " RPM"
)

setText(
"vfdAmp",
vfd.amps.toFixed(1) + " A"
)

/* =====================================
   GAUGES
===================================== */

setText(
"freqGaugeText",
vfd.freq.toFixed(0) + " Hz"
)

setText(
"rpmGaugeText",
vfd.rpm + " RPM"
)

setText(
"ampGaugeText",
vfd.amps.toFixed(1) + " A"
)

setText(
"voltGaugeText",
vfd.volts + " V"
)

/* =====================================
   TABLA
===================================== */

setText(
"tableFreq",
vfd.freq.toFixed(1) + " Hz"
)

setText(
"tableTemp",
vfd.temperature.toFixed(1) + " °C"
)

setText(
"tableVolt",
vfd.volts + " V"
)

setText(
"tableAmp",
vfd.amps.toFixed(1) + " A"
)

setText(
"alarmText",
vfd.alarmText
)

setText(
"vfdDirection",
vfd.reverse ? "REV" : "FWD"
)

setText(
"modeText",
vfd.mode
)

/* =====================================
   STATUS
===================================== */

const status =
document.getElementById("vfdStatus")

if(status){

if(vfd.alarm){

status.innerHTML = "ALARM"
status.style.color = "#ff3355"

}
else if(vfd.running){

status.innerHTML = "RUNNING"
status.style.color = "#00ff99"

}
else{

status.innerHTML = "STOP"
status.style.color = "#ffffff"

}

}

/* =====================================
   NEEDLES
===================================== */

rotateNeedle(
"needleFreq",
(vfd.freq / 120) * 180 - 90
)

rotateNeedle(
"needleRPM",
(vfd.rpm / 3600) * 180 - 90
)

rotateNeedle(
"needleAmp",
(vfd.amps / 20) * 180 - 90
)

rotateNeedle(
"needleVolt",
(vfd.volts / 500) * 180 - 90
)

/* =====================================
   MOTOR FAN
===================================== */

const fan =
document.getElementById("motorFan")

if(fan){

if(vfd.running && vfd.freq > 0){

fan.style.animationPlayState = "running"

fan.style.animationDuration =

Math.max(
0.08,
0.5 - (vfd.freq / 300)
) + "s"

}else{

fan.style.animationPlayState = "paused"

}

}

/* =====================================
   SINCRONIZA SLIDER
===================================== */

const slider=
document.getElementById("freqSlider")

if(slider){

if(
document.activeElement !== slider
){

slider.value=vfd.targetFreq

}

}

}

/* =========================================================
   COMMANDS
========================================================= */

function startVFD(){

if(vfd.alarm){

console.log("ALARM ACTIVE")
return

}

vfd.running = true

console.log("VFD START")

}

function stopVFD(){

vfd.running = false

console.log("VFD STOP")

}

function reverseVFD(){

vfd.reverse = !vfd.reverse

console.log(
"REVERSE:",
vfd.reverse
)

}

function resetVFDAlarm(){

vfd.alarm = false

vfd.alarmText = "NINGUNA"

console.log("RESET ALARM")

}

/* =========================================================
   FREQUENCY
========================================================= */

function updateVFD(freq){

vfd.targetFreq = parseFloat(freq)

if(isNaN(vfd.targetFreq)){

vfd.targetFreq = 0

}

/* DISPLAY INSTANTANEO */

setText(
"freqDisplay",
vfd.targetFreq.toFixed(2) + " Hz"
)

console.log(
"TARGET FREQ:",
vfd.targetFreq
)

}

/* =========================================================
   BUTTONS
========================================================= */

function vfdFreqUp(){

const slider =
document.getElementById("freqSlider")

if(!slider)return

slider.value =

Math.min(
120,
parseInt(slider.value) + 5
)

updateVFD(slider.value)

}

function vfdFreqDown(){

const slider =
document.getElementById("freqSlider")

if(!slider)return

slider.value =

Math.max(
0,
parseInt(slider.value) - 5
)

updateVFD(slider.value)

}

/* =========================================================
   PARAMETERS
========================================================= */

function setAccelTime(value){

vfd.accelTime =
parseFloat(value)

}

function setDecelTime(value){

vfd.decelTime =
parseFloat(value)

}

function setLocalMode(){

vfd.mode = "LOCAL"

console.log("LOCAL MODE")

}

function setRemoteMode(){

vfd.mode = "REMOTE"

console.log("REMOTE MODE")

}

/* =========================================================
   ALARMS
========================================================= */

function checkVFDAlarms(){

/* OVER TEMP */

if(vfd.temperature >= 80){

vfd.alarm = true
vfd.running = false

vfd.alarmText =
"OVER TEMP"

}

/* OVER CURRENT */

if(vfd.amps >= 18){

vfd.alarm = true
vfd.running = false

vfd.alarmText =
"OVER CURRENT"

}

}

/* =========================================================
   HELPERS
========================================================= */

function setText(id,value){

const el =
document.getElementById(id)

if(el){

el.innerHTML = value

}

}

function rotateNeedle(id,deg){

const el =
document.getElementById(id)

if(el){

el.style.transform =
`rotate(${deg}deg)`

}

}