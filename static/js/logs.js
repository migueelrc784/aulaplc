function log(text){

const logBox=document.getElementById("logBox")

if(!logBox){
console.warn("logBox no existe")
return
}

const p=document.createElement("p")

p.innerHTML=
new Date().toLocaleTimeString()
+" → "+
text

logBox.prepend(p)

}
