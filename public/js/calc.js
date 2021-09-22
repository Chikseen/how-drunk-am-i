
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
    //DIRTY FIX BUT WHO CARES
    //It isent dirty if it is working
    const data = currentData;

    console.log("is called")

    console.log(data)
    console.log(data.length)
    for (let i = 0; i < data.length; i++) {
        console.log("compare with")+
        console.log(data[i].fuel)
        console.log(id)
        if (data[i].fuel == id) {
            console.log(data[i].mil)
            currentPercentOfDrink = (data[i].mil);
        }
    }
}
function setVolume(id) {
    document.getElementById('customVolumeSliderOut').style.background = "rgb(255, 255, 240)";
    volume = id;
}


document.getElementById("clacBtn").addEventListener("click", function calcResult() {

    finalage = parseFloat(document.getElementById('ageSliderOut').value) * parseFloat(heigthMultiplier);
    finalweight = parseFloat(document.getElementById('weightSliderOut').value);
    timePassed = parseFloat(document.getElementById('timeSliderOut').value);

    console.log("heigth: " + finalage);
    console.log("sex: " + sex);
    console.log("weight: " + finalweight);
    console.log("fuel: " + drink)
    console.log("mil: " + finalGrammOfAlc)
    console.log("grammofalc: " + finalGrammOfAlc)
    console.log("volume: " + currentVolume)
    console.log("time: " + timePassed)

    checkVolume()
    checkAdded()
    checkFuel()

    if ((checkSex() && checkFuel()) && checkVolume()) {

        console.log("-")
        console.log("finalGrammOfAlc: " + finalGrammOfAlc)
        console.log("finalweight: " + finalweight)
        console.log("r: " + reduction)
        console.log("isAdded: " + isAdded)
        console.log("time: " + timePassed)

        result = ((finalGrammOfAlc / (finalweight * reduction) * 0.83) - (0.15 * timePassed));
        console.log("result: " + result)

        if (result <= 0) {
            result = 0;
            document.getElementById("result").textContent = "Your peak value after " + timePassed + "h is " + result.toFixed(1) + "%°";
            document.getElementById("resultinfo").textContent = "you are allrady clean";
        }
        else {
            document.getElementById("result").textContent = "Your peak value after " + timePassed + "h is " + result.toFixed(1) + "%";
            while (parseFloat((finalGrammOfAlc / (finalweight * reduction) * 0.83) - (0.15 * timePassed)) > 0) {
                timePassed = (timePassed + 0.1);
            }
            document.getElementById("resultinfo").textContent = "You will be sober after " + timePassed.toFixed(1) + " hours";
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


let isChanged = false;
document.getElementById("customVolumeSliderOut").addEventListener("change", function getVolume() {
    getvolume()
});
document.getElementById("customVolumeSlider").addEventListener("change", function getVolume() {
    getvolume()
});
function getvolume() {
    console.log("is changed")
    volume = "";
    currentVolume = document.getElementById('customVolumeSliderOut').value;

    document.getElementById('customVolumeSliderOut').style.background = "rgb(93, 155, 85)";

    toggleLogic("volume", "");

    isChanged = true;
}

function checkVolume() {

    switch (volume) {
        case "1cl":
            currentVolume = 4;
            isChanged = true;
            break;

        case "4cl":
            currentVolume = 16;
            isChanged = true;
            break;

        case "8cl":
            currentVolume = 32;
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
        console.log("!___!")

    const btn = document.createElement('button');
    const p = document.createElement('p');
        
        btn.setAttribute("class", "btn");
        btn.setAttribute("name", "addedContent");
        btn.setAttribute("id", ("added" + drink));

        p.textContent = drink + " - " + currentVolume;
        btn.append(p);

        setMIlFeedback(btn, currentPercentOfDrink);

        document.getElementById("addedFuelIP").append(btn);

        console.log("currentVolume: " + currentVolume)
        console.log("currentPercentOfDrink: " + currentPercentOfDrink)
        console.log("ml: " + ((currentVolume * currentPercentOfDrink) / 100))
        console.log("g: " + ((((currentVolume * currentPercentOfDrink) / 100) * 0.8)))


        const precentOfThis = (((currentVolume * currentPercentOfDrink) / 100) * 0.8);
        finalGrammOfAlc = finalGrammOfAlc + precentOfThis;
        console.log("finalGrammOfAlc is")
        console.log(finalGrammOfAlc)

        isAdded++;

        btn.addEventListener("click", function removeme() {
            this.remove();
            isAdded--;

            finalGrammOfAlc = finalGrammOfAlc - precentOfThis;
            console.log("finalGrammOfAlc is");
            console.log(precentOfThis);
            console.log(finalGrammOfAlc);
        });
    }
});

let heigthChangeTo = 0;
let heigthMultiplier = 1;
document.getElementById("heightChangeUnit").addEventListener("click", function setmultiplierHeigth() {
    const heigthlider = document.getElementById('ageslider')
    const heigthOut = document.getElementById('ageSliderOut')
    const p = document.getElementById('heightChangeUnit')

    switch (heigthChangeTo) {
        case 0:
            heigthMultiplier = 30.48;

            p.textContent = "in inch"

            heigthlider.setAttribute("max", "10")
            heigthlider.setAttribute("step", "0.1")
            heigthlider.setAttribute("min", "0.1")

            heigthOut.setAttribute("max", "10")
            heigthOut.setAttribute("step", "0.1")
            heigthOut.setAttribute("min", "0.1")

            heigthOut.value = (heigthOut.value * 0.0328084).toFixed(1)
            heigthlider.value = heigthOut.value


            heigthChangeTo++;
            break;
        case 1:
            heigthMultiplier = 1;

            p.textContent = "in cm"

            heigthlider.setAttribute("max", "300")
            heigthlider.setAttribute("step", "1")
            heigthlider.setAttribute("min", "1")

            heigthOut.setAttribute("max", "300")
            heigthOut.setAttribute("step", "1")
            heigthOut.setAttribute("min", "1")

            heigthOut.value = (heigthOut.value * 30.48).toFixed(0)
            heigthlider.value = heigthOut.value

            heigthChangeTo = 0
            break;
    }
});


let weigthChangeTo = 0;
let weigthMultiplier = 1;
document.getElementById("weightChangeUnit").addEventListener("click", function setmultiplierWeigth() {
    console.log("hi")
    const weigthlider = document.getElementById('weightslider')
    const weigthOut = document.getElementById('weightSliderOut')
    const p = document.getElementById('weightChangeUnit')

    switch (weigthChangeTo) {
        case 0:
            weigthMultiplier = 2.20462;

            p.textContent = "in lbs"

            weigthlider.setAttribute("max", "440")
            weigthlider.setAttribute("min", "1")

            weigthOut.setAttribute("max", "440")
            weigthOut.setAttribute("min", "1")

            weigthOut.value = (weigthOut.value * 2.20462).toFixed(0)
            weigthlider.value = weigthOut.value


            weigthChangeTo++;
            break;
        case 1:
            heigthMultiplier = 1;

            p.textContent = "in kg"

            weigthlider.setAttribute("max", "200")
            weigthlider.setAttribute("min", "1")

            weigthOut.setAttribute("max", "200")
            weigthOut.setAttribute("min", "1")

            weigthOut.value = (weigthOut.value * 0.453592).toFixed(0)
            weigthlider.value = weigthOut.value

            weigthChangeTo = 0;
            break;
    }
});
