/* =========================================================
PLC MEMORY
========================================================= */

const plcMemory={

    inputs:{},
    outputs:{},
    markers:{},
    timers:{}

}

/* =========================================================
INIT IO
========================================================= */

[
"I0.0",
"I0.1",
"I0.2",
"I0.3",
"I0.4",
"I0.5"
].forEach(i=>{

    plcMemory.inputs[i]=false

})

[
"Q0.0",
"Q0.1",
"Q0.2",
"Q0.3"
].forEach(q=>{

    plcMemory.outputs[q]=false

})

/* =========================================================
TIMERS
========================================================= */

plcMemory.timers["T0.0"]={

    EN:false,
    TT:false,
    DN:false,
    ACC:0,
    PRE:3000,
    START:0

}

/* =========================================================
READ ADDRESS
========================================================= */

function readAddress(address){

    if(address.startsWith("I")){

        return plcMemory.inputs[address] || false

    }

    if(address.startsWith("Q")){

        return plcMemory.outputs[address] || false

    }

    if(address.startsWith("M")){

        return plcMemory.markers[address] || false

    }

    if(address.startsWith("T")){

        return plcMemory.timers[address]?.DN || false

    }

    return false

}

/* =========================================================
WRITE ADDRESS
========================================================= */

function writeAddress(address,value){

    if(address.startsWith("Q")){

        plcMemory.outputs[address]=value

    }

    if(address.startsWith("M")){

        plcMemory.markers[address]=value

    }

}

/* =========================================================
VISUAL POWER
========================================================= */

function setPowered(element,power){

    element.classList.toggle(
        "powered",
        power
    )

}

/* =========================================================
CONTACT
========================================================= */

function evaluateContact(contact){

    const address=
    contact.dataset.address

    const type=
    contact.dataset.type

    const value=
    readAddress(address)

    if(type==="NO"){

        return value

    }

    if(type==="NC"){

        return !value

    }

    return false

}

/* =========================================================
TON TIMER
========================================================= */

function processTON(timer,power){

    const address=
    timer.dataset.address

    const preset=
    parseInt(
        timer.dataset.preset || 3000
    )

    if(!plcMemory.timers[address]){

        plcMemory.timers[address]={

            EN:false,
            TT:false,
            DN:false,
            ACC:0,
            PRE:preset,
            START:0

        }

    }

    const t=
    plcMemory.timers[address]

    if(power){

        t.EN=true

        if(t.START===0){

            t.START=Date.now()

        }

        t.ACC=
        Date.now()-t.START

        t.TT=
        t.ACC<preset

        t.DN=
        t.ACC>=preset

    }else{

        t.EN=false
        t.TT=false
        t.DN=false
        t.ACC=0
        t.START=0

    }

    timer.innerHTML=`
    TON ${address}
    <small>${Math.floor(t.ACC/1000)}s</small>
    <div class="delete-element">✕</div>
    `

    setPowered(timer,t.DN)

    return t.DN

}

/* =========================================================
COIL
========================================================= */

function processCoil(coil,power){

    const address=
    coil.dataset.address

    writeAddress(
        address,
        power
    )

    setPowered(
        coil,
        power
    )

}

/* =========================================================
RESET OUTPUTS
========================================================= */

function resetOutputs(){

    Object.keys(plcMemory.outputs)
    .forEach(output=>{

        plcMemory.outputs[output]=false

    })

}

/* =========================================================
SCAN PLC
========================================================= */

function scanPLC(){

    resetOutputs()

    const rungs=
    document.querySelectorAll(".rung")

    rungs.forEach(rung=>{

        let rungPower=true

        const elements=
        rung.querySelectorAll(
            ".contact,.timer,.coil"
        )

        elements.forEach(element=>{

            /* CONTACT */

            if(
                element.classList.contains("contact")
            ){

                const result=
                evaluateContact(element)

                setPowered(
                    element,
                    result
                )

                rungPower=
                rungPower && result

            }

            /* TIMER */

            if(
                element.classList.contains("timer")
            ){

                rungPower=
                processTON(
                    element,
                    rungPower
                )

            }

            /* COIL */

            if(
                element.classList.contains("coil")
            ){

                processCoil(
                    element,
                    rungPower
                )

            }

        })

        rung.classList.toggle(
            "active",
            rungPower
        )

    })

    updateOutputs()

}