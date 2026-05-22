/* =========================================================
AUTOMATION STUDIO X - LOGS.JS
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

const p =
document.createElement("p")

p.className = `log-${type}`

const time =
new Date().toLocaleTimeString()

/* ICON */

let icon = "ℹ️"

if(type==="success"){

icon = "✅"

}

if(type==="error"){

icon = "❌"

}

if(type==="warning"){

icon = "⚠️"

}

if(type==="plc"){

icon = "⚡"

}

/* CONTENT */

p.innerHTML = `

<span class="log-time">
${time}
</span>

<span class="log-icon">
${icon}
</span>

<span class="log-text">
${text}
</span>

`

/* INSERT */

logBox.prepend(p)

/* LIMIT LOGS */

const logs =
logBox.querySelectorAll("p")

if(logs.length > 100){

logs[logs.length - 1].remove()

}

/* AUTO SCROLL */

logBox.scrollTop = 0

}

/* =========================================================
SPECIAL LOGS
========================================================= */

function logInput(address,state){

log(

`${address} → ${
state ? "TRUE" : "FALSE"
}`,

"success"

)

}

function logOutput(address,state){

log(

`${address} → ${
state ? "ON" : "OFF"
}`,

"plc"

)

}

function logPLC(text){

log(text,"plc")

}

function logWarning(text){

log(text,"warning")

}

function logError(text){

log(text,"error")

}

/* =========================================================
AUTO START LOG
========================================================= */

window.addEventListener("load",()=>{

setTimeout(()=>{

logPLC(
"SISTEMA DE LOGS INICIADO"
)

},800)

})