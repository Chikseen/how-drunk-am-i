

let age = 0;
let weight = 0;
let sex;
let drink = "";
let finalweight = 0;
let finalage = 0;
let currentPercentOfDrink = 0;
let finalGrammOfAlc = 0;
let result = 0;
let volume = 0;
let currentVolume = 0;
let reduction = 0;
let isAdded = 0;
let timePassed = 0;

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
    document.getElementById('customVolumeSliderOut').style.background = "rgb(255, 255, 240)";
    volume = id;
}


document.getElementById("clacBtn").addEventListener("click", function calcResult() {

    age = parseFloat(document.getElementById('ageslider').value);
    weight = parseFloat(document.getElementById('weightslider').value);
    timePassed = parseFloat(document.getElementById('timeSlider').value);


    finalweight = parseInt(weight);
    finalage = parseInt(age);

    console.log("sex: " + sex);
    console.log("weight: " + weight);
    console.log("fuel: " + drink)
    console.log("mil: " + finalGrammOfAlc)
    console.log("grammofalc: " + finalGrammOfAlc)
    console.log("volume: " + currentVolume)
    console.log("time: " + timePassed)

    checkVolume()
    checkAdded()
    checkFuel()

    if ((checkSex() && checkFuel()) && checkVolume()) {

        console.log("finalGrammOfAlc: " + finalGrammOfAlc)
        console.log("finalweight: " + finalweight)
        console.log("r: " + reduction)
        console.log("isAdded: " + isAdded)

        result = ((finalGrammOfAlc / (finalweight * reduction) * 0.83) - (0.15 * timePassed));
        console.log("result: " + result)

        if (result <= 0) {
            result = 0;
            document.getElementById("result").textContent = "Your peak value after " + timePassed + "h is " + result.toFixed(1) + "%";
        }
        else {
            document.getElementById("result").textContent = "Your peak value after " + timePassed + "h is " + result.toFixed(1) + "%";
            while (parseFloat((finalGrammOfAlc / (finalweight * reduction) * 0.83) - (0.15 * timePassed)) > 0) {
                timePassed = (timePassed + 0.1);
            }
            document.getElementById("resultinfo").textContent = "You will be sober after" + timePassed.toFixed(1) + " hours";
        }
        document.getElementById("resultIP").style.display = "flex"
    }
});

function checkSex() {

    if ((sex == "gsm") || (sex == "gsf")) {
        switch (sex) {
            case "gsm":
                console.log("reduction man")
                reduction = 0.31608 - 0.004821 * finalweight + 0.004432 * finalage;
                break;
            case "gsf":
                console.log("reduction woman")
                reduction = 0.31223 - 0.006446 * finalweight + 0.004466 * finalage;
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

let isChanged = false
document.getElementById('customVolumeSlider').addEventListener("change", function getVolume() {

    volume = "";
    currentVolume = document.getElementById('customVolumeSlider').value;

    document.getElementById('customVolumeSliderOut').style.background = "rgb(93, 155, 85)";

    toggleLogic("volume", "");

    isChanged = true;
});
function checkVolume() {

    switch (volume) {
        case "1oz":
            currentVolume = 1;
            isChanged = true;
            break;

        case "5oz":
            currentVolume = 5;
            isChanged = true;
            break;

        case "10oz":
            currentVolume = 10;
            isChanged = true;
            break;

        case "100ml":
            currentVolume = 100;
            isChanged = true;
            break;

        case "250ml":
            currentVolume = 250;
            isChanged = true;
            break;

        case "500ml":
            currentVolume = 500;
            isChanged = true;
            break;

    }


    console.log("vol is: " + currentVolume);

    if (isChanged) {
        return true;
    }
    else {
        return false
    }
}


function checkFuel() {

    if (drink != "") {
        return true;
    }
    else {
        const sfip = document.getElementById("selectFuelIP")
        resetAnimation(sfip)
        sfip.style.animation = "error 2.5s ease-in-out alternate";
        return false;
    }
}

function checkAdded() {

    if (isAdded > 0) {
        return true;
    }
    else {
        const afip = document.getElementById("addedFuelIP")
        resetAnimation(afip)
        afip.style.animation = "error 2.5s ease-in-out alternate";
        return false;
    }
}



function resetAnimation(el) {
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = null;
}

document.getElementById("addBtn").addEventListener("click", function addFuel() {

    if (checkVolume() == false) {
        const vip = document.getElementById("inputCombinedVolume")
        resetAnimation(vip)
        vip.style.animation = "error 2.5s ease-in-out alternate";
    }

    console.log("current drind " + drink)
    checkFuel();

    if (checkFuel() && checkVolume()) {

        let btn = document.createElement('button');

        btn.setAttribute("class", "btn");
        btn.setAttribute("name", "addedContent");
        btn.setAttribute("id", ("added" + drink));
        btn.textContent = drink + " - " + currentVolume;

        document.getElementById("addedFuelIP").append(btn);

        console.log("currentVolume: " + currentVolume)
        console.log("currentPercentOfDrink: " + currentPercentOfDrink)
        console.log("ml: " + ((currentVolume * currentPercentOfDrink) / 100))
        console.log("g: " + ((((currentVolume * currentPercentOfDrink) / 100) * 0.8)))


        const precentOfThis = (((currentVolume * currentPercentOfDrink) / 100) * 0.8);
        finalGrammOfAlc = finalGrammOfAlc + ((((currentVolume * currentPercentOfDrink) / 100) * 0.8));
        console.log("finalGrammOfAlc is")
        console.log(finalGrammOfAlc)

        isAdded++;

        btn.addEventListener("click", function removeme() {
            btn.remove();
            isAdded--;

            finalGrammOfAlc = finalGrammOfAlc - precentOfThis;
            console.log("finalGrammOfAlc is");
            console.log(precentOfThis);
            console.log(finalGrammOfAlc);
        });
    }
});