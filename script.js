document.getElementById('start-race').disabled = true
document.getElementById('stop-race').disabled = true
document.getElementById('add-pedro').disabled = true
document.getElementById('add-juca').disabled = true
document.getElementById('add-edna').disabled = true
document.querySelectorAll('.levelup').disabled = true

document.querySelectorAll(".pedro-unit")[0].classList.add('selected')

document.querySelectorAll(".juca-unit")[0].classList.add('selected')

document.querySelectorAll(".edna-unit")[0].classList.add('selected')

let pedroEsc = 0
let jucaEsc = 0
let ednaEsc = 0

let pointsP = 0
let pedroLv = 1
let pointsJ = 0
let jucaLv = 1
let pointsE = 0
let ednaLv = 1

let result = document.getElementById('result');

let car = {
    rarity: ['Popular', 'Sport', 'Super Sport'],
    vMaxMin: [180.0, 195.0, 210.0],
    vMaxMax: [200.0, 215.0, 230.0],
    vMinMin: [110.0, 125.0, 140.0],
    vMinMax: [130.0, 140.0, 160.0],
    derMin: [3.0, 2.0, 1.0],
    derMax: [4.0, 3.0, 1.75]
}

let pedroCars = []
let jucaCars = []
let ednaCars = []


let contP = 0
let contJ = 0
let contE = 0

let laps

function createCar(){
    this.number = carType();
    this.level = 0;
    this.rarity = car.rarity[this.number];
    this.vMax = randomNumber(car.vMaxMin[this.number], car.vMaxMax[this.number]);
    this.vMin = randomNumber(car.vMinMin[this.number], car.vMinMax[this.number]);
    this.der = randomNumber(car.derMin[this.number], car.derMax[this.number]);
}

function showCars(num){
    if(num == 1){
        document.querySelectorAll("button.pedro-unit")[pedroCars.length-1].innerHTML = pedroCars[pedroCars.length-1].rarity
    }
    else if(num == 2){
        document.querySelectorAll("button.juca-unit")[jucaCars.length-1].innerHTML = jucaCars[jucaCars.length-1].rarity
    }
    else{
        document.querySelectorAll("button.edna-unit")[ednaCars.length-1].innerHTML = ednaCars[ednaCars.length-1].rarity
    }
}

function randomNumber(min, max){
    return Math.random() * (max - min) + min;
}

function carType(){
    let tipo = randomNumber(1, 100);
    if(tipo > 40){
        return 0
    }
    else if(tipo > 5){
        return 1
    }
    else{
        return 2
    }
}

function raceLap(min, max, der){
    let v = randomNumber(min, max);
    v = v - (v * der / 100);
    return v;
}

function stopRace() {
    result.innerHTML = ""
    document.getElementById('pedro-choise').innerHTML = ""
    document.getElementById('juca-choise').innerHTML = ""
    document.getElementById('edna-choise').innerHTML = ""
    contP = 0
    contJ = 0
    contE = 0
    pointsP = 0
    pointsJ = 0
    pointsE = 0
    document.querySelectorAll(".pedro-unit").forEach( choise => {
        choise.classList.remove('selected')
    })
    document.querySelectorAll(".juca-unit").forEach( choise => {
        choise.classList.remove('selected')
    })
    document.querySelectorAll(".edna-unit").forEach( choise => {
        choise.classList.remove('selected')
    })
    pointsP = 0
    pointsJ = 0
    pointsE = 0

    document.getElementById('start-race').disabled = true
    document.getElementById('stop-race').disabled = true
    document.getElementById('add-pedro').disabled = true
    document.getElementById('add-juca').disabled = true
    document.getElementById('add-edna').disabled = true
    document.querySelectorAll(".levelup")[0].disabled = true
    document.querySelectorAll(".levelup")[1].disabled = true
    document.querySelectorAll(".levelup")[2].disabled = true
    document.getElementById('start-race').style.opacity = 0.6
    document.getElementById('stop-race').style.opacity = 0.6
    document.getElementById('add-pedro').style.opacity = 0.6
    document.getElementById('add-juca').style.opacity = 0.6
    document.getElementById('add-edna').style.opacity = 0.6
    document.querySelectorAll(".levelup")[0].opacity = 0.6
    document.querySelectorAll(".levelup")[1].opacity = 0.6
    document.querySelectorAll(".levelup")[2].opacity = 0.6
    
    while(pedroCars.length > 0){
        document.querySelectorAll("button.pedro-unit")[pedroCars.length - 1].innerHTML = ""
        pedroCars.pop()
    }
    while(jucaCars.length > 0){
        document.querySelectorAll("button.juca-unit")[jucaCars.length - 1].innerHTML = ""
        jucaCars.pop()
    }
    while(ednaCars.length > 0){
        document.querySelectorAll("button.edna-unit")[ednaCars.length - 1].innerHTML = ""
        ednaCars.pop()
    }
}

