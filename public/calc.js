

let age;
let weight;
let finalgender;
let finalweight;
let finalage;
let finalalcmg;
let result;

document.getElementById("clacBtn").addEventListener("click", function sendrequest() {

    age = document.getElementById('ageslider').value;
    weight = document.getElementById('weightslider').value;


    finalweight = parseInt(weight);
    finalage = parseInt(age);
    finalalcmg = parseInt(mil);

    console.log("sex: " + sex);
    console.log("age: " + age);
    console.log("weight: " + weight);
    console.log("fuel: " + drink)
    console.log("mil: " + mil)

    checkFuel()

    if (checkSex() && checkFuel()) {
        console.log("both is checkt")

        result = ((finalalcmg * 0.8) / (finalweight * finalgender));

        console.log("DEIN % BETRÄGT: " + ((finalalcmg * 0.8) / (finalweight * finalgender)))

        document.getElementById("resultIP").style.display = "flex"
        document.getElementById("result").textContent = result;
    }
    else {
        console.log("sth is missing")
    }

});

function checkSex() {

    if ((sex == "gsm") || (sex == "gsf")) {
        
    console.log("sex is there")
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
        console.log("sex is missig")
        resetAnimation(sip)
        sip.style.animation = "error 2.5s ease-in-out alternate";
        return false;
    }
}

function checkFuel() {

    if (finalalcmg > 0) {
        console.log("es gibt ein mil")   
        return true;
    }
    else {
        const sfip = document.getElementById("selectFuelIP")
        console.log("es gibt kein")
        resetAnimation(sfip )
        sfip .style.animation = "error 2.5s ease-in-out alternate";
        return false;
    }
}

function resetAnimation(el) {
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = null; 
  }