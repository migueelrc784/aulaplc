/* =========================================================
CREATE NC DIAGONALS
========================================================= */

function buildNC(){

document.querySelectorAll(
'.contact[data-type="NC"]'
).forEach(contact=>{

if(!contact.querySelector(".diag")){

const diag=document.createElement("div")
diag.className="diag"

contact.appendChild(diag)

}

})

}

buildNC()

/* =========================================================
DELETE ELEMENT
========================================================= */

document.addEventListener("click",e=>{

if(e.target.classList.contains(
"delete-element"
)){

e.target.parentElement.remove()

scanPLC()

}

})

/* =========================================================
ADD CONTACT NO
========================================================= */

function addNO(){

const rung=document.querySelector(".rung")

const c=document.createElement("div")

c.className="contact"

c.dataset.type="NO"
c.dataset.address="I0.0"

c.innerHTML=`

I0.0
<div class="delete-element">✕</div>

`

rung.insertBefore(
document.createElement("div"),
rung.lastElementChild
)

rung.children[rung.children.length-2]
.className="line"

rung.insertBefore(
c,
rung.lastElementChild
)

scanPLC()

}

/* =========================================================
ADD CONTACT NC
========================================================= */

function addNC(){

const rung=document.querySelector(".rung")

const c=document.createElement("div")

c.className="contact"

c.dataset.type="NC"
c.dataset.address="I0.1"

c.innerHTML=`

/I0.1
<div class="diag"></div>
<div class="delete-element">✕</div>

`

const line=document.createElement("div")
line.className="line"

rung.insertBefore(
line,
rung.lastElementChild
)

rung.insertBefore(
c,
rung.lastElementChild
)

scanPLC()

}

/* =========================================================
ADD COIL
========================================================= */

function addCoil(){

const rung=document.querySelector(".rung")

const c=document.createElement("div")

c.className="coil"

c.dataset.address="Q0.0"

c.innerHTML=`

(Q0.0)
<div class="delete-element">✕</div>

`

const line=document.createElement("div")
line.className="line"

rung.insertBefore(
line,
rung.lastElementChild
)

rung.insertBefore(
c,
rung.lastElementChild
)

scanPLC()

}

/* =========================================================
ADD TON
========================================================= */

function addTON(){

const rung=document.querySelector(".rung")

const t=document.createElement("div")

t.className="timer"

t.dataset.address="T0.0"

t.innerHTML=`

3000ms
<div class="delete-element">✕</div>

`

const line=document.createElement("div")
line.className="line"

rung.insertBefore(
line,
rung.lastElementChild
)

rung.insertBefore(
t,
rung.lastElementChild
)

scanPLC()

}

/* =========================================================
ADD RUNG
========================================================= */

function addRung(){

const ladder=document.getElementById("ladder")

const rung=document.createElement("div")

rung.className="rung"

rung.innerHTML=`

<div class="rail"></div>

<div class="contact"
data-type="NO"
data-address="I0.0">

I0.0

<div class="delete-element">
✕
</div>

</div>

<div class="line"></div>

<div class="coil"
data-address="Q0.0">

(Q0.0)

<div class="delete-element">
✕
</div>

</div>

<div class="rail"></div>

`

ladder.appendChild(rung)

scanPLC()

}