
let newcat = "";
let currentData = [];

function setNewCat(id) {
    console.log("hello")
    newcat = id;
}
function showContentadder() {
    document.getElementById("newContent").classList.toggle("show");
}

document.getElementById("clearDataButton").addEventListener("click", function rembtn() {
    document.getElementById("editSubmitedIP").classList.toggle("show")
});
document.getElementById("customContentButton").addEventListener("click", function sendrequest() {
    showContentadder()
});
document.getElementById("closeNewContentButton").addEventListener("click", function sendrequest() {
    showContentadder()
});
window.addEventListener('load', () => {
    getStorageHander();
    getList();
});

document.getElementById("sendRequestButton").addEventListener("click", async function sendrequest() {

    const fuel = document.getElementById("fuelInput").value;
    const mil = parseInt(document.getElementById("newMilSlider").value);
    const occourenc = "";

    console.log("mil is" + mil)

    ceckCat();
    ceckMil(mil);

    console.log("mil is " + mil)
    console.log("fuell is " + fuel)
    console.log("newcat is " + newcat)

    if ((ceckFuel(fuel) && ceckCat()) && ceckMil(mil)) {


        document.getElementById("fuelInput").value = "";
        const data = { fuel, mil, newcat, occourenc };
        if (localStorage.getItem(fuel) === null) {
            newLocalItem(data);
            let trans = [data]
            loadcontent(trans);
            showContentadder();
            const response = await fetch("/sendrequest", packMyData(data))
            const resp = await response.json();
            console.log(resp)

        }
        else {
            console.log("das object exestiert")
        }
    }
});

function ceckFuel(fuel) {
    if (fuel != "") {
        return true;
    }
    else {
        let el = document.getElementById("inputCombinedNewFuel");
        resetAnimation(el)
        el.scrollIntoView();
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
        el.scrollIntoView();
        el.style.animation = "error 2.5s ease-in-out alternate";
        return false;
    }
}
function ceckMil(mil) {
    if (mil != 0) {
        return true;
    }
    else {
        console.log("select a mil")
        let el = document.getElementById("inputCombinedNewMil");
        resetAnimation(document.getElementById("inputCombinedNewMil"))
        el.scrollIntoView();
        el.style.animation = "error 2.5s ease-in-out alternate";
        return false;
    }
}

async function getList() {
    const data = await fetchData()

    loadcontent(data)
    addAction();
}

async function changecontent(cdto) {
    const data = await fetchData()

    for (var i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        data.push(JSON.parse(localStorage.getItem(key)))
    }

    const contentManager = document.getElementsByName("newContent");

    for (let i = 0; i < contentManager.length; i++) {
        contentManager[i].style.display = 'none';
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].newcat == ("new" + cdto)) {
            document.getElementById(data[i].fuel).style.display = "flex";
        }
    }
}

function loadcontent(data) {

    for (let i = 0; i < data.length; i++) {
        console.log("isclaled")
        let btn = document.createElement('button');

        const p = document.createElement('p');

        setIcon(data[i].newcat, btn);

        btn.setAttribute("class", "btn");
        btn.setAttribute("name", "newContent");
        btn.setAttribute("id", data[i].fuel);

        console.log("data[i]mil: " + parseFloat(data[i].mil));

        p.textContent = (data[i].fuel + " - " + parseFloat(data[i].mil).toFixed(1) + "vol%");
        btn.append(p);

        document.getElementById("selectFuelIP").append(btn);

        setMIlFeedback(btn, parseFloat(data[i].mil).toFixed(1))

        currentData.push(data[i])

        if (btn.getAttribute('listener') !== 'true') {
            addAction(btn, "newContent", data[i].fuel)
        }
    }
}

function setMIlFeedback(btn, mil) {
    btn.style.backgroundImage = " linear-gradient(90deg, rgba(90, 77, 51, 0.507) " + (mil - 2) + "%, rgba(255, 255, 240, 1) " + (mil + 2) + "%)";
}

function setIcon(data, btn) {
    const obj = document.createElement("object");
    obj.setAttribute("class", "catIcon");
    obj.setAttribute("type", "image/svg+xml");
    obj.setAttribute("width", "25%");
    obj.setAttribute("height", "100%");
    if (data == "newbeer") {
        obj.setAttribute("data", "/icon/beer.svg");
    }
    else if (data == "newwine") {
        obj.setAttribute("data", "/icon/wine.svg");
    }
    else if (data == "newcocktail") {
        obj.setAttribute("data", "/icon/cocktail.svg");
    }
    else if (data == "newspirit") {
        obj.setAttribute("data", "/icon/spirit.svg");
    }
    btn.append(obj);
}


function getStorageHander() {

    let data = [];
    for (var i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        data.push(JSON.parse(localStorage.getItem(key)))

        console.log(data[i])
        const btn = document.createElement("button");

        btn.setAttribute("class", "btn");
        btn.setAttribute("name", "submited");
        btn.setAttribute("id", data[i].fuel);
        setIcon(data[i].newcat, btn)

        btn.textContent = (" " + data[i].fuel);

        const object = document.createElement("object")

        object.setAttribute("class", "removeIcon")
        object.setAttribute("type", "image/svg+xml")
        object.setAttribute("data", "/icon/remove.svg")
        object.setAttribute("height", "150%")

        btn.append(object);

        btn.addEventListener("click", function removeme() {
            console.log("data[i] " + (" " + this.id))
            localStorage.removeItem(this.id);
            document.getElementById(this.id).remove()
            btn.remove();
        });
        document.getElementById("editSubmitedIP").append(btn);
    }
    loadcontent(data);

    let btn = document.createElement('button');
}

function newLocalItem(data) {
    localStorage.setItem(data.fuel, JSON.stringify(data))
}

let helpbtn = document.getElementsByName("helpButton");
for (let i = 0; i < helpbtn.length; i++) {
    helpbtn[i].addEventListener("click", function showhelp() {

        const help = document.getElementsByClassName("infotext");

        for (let i = 0; i < help.length; i++) {
            help[i].classList.toggle("show");
        }
    });
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