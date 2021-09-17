

let age;
let weight;
let sex
let drink;
let finalgender;
let finalweight;
let finalage;
let currentPercentOfDrink;
let finalPercentOfDrink = 0;
let result;
let volume;
let currentVolume;

function setSex(id) {
    sex = id;
}
function setDrink(id) {
    drink = id;
}
function setMil(id) {
    currentPercentOfDrink = parseInt(id);
}
function setVolume(id) {
    volume = id;
}


document.getElementById("clacBtn").addEventListener("click", function sendrequest() {

    age = document.getElementById('ageslider').value;
    weight = document.getElementById('weightslider').value;


    finalweight = parseInt(weight);
    finalage = parseInt(age);

    console.log("sex: " + sex);
    console.log("weight: " + weight);
    console.log("fuel: " + drink)
    console.log("mil: " + finalPercentOfDrink)
    console.log("volume: " + volume)

    if ((checkSex() && checkFuel()) && checkVolume()) {
        result = ((finalPercentOfDrink * 0.8) / (finalweight * finalgender));

        document.getElementById("resultIP").style.display = "flex"
        document.getElementById("result").textContent = result;
    }
});

function checkSex() {

    if ((sex == "gsm") || (sex == "gsf")) {
        switch (sex) {
            case "gsm":
                finalgender = 0.68;
                break;
            case "gsf":
                finalgender = 0.55;
                break;
        }
        return true;
    }
    else {
        const sip = document.getElementById("sexIP")
        resetAnimation(sip)
        sip.style.animation = "error 2.5s ease-in-out alternate";
        return false;
    }
}

function checkVolume() {

    console.log("current v: " + volume)
    switch (volume) {
        case "1oz":
            currentVolume = 1;
            return true;

        case "5oz":
            currentVolume = 5;
            return true;

        case "10oz":
            currentVolume = 10;
            return true;

        case "100ml":
            currentVolume = 100;
            return true;

        case "250ml":
            currentVolume = 250;
            return true;

        case "500ml":
            currentVolume = 500;
            return true;

        default:
            const vip = document.getElementById("inputCombinedVolume")
            resetAnimation(vip)
            vip.style.animation = "error 2.5s ease-in-out alternate";
            return false;
    }
}

function checkFuel() {

    if (currentPercentOfDrink > 0) {
        return true;
    }
    else {
        const sfip = document.getElementById("selectFuelIP")
        resetAnimation(sfip)
        sfip.style.animation = "error 2.5s ease-in-out alternate";
        return false;
    }
}

function resetAnimation(el) {
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = null;
}

document.getElementById("addBtn").addEventListener("click", function addFuel() {

    checkVolume();
    checkFuel();

    let btn = document.createElement('button');

    btn.setAttribute("class", "btn");
    btn.setAttribute("name", "addedContent");
    btn.setAttribute("id", ("added" + drink));
    btn.textContent = drink + " - " + volume;

    document.getElementById("addedFuelIP").append(btn);

    finalPercentOfDrink = finalPercentOfDrink + (currentVolume * (currentPercentOfDrink / 100));
    console.log("finalPercentOfDrink is")
    console.log(finalPercentOfDrink)

    const precentOfThis = currentPercentOfDrink;
    btn.addEventListener("click", function removeme() {
        btn.remove();

        finalPercentOfDrink = finalPercentOfDrink - precentOfThis;
        console.log("finalPercentOfDrink is");
        console.log(precentOfThis);
        console.log(finalPercentOfDrink);
    });
});