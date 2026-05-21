const memory={

"I0.0":false,
"I0.1":false,
"I0.2":false,
"I0.3":false,

"Q0.0":false,
"Q0.1":false,
"Q0.2":false,
"Q0.3":false

}

function toggleInput(addr){

memory[addr]=!memory[addr]

log(addr+" = "+memory[addr])

runPLC()

}

setInterval(()=>{

runPLC()

},100)
