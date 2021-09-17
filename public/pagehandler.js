
let newcat = "";

function setNewCat(id) {
    newcat = id;
}

document.getElementById("sendRequestButton").addEventListener("click", async function sendrequest() {

    const fuel = document.getElementById("fuelInput").value;
    

    const mil = document.getElementById("newMilSliderOut").value;
    const occourenc = "";

    ceckCat();
    ceckMil();

    if ((ceckFuel(fuel) && ceckCat()) && ceckMil()) {

        document.getElementById("fuelInput").value = "";

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
        let el = document.getElementById("inputCombinedNewFuel");
        resetAnimation(el)
        el.style.animation = "error 2.5s ease-in-out alternate";
        return false;
    }

}
function ceckCat() {
    if (newcat != "") {
        return true;
    }
    else {
        let el = document.getElementById("inputCombinedNewCat");
        resetAnimation(el)
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



document.getElementById("customContentButton").addEventListener("click", function sendrequest() {
    showContentadder()
});

function showContentadder() {
    document.getElementById("newContent").classList.toggle("show");
}

window.addEventListener('load', () => {
    getList();
});

async function getList() {

    const data = await fetchData()

    loadcontent(data)
    addAction();
}

async function changecontent(cdto) {

    const data = await fetchData()

    const contentManager = document.getElementsByName("newContent");

    for (let i = 0; i < contentManager.length; i++) {
        contentManager[i].style.display = 'none';
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].newcat == ("new" + cdto)) {
            document.getElementById(data[i].fuel).style.display = "block";
        }
    }
}

function loadcontent(data) {

    for (let i = 0; i < data.length; i++) {
        let btn = document.createElement('button');

        btn.setAttribute("class", "btn");
        btn.setAttribute("name", "newContent");
        btn.setAttribute("id", data[i].fuel);

        btn.textContent = (data[i].fuel + " - " + data[i].mil.toFixed(1) + "vol%");
        document.getElementById("selectFuelIP").append(btn);
    }
}

async function setmil(cdto) {

    const data = await fetchData()

    for (item of data) {
        if (item.fuel == cdto) {
            setMil(item.mil);
        }
    }
}

let callData;
async function fetchData() {

    if (callData == undefined) {
        const response = await fetch("/getList")
        const data = await response.json();
        callData = data
    }
    return callData;
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