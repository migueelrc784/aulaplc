function log(text){

const p=document.createElement("p")

p.innerHTML=
new Date().toLocaleTimeString()
+" → "+
text

document.getElementById("logBox")
.prepend(p)

}