function levelUp(x){
    if(x == "1"){
        if(pointsP >= 450){
            if(pedroLv < 10){
                pedroCars.forEach( car => {
                    car.vMin*= 1.01
                    car.vMax*= 1.01
                })
                pointsP-=450
                pedroLv++
                console.log(pedroLv)
                document.getElementById('pedro-choise').innerHTML = "=> Level " + pedroLv
            }else{
                alert('Level Máximo')
            }
        }else{
            alert('Pontos Insuficientes')
        }
    }
    else if(x == "2"){
        if(pointsJ >= 450){
            if(jucaLv < 10){
                jucaCars.forEach( car => {
                    car.vMin*= 1.01
                    car.vMax*= 1.01
                })
                jucaLv++
                pointsJ-=450
                document.getElementById('juca-choise').innerHTML = "=> Level " + jucaLv
            }else{
                alert('Level Máximo')
            }
        }else{
            alert('Pontos Insuficientes')
        }
    }
    else if(x == "3"){
        if(pointsE >= 450){
            if(ednaLv < 10){
                ednaCars.forEach( car => {
                    car.vMin*= 1.01
                    car.vMax*= 1.01
                })
                ednaLv++
                pointsE-=450
                document.getElementById('edna-choise').innerHTML = "=> Level " + ednaLv
            }else{
                alert('Level Máximo')
            }
        }else{
            alert('Pontos Insuficientes')
        }
    }
}

