let vfdReverse=false

function updateVFD(freq){

freq=parseFloat(freq)

const rpm=Math.floor(freq*29.16)
const amp=(freq/6).toFixed(1)

document.getElementById("freqDisplay").innerHTML=
freq.toFixed(2)

document.getElementById("vfdFreqBig").innerHTML=
freq.toFixed(2)+" Hz"

document.getElementById("vfdRpmBig").innerHTML=
rpm+" RPM"

document.getElementById("vfdAmp").innerHTML=
amp+" A"

document.getElementById("freqGaugeText").innerHTML=
freq.toFixed(0)+" Hz"

document.getElementById("rpmGaugeText").innerHTML=
rpm+" RPM"

document.getElementById("needleFreq").style.transform=
`rotate(${(freq/120)*180-90}deg)`

document.getElementById("needleRPM").style.transform=
`rotate(${(rpm/3000)*180-90}deg)`

}

function startVFD(){

document.getElementById("vfdStatus").innerHTML=
"RUNNING"

document.getElementById("vfdStatus").style.color=
"#00ff99"

}

function stopVFD(){

document.getElementById("vfdStatus").innerHTML=
"STOP"

document.getElementById("vfdStatus").style.color=
"#ff3355"

updateVFD(0)

}

function reverseVFD(){

vfdReverse=!vfdReverse

document.getElementById("vfdDirection").innerHTML=
vfdReverse ? "REV" : "FWD"

}

function vfdFreqUp(){

const slider=document.getElementById("freqSlider")

slider.value=Math.min(
120,
parseInt(slider.value)+5
)

updateVFD(slider.value)

}

function vfdFreqDown(){

const slider=document.getElementById("freqSlider")

slider.value=Math.max(
0,
parseInt(slider.value)-5
)

updateVFD(slider.value)

}

window.addEventListener("load",()=>{

updateVFD(60)

})