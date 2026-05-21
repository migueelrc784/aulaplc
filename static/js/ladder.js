console.log("LADDER JS cargado");

function addContact(){

const ladder = document.getElementById("ladder");

if(!ladder) return;

const rung = document.createElement("div");

rung.className = "rung";

rung.innerHTML = `

<div class="contact">
I0.0
</div>

<div class="line"></div>

<div class="coil">
Q0.0
</div>

`;

ladder.appendChild(rung);

}
