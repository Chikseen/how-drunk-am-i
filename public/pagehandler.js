
let fueldata;
let cat = "";
let sex = "na";

document.getElementById("sendReqBtn").addEventListener("click", async function sendrequest() {
    console.log("hi")

    const fuel = document.getElementById("fuelInput").value;
    document.getElementById("newMilSlider").value = "";
    const mil = document.getElementById("newMilSlider").value;
    const occourenc = "";

    const data = { fuel, mil, cat, occourenc };

    const response = await fetch("/sendrequest", packMyData(data))
    const resp = await response.json();

    console.log(resp)

    showContentadder();
});

document.getElementById("newContentBtn").addEventListener("click", function sendrequest() {
    showContentadder()
});

function showContentadder() {
    document.getElementById("newContent").classList.toggle("show");
    document.querySelector(".maincontent").classList.toggle("show");
}

window.addEventListener('load', () => {
    getList();
});

async function getList() {
    console.log("List Is Loading")

    const response = await fetch("/getList")
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