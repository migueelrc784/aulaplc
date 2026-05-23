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

slider.addEventListener("input",(e)=>{

updateVFD(e.target.value)

})

}

vfd.targetFreq=60

bindVFDButtons()

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

/* =========================
   ACELERACION
========================= */

if(vfd.running && !vfd.alarm){

const accelStep =
(vfd.targetFreq / (vfd.accelTime * 10))

if(vfd.freq < vfd.targetFreq){

vfd.freq += accelStep

if(vfd.freq > vfd.targetFreq){

vfd.freq = vfd.targetFreq

}

}

}

/* =========================
   DESACELERACION
========================= */

else{

const decelStep =
(Math.max(vfd.freq,1) /
(vfd.decelTime * 10))

if(vfd.freq > 0){

vfd.freq -= decelStep

if(vfd.freq < 0){

vfd.freq = 0

}

}

}

/* =========================
   CALCULOS MOTOR
========================= */

vfd.rpm = Math.floor(vfd.freq * 29.16)

vfd.amps = (
(vfd.freq / 5.5) +
(vfd.running ? 1.2 : 0)
).toFixed(1)

vfd.volts = Math.floor(
120 + (vfd.freq * 4.3)
)

/* =========================
   TEMPERATURA
========================= */

if(vfd.running){

vfd.temperature +=
(0.015 + (vfd.freq / 10000))

}else{

vfd.temperature -= 0.03

}

vfd.temperature = Math.max(
28,
Math.min(90,vfd.temperature)
)

/* =========================
   ALARMAS
========================= */

checkVFDAlarms()

/* =========================
   UI
========================= */

updateVFDUI()

}

/* =========================
   UI GENERAL
========================= */

function updateVFDUI(){

/* DISPLAY PRINCIPAL */

setText(
"freqDisplay",
vfd.freq.toFixed(2)
)

setText(
"vfdFreqBig",
vfd.freq.toFixed(2)+" Hz"
)

setText(
"vfdRpmBig",
vfd.rpm+" RPM"
)

setText(
"vfdAmp",
vfd.amps+" A"
)

/* GAUGES */

setText(
"freqGaugeText",
vfd.freq.toFixed(0)+" Hz"
)

setText(
"rpmGaugeText",
vfd.rpm+" RPM"
)

setText(
"ampGaugeText",
vfd.amps+" A"
)

setText(
"voltGaugeText",
vfd.volts+" V"
)

/* ESTADO */

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

status.style.color = "#ffcc00"

}

}

/* DIRECCION */

setText(
"vfdDirection",
vfd.reverse ? "REV" : "FWD"
)

/* PARAMETROS */

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

setText(
"modeText",
vfd.mode
)

/* AGUJAS */

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
(vfd.amps / 25) * 180 - 90
)

rotateNeedle(
"needleVolt",
(vfd.volts / 500) * 180 - 90
)

/* MOTOR */

animateMotor()

/* LEDS */

updateLEDs()

}

/* =========================
   MOTOR ANIMATION
========================= */

function animateMotor(){

const fan =
document.getElementById("motorFan")

if(!fan)return

if(vfd.running && !vfd.alarm){

fan.style.animationPlayState =
"running"

const speed =
Math.max(
0.08,
1 - (vfd.freq / 120)
)

fan.style.animationDuration =
speed+"s"

}
else{

fan.style.animationPlayState =
"paused"

}

}

/* =========================
   LEDS
========================= */

function updateLEDs(){

const runLed =
document.getElementById("runLed")

const alarmLed =
document.getElementById("alarmLed")

const reverseLed =
document.getElementById("reverseLed")

if(runLed){

runLed.classList.toggle(
"green-led",
vfd.running && !vfd.alarm
)

}

if(alarmLed){

alarmLed.classList.toggle(
"red-led",
vfd.alarm
)

}

if(reverseLed){

reverseLed.classList.toggle(
"green-led",
vfd.reverse
)

}

}

/* =========================
   COMANDOS
========================= */

function startVFD(){

if(vfd.alarm)return

vfd.running = true

}

function stopVFD(){

vfd.running = false

}

function reverseVFD(){

vfd.reverse = !vfd.reverse

}

function resetVFDAlarm(){

vfd.alarm = false

vfd.alarmText = "NINGUNA"

}

/* =========================
   FRECUENCIA
========================= */

function updateVFD(freq){

vfd.targetFreq = parseFloat(freq)

}

function vfdFreqUp(){

const slider =
document.getElementById("freqSlider")

if(!slider)return

slider.value = Math.min(
120,
parseInt(slider.value) + 5
)

updateVFD(slider.value)

}

function vfdFreqDown(){

const slider =
document.getElementById("freqSlider")

if(!slider)return

slider.value = Math.max(
0,
parseInt(slider.value) - 5
)

updateVFD(slider.value)

}

/* =========================
   PARAMETROS
========================= */

function setAccelTime(value){

vfd.accelTime =
Math.max(1,parseFloat(value))

}

function setDecelTime(value){

vfd.decelTime =
Math.max(1,parseFloat(value))

}

function setLocalMode(){

vfd.mode = "LOCAL"

updateVFDUI()

}

function setRemoteMode(){

vfd.mode = "REMOTE"

updateVFDUI()

}

/* =========================
   ALARMAS
========================= */

function checkVFDAlarms(){

if(vfd.temperature >= 80){

vfd.alarm = true

vfd.running = false

vfd.alarmText = "OVER TEMP"

}

else if(parseFloat(vfd.amps) >= 18){

vfd.alarm = true

vfd.running = false

vfd.alarmText = "OVER CURRENT"

}

else if(vfd.volts >= 480){

vfd.alarm = true

vfd.running = false

vfd.alarmText = "OVER VOLT"

}

}

/* =========================
   BOTONES HTML
========================= */

function bindVFDButtons(){

const runBtn =
document.getElementById("runBtn")

const stopBtn =
document.getElementById("stopBtn")

const revBtn =
document.getElementById("revBtn")

const resetBtn =
document.getElementById("resetBtn")

const plusBtn =
document.getElementById("freqPlus")

const minusBtn =
document.getElementById("freqMinus")

if(runBtn){

runBtn.onclick = startVFD

}

if(stopBtn){

stopBtn.onclick = stopVFD

}

if(revBtn){

revBtn.onclick = reverseVFD

}

if(resetBtn){

resetBtn.onclick = resetVFDAlarm

}

if(plusBtn){

plusBtn.onclick = vfdFreqUp

}

if(minusBtn){

minusBtn.onclick = vfdFreqDown

}

}

/* =========================
   HELPERS
========================= */

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