function raceResult(result){
    let lapPointsP = 0;
    let lapPointsJ = 0;
    let lapPointsE = 0;
    for(let i = 0; i < laps; i++){
        let vP = raceLap(pedroCars[pedroEsc].vMin, pedroCars[pedroEsc].vMax, pedroCars[pedroEsc].der);
        let vJ = raceLap(jucaCars[jucaEsc].vMin, jucaCars[jucaEsc].vMax, jucaCars[jucaEsc].der);
        let vE = raceLap(ednaCars[ednaEsc].vMin, ednaCars[ednaEsc].vMax, ednaCars[ednaEsc].der);
        if(vP > vJ && vP > vE){
            lapPointsP++;
        }
        if(vJ > vP && vJ > vE){
            lapPointsJ++;
        }
        if(vE > vP && vE > vJ){
            lapPointsE++;
        }
    }
    if(lapPointsP > lapPointsJ && lapPointsP > lapPointsE){
        result.innerHTML = "O Vencedor é Pedro!!"
        pointsP+= 200
        if(lapPointsJ == lapPointsE){
            result.innerHTML += '<br>' + "Segundo Lugar: Juca e Edna | Empate"
            pointsJ+= 120
            pointsE+= 120
        }
        else if(lapPointsJ > lapPointsE){
            result.innerHTML += '<br>' + "Segundo Lugar: Juca"
            result.innerHTML += '<br>' + "Terceiro Lugar: Edna"
            pointsJ+= 120
            pointsE+= 50
        }
        else{
            result.innerHTML += '<br>' + "Segundo Lugar: Edna"
            result.innerHTML += '<br>' + "Terceiro Lugar: Juca"
            pointsE+= 120
            pointsJ+= 50
        }
    }
    else if(lapPointsJ > lapPointsP && lapPointsJ > lapPointsE){
        result.innerHTML = "O Vencedor é Juca!!"
        pointsJ+= 200
        if(lapPointsP == lapPointsE){
            result.innerHTML += '<br>' + "Segundo Lugar: Pedro e Edna | Empate"
            pointsP+= 120
            pointsE+= 120
        }
        else if(lapPointsP > lapPointsE){
            result.innerHTML += '<br>' + "Segundo Lugar: Pedro"
            result.innerHTML += '<br>' + "Terceiro Lugar: Edna"
            pointsP+= 120
            pointsE+= 50
        }
        else{
            result.innerHTML += '<br>' + "Segundo Lugar: Edna"
            result.innerHTML += '<br>' + "Terceiro Lugar: Pedro"
            pointsE+= 120
            pointsP+= 50
        }
    }
    else if(lapPointsE > lapPointsJ && lapPointsE > lapPointsP){
        result.innerHTML = "O Vencedor é Edna!!"
        pointsE+= 200
        if(lapPointsJ == lapPointsP){
            result.innerHTML += '<br>' + "Segundo Lugar: Juca e Pedro | Empate"
            pointsJ+= 120
            pointsP+= 120
        }
        else if(lapPointsJ > lapPointsP){
            result.innerHTML += '<br>' + "Segundo Lugar: Juca"
            result.innerHTML += '<br>' + "Terceiro Lugar: Pedro"
            pointsJ+= 120
            pointsP+= 50
        }
        else{
            result.innerHTML += '<br>' + "Segundo Lugar: Pedro"
            result.innerHTML += '<br>' + "Terceiro Lugar: Juca"
            pointsP+= 120
            pointsJ+= 50
        }
    }
    else if(lapPointsP == lapPointsJ && lapPointsP == lapPointsE){
        result.innerHTML = "Os Três Empataram";
        pointsP+= 200
        pointsJ+= 200
        pointsE+= 200
    }
    else if(lapPointsP == lapPointsE){
        result.innerHTML = "Pedro e Edna Empataram!!";
        result.innerHTML += '<br>' + "Segundo Lugar: Juca | Empate"
        pointsP+= 200
        pointsJ+= 120
        pointsE+= 200
    }
    else if(lapPointsE == lapPointsJ){
        result.innerHTML = "Edna e Juca Empataram!!";
        result.innerHTML += '<br>' + "Segundo Lugar: Pedro | Empate"
        pointsP+= 120
        pointsJ+= 200
        pointsE+= 200
    }
    else if(lapPointsP == lapPointsJ){
        result.innerHTML = "Pedro e Juca Empataram!!";
        result.innerHTML += '<br>' + "Segundo Lugar: Edna | Empate"
        pointsP+= 200
        pointsJ+= 200
        pointsE+= 120
    }
    console.log(pointsP)
    console.log(pointsJ)
    console.log(pointsE)
}

function race(lapNumber){
    laps = lapNumber
    
    document.getElementById('pedro-choise').innerHTML = "Level " + pedroLv
    document.getElementById('juca-choise').innerHTML = "Level " + jucaLv
    document.getElementById('edna-choise').innerHTML = "Level " + ednaLv
    
    if(pedroCars.length < 1){
        pedroCars[0] = new createCar;
    }
    if(jucaCars.length < 1){
        jucaCars[0] = new createCar;
    }
    if(ednaCars.length < 1){
        ednaCars[0] = new createCar;
    }

    showCars(1)
    showCars(2)
    showCars(3)
    
    document.getElementById('start-race').disabled = false
    document.getElementById('start-race').style.opacity = 1
    document.getElementById('stop-race').disabled = false
    document.getElementById('stop-race').style.opacity = 1
    document.getElementById('add-pedro').disabled = false
    document.getElementById('add-pedro').style.opacity = 1
    document.getElementById('add-juca').disabled = false
    document.getElementById('add-juca').style.opacity = 1
    document.getElementById('add-edna').disabled = false
    document.getElementById('add-edna').style.opacity = 1
    document.querySelectorAll(".levelup").disabled = true
    document.querySelectorAll(".levelup").forEach( buttons => {
        buttons.style.opacity = 1
    })
}

document.getElementById('start-race').addEventListener('click', function(){
    raceResult(result)
})

document.getElementById('stop-race').addEventListener('click', function(){
    stopRace()
})

