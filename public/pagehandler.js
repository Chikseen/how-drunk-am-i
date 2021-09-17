
let cat = "";
let newcat = "";

let mil;

document.getElementById("sendReqBtn").addEventListener("click", async function sendrequest() {

    const fuel = document.getElementById("fuelInput").value;
    document.getElementById("fuelInput").value = "";
    const mil = document.getElementById("newMilSliderOut").value;
    const occourenc = "";

    ceckCat();
    ceckMil();

    if ((ceckFuel(fuel) && ceckCat()) && ceckMil()) {

        const data = { fuel, mil, newcat, occourenc };

        const response = await fetch("/sendrequest", packMyData(data))
        const resp = await response.json();

        console.log(resp)
        showContentadder();
    }
    else {
        
    }
    
});

function ceckFuel(fuel) {
    if (fuel != "") {
        return true;
    }
    else {
        console.log("select a fuel name")
        let el = document.getElementById("inputCombinedNewFuel");
        resetAnimation(document.getElementById("inputCombinedNewFuel"))
        el.style.animation = "error 2.5s ease-in-out alternate";
        return false;
    }

}
function ceckCat() {
    if (newcat != "") {
        return true;
    }
    else {
        console.log("select a cat")
        let el = document.getElementById("inputCombinedNewCat");
        resetAnimation(document.getElementById("inputCombinedNewCat"))
        el.style.animation = "error 2.5s ease-in-out alternate";
        return false;
    }
}
function ceckMil() {
    if (newcat != 50) {
        return true;
    }
    else {
        console.log("select a mil")
        let el = document.getElementById("inputCombinedNewMil");
        resetAnimation(document.getElementById("inputCombinedNewMil"))
        el.style.animation = "error 2.5s ease-in-out alternate";
        return false;
    }
}

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

async function changecontent(cdto) {

    const response = await fetch("/getList")
    const data = await response.json();


    console.log("Change to: " + cdto)
    console.log(cdto.length)
    const newcon = document.getElementsByName("newContent");
    console.log(newcon)

    for (let i = 0; i < newcon.length; i++) {
        newcon[i].style.display = 'none';
    }

    for (item of data) {
        console.log(item.newcat + " - " + ("new" + cdto))
        if (item.newcat == ("new" + cdto)) {
            console.log("is gleich anzeigen")
            document.getElementById(item.fuel).style.display = "block";
        }
    }

    console.log("new content");
    console.log(newcon);
}

function loadcontent(data) {

    for (item of data) {
        let btn = document.createElement('button');

        btn.setAttribute("class", "btn");
        btn.setAttribute("name", "newContent");
        btn.setAttribute("id", item.fuel);


        btn.textContent = item.fuel
        console.log("add btn: " + item.fuel);
        document.getElementById("selectFuelIP").append(btn);

    }
}

async function setmil(cdto) {

    console.log("setmil is called")

    const response = await fetch("/getList")
    const data = await response.json();


    for (item of data) {
        console.log(item.fuel + " - " + cdto)
        if (item.fuel == cdto) {

            mil = item.mil
            console.log("mil is now" + mil)
        }
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