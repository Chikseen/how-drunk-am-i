

let age;
let weight;

document.getElementById("clacBtn").addEventListener("click", function sendrequest() {

    age = document.getElementById('ageslider').value;
    weight = document.getElementById('weightslider').value;

    let finalgender;
    let finalweight;
    let finalage;
    let finalalcmg;
    let result;

    console.log("sex: " + sex);
    console.log("age: " + age);
    console.log("weight: " + weight);
    console.log("fuel: " + drink)
    console.log("mil: " + mil)


    switch (sex) {
        case "gsm":
            finalgender = 0.68;
            break;
        case "gsf":
            finalgender = 0.55;
            break;
        default: 0.60;
            break;
    }
    finalweight = parseInt(weight);
    finalage = parseInt(age);
    finalalcmg = parseInt(mil);

    result = ((finalalcmg * 0.8) / (finalweight * finalgender));

    console.log("DEIN % BETRÄGT: " + ((finalalcmg * 0.8) / (finalweight * finalgender)))

    document.getElementById("resultIP").style.display = "flex"
    document.getElementById("result").textContent = result;
});