
let fueldata;
let cat;
let sex = "na";



document.getElementById("sendReqBtn").onclick = async function sendrequest() {
    console.log("hi")

    const fuel = document.getElementById("newFuel").value;
    document.getElementById("newFuel").value = "";
    const mil = document.getElementById("milSlider").value;
    const occourenc = "";

    const data = { fuel, mil, cat, occourenc };

    const response = await fetch("/sendrequest", packMyData(data))
    const resp = await response.json();

    console.log(resp)

    showContentadder();
}

document.getElementById("clacBtn").onclick = function calc() {

    let age = 18;
    let weight = 60;

    age = document.getElementById('ageslider').value;
    weight = document.getElementById('weightslider').value;
    let mil = document.getElementById('fuel').value;

    console.log("sex: " + sex);
    console.log("age: " + age);
    console.log("weight: " + weight);
    console.log("fuel: ")
    console.log(mil);
}

function showContentadder() {
    document.getElementById("newContent").classList.toggle("show");
}

window.addEventListener('load', () => {
    getList();
});

async function getList() {

    const response = await fetch("/getList");
    const data = await response.json();
    const list = document.getElementById("fuelDL");

    console.log("Fetched Data")
    console.log(data)

    loadcontent(data)

    fueldata = data;
    //Call Function in buttonlogic.js
    addAction();
}

function loadcontent(data) {

    for (item of data) {
        let btn = document.createElement('button');

        btn.setAttribute("class", "btn");
        btn.setAttribute("name", "newContent");
        btn.setAttribute("id", item.fuel);
        
        
        btn.textContent = item.fuel
        console.log("add btn: " + item.fuel);
        document.getElementById("newfuelbtn").append(btn);
    }
}


function packMyData(data) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    };
    return options;
}