document.getElementById('add-pedro').addEventListener('click', function(){  
    if(pedroCars.length < 5){
        contP++
        pedroCars.push(new createCar()) 
        showCars(1)
    }
})

document.getElementById('add-juca').addEventListener('click', function(){
    if(jucaCars.length < 5){
        contJ++
        jucaCars.push(new createCar()) 
        showCars(2)
    }
})
document.getElementById('add-edna').addEventListener('click', function(){
    if(ednaCars.length < 5){
        contE++
        ednaCars.push(new createCar()) 
        showCars(3)
    }
})

document.querySelectorAll(".pedro-unit").forEach( choise => {
    choise.addEventListener('click', function(){
        document.getElementById('pedro-choise').innerHTML = "Raridade: " + pedroCars[choise.value].rarity
        document.getElementById('pedro-choise').innerHTML += '<br>' + "Level: " + pedroLv
        document.getElementById('pedro-choise').innerHTML += '<br>' + "Velocidade Min.: " + pedroCars[choise.value].vMin.toFixed(2) + "km/h"
        document.getElementById('pedro-choise').innerHTML += '<br>' + "Velocidade Max.: " + pedroCars[choise.value].vMax.toFixed(2) + "km/h"
        document.getElementById('pedro-choise').innerHTML += '<br>' + "Derrapagem: " + pedroCars[choise.value].der.toFixed(2) + "%"
        document.querySelectorAll(".pedro-unit").forEach( oldchoise => {
            oldchoise.classList.remove('selected')
        })
        pedroEsc = choise.value
        choise.classList.add('selected')   
    })
})

document.querySelectorAll(".juca-unit").forEach( choise => {
    choise.addEventListener('click', function(){
        document.getElementById('juca-choise').innerHTML = "Raridade: " + jucaCars[choise.value].rarity
        document.getElementById('juca-choise').innerHTML += '<br>' + "Level: " + jucaLv
        document.getElementById('juca-choise').innerHTML += '<br>' + "Velocidade Min.: " + jucaCars[choise.value].vMin.toFixed(2) + "km/h"
        document.getElementById('juca-choise').innerHTML += '<br>' + "Velocidade Max.: " + jucaCars[choise.value].vMax.toFixed(2) + "km/h"
        document.getElementById('juca-choise').innerHTML += '<br>' + "Derrapagem: " + jucaCars[choise.value].der.toFixed(2) + "%"
        document.querySelectorAll(".juca-unit").forEach( oldchoise => {
            oldchoise.classList.remove('selected')
        })
        jucaEsc = choise.value
        choise.classList.add('selected')   
    })
})

document.querySelectorAll(".edna-unit").forEach( choise => {
    choise.addEventListener('click', function(){
        document.getElementById('edna-choise').innerHTML = "Raridade: " + ednaCars[choise.value].rarity
        document.getElementById('edna-choise').innerHTML += '<br>' + "Level: " + ednaLv
        document.getElementById('edna-choise').innerHTML += '<br>' + "Velocidade Min.: " + ednaCars[choise.value].vMin.toFixed(2) + "km/h"
        document.getElementById('edna-choise').innerHTML += '<br>' + "Velocidade Max.: " + ednaCars[choise.value].vMax.toFixed(2) + "km/h"
        document.getElementById('edna-choise').innerHTML += '<br>' + "Derrapagem: " + ednaCars[choise.value].der.toFixed(2) + "%"
        document.querySelectorAll(".edna-unit").forEach( oldchoise => {
            oldchoise.classList.remove('selected')
        })
        ednaEsc = choise.value
        choise.classList.add('selected')   
    })
})


document.getElementById('btn-start-rap').addEventListener('click', function() {
    race(10)
})

document.getElementById('btn-start-pre').addEventListener('click', function() {
    race(70)
})

document.getElementById('btn-start-end').addEventListener('click', function() {
    race(160)
})

document.getElementById('btn-start-pers').addEventListener('click', function() {
    race(document.getElementById('pers').value)
})

document.querySelectorAll(".levelup").forEach( levels => {
    levels.addEventListener('click', function(){
        levelUp(levels.value)
    })
})