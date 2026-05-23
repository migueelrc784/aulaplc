/* =========================================================
AUTOMATION STUDIO X - LOGS.JS PRO
========================================================= */

/* =========================================================
CREATE LOG
========================================================= */

function log(text,type="info"){

const logBox =
document.getElementById("logBox")

if(!logBox){

console.warn("logBox no existe")

return

}

/* =========================================================
CREATE ELEMENT
========================================================= */

const item =
document.createElement("div")

item.className =
`log-item log-${type}`

/* =========================================================
TIME
========================================================= */

const time =
new Date().toLocaleTimeString()

/* =========================================================
ICON
========================================================= */

let icon = "ℹ️"

if(type==="success"){

icon = "✅"

}

else if(type==="error"){

icon = "❌"

}

else if(type==="warning"){

icon = "⚠️"

}

else if(type==="plc"){

icon = "⚡"

}

else if(type==="motor"){

icon = "🌀"

}

else if(type==="vfd"){

icon = "🔵"

}

/* =========================================================
CONTENT
========================================================= */

item.innerHTML = `

<div class="log-header">

<span class="log-time">
${time}
</span>

<span class="log-icon">
${icon}
</span>

</div>

<div class="log-text">
${text}
</div>

`

/* =========================================================
INSERT TOP
========================================================= */

logBox.prepend(item)

/* =========================================================
LIMIT LOGS
========================================================= */

const logs =
logBox.querySelectorAll(".log-item")

if(logs.length > 100){

logs[logs.length - 1].remove()

}

/* =========================================================
AUTO SCROLL
========================================================= */

logBox.scrollTop = 0

}

/* =========================================================
INPUT LOG
========================================================= */

function logInput(address,state){

log(

`${address} CAMBIÓ A ${
state ? "TRUE" : "FALSE"
}`,

"success"

)

}

/* =========================================================
OUTPUT LOG
========================================================= */

function logOutput(address,state){

log(

`${address} → ${
state ? "ACTIVADO" : "DESACTIVADO"
}`,

"plc"

)

}

/* =========================================================
PLC LOG
========================================================= */

function logPLC(text){

log(text,"plc")

}

/* =========================================================
WARNING LOG
========================================================= */

function logWarning(text){

log(text,"warning")

}

/* =========================================================
ERROR LOG
========================================================= */

function logError(text){

log(text,"error")

}

/* =========================================================
MOTOR LOG
========================================================= */

function logMotor(text){

log(text,"motor")

}

/* =========================================================
VFD LOG
========================================================= */

function logVFD(text){

log(text,"vfd")

}

/* =========================================================
AUTO START
========================================================= */

window.addEventListener("load",()=>{

setTimeout(()=>{

logPLC(
"SISTEMA PLC INICIADO"
)

log(
"ENGINE READY",
"success"
)

log(
"SCAN TIME 120ms",
"info"
)

logVFD(
"VFD-950 ONLINE"
)

},800)

})