console.log("LOGS JS cargado");

function addLog(text){

const logBox = document.getElementById("logBox");

if(!logBox) return;

const p = document.createElement("p");

p.innerHTML =
new Date().toLocaleTimeString() +
" → " +
text;

logBox.prepend(p);

}
