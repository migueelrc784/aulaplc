function evaluateContact(type,address){

let val=memory[address]

if(type==="NO"){
return val
}

if(type==="NC"){
return !val
}

return false

}

function runPLC(){

const rungs=document.querySelectorAll(".rung")

memory["Q0.0"]=false
memory["Q0.1"]=false
memory["Q0.2"]=false
memory["Q0.3"]=false

rungs.forEach(rung=>{

let power=true

const elements=rung.children

elements.forEach(el=>{

if(el.classList.contains("contact")){

const state=evaluateContact(
el.dataset.type,
el.dataset.address
)

if(state){

el.classList.add("powered")

}else{

el.classList.remove("powered")

power=false

}

}

if(el.classList.contains("coil")){

memory[el.dataset.address]=power

if(power){

el.classList.add("powered")

}else{

el.classList.remove("powered")

}

}

})

})

updateOutputs()

}
