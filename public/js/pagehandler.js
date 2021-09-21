
let newcat = "";

function setNewCat(id) {
    newcat = id;
}

document.getElementById("sendRequestButton").addEventListener("click", async function sendrequest() {

    const fuel = document.getElementById("fuelInput").value;


    const mil = document.getElementById("newMilSlider").value;
    const occourenc = "";

    console.log("mil is" + mil)

    ceckCat();
    ceckMil(mil);

    if ((ceckFuel(fuel) && ceckCat()) && ceckMil(mil)) {

        document.getElementById("fuelInput").value = "";

        const data = { fuel, mil, newcat, occourenc };

        newLocalItem(data)
        let tryCount = 1;


        //     const response = await fetch("/sendrequest", packMyData(data))
        //     const resp = await response.json();

        webStorageHander(data);


        //     console.log(resp)
        showContentadder();
        location.reload();
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
function ceckMil(mil) {
    if (mil != 0) {
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
    webStorageHander();
    getList();
});

async function getList() {

    const data = await fetchData()

    loadcontent(data)
    addAction();
}

async function changecontent(cdto) {

    const data = await fetchData()

    let tryCount = 1;
    while (localStorage.getItem(('ownDrinkID' + tryCount))) {
        data.push(JSON.parse(localStorage.getItem(('ownDrinkID' + tryCount))));
        tryCount++;
    }
    tryCount = 1;

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
        let btn = document.createElement('button');

        const p = document.createElement('p');
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        svg.setAttribute('viewBox', '0 0 30 30');
        svg.setAttribute('class', 'svg');
        if (data[i].newcat == "newbeer") {
            path.setAttribute(
                'd',
                'M 5 25 Q 5 28 8 28 L 22 28 Q 25 28 25 25 L 5 25 L 5 7 A 1 1 0 0 1 7 6 A 1 1 0 0 1 11 7 A 1 1 0 0 1 14 5  \
                A 1 1 0 0 1 16 7 A 1 1 0 0 1 21 7 A 1 1 0 0 1 23 7 A 1 1 0 0 1 25 7 L 25 25 M 25 10 L 28 10 L 30 12 L 30 20 \
                L 28 22 L 25 22 M 9 10 L 9 23 L 11 23 L 11 10 L 9 10 M 14 10 L 14 23 L 16 23 L 16 10 L 14 10 M 19 10 L 19 23  \
                L 21 23 L 21 10 L 19 10 M 26 11 L 26 21 L 28 21 L 29 20 L 29 12 L 28 11 L 26 11'
            );
        }

        svg.append(path);
        btn.append(svg);

        btn.setAttribute("class", "btn");
        btn.setAttribute("name", "newContent");
        btn.setAttribute("id", data[i].fuel);

        p.textContent = (data[i].fuel + " - " + data[i].mil.toFixed(1) + "vol%");
        btn.append(p);

        document.getElementById("selectFuelIP").append(btn);

        setMIlFeedback(btn, data[i].mil.toFixed(1))
    }
}

function setMIlFeedback(btn, mil) {
    btn.style.backgroundImage = " linear-gradient(90deg, rgba(90, 77, 51, 0.507) " + (mil - 2) + "%, rgba(255, 255, 240, 1) " + (mil + 2) + "%)";
}

async function setmil(cdto) {

    const data = await fetchData()

    for (item of data) {
        if (item.fuel == cdto) {
            setMil(item.mil);
        }
    }
}

function webStorageHander() {

    let tryCount = 1
    let data = [];
    while (localStorage.getItem(('ownDrinkID' + tryCount))) {
        data.push(JSON.parse(localStorage.getItem(('ownDrinkID' + tryCount))));
        tryCount++;
    }

    for (let i = 0; i < data.length; i++) {
        data[i].mil = parseFloat(data[i].mil);
    }

    tryCount = 1;

    loadcontent(data);
}

function newLocalItem(data) {
    let tryCount = 1;
    while (localStorage.getItem(('ownDrinkID' + tryCount))) {
        tryCount++;
    }
    localStorage.setItem(("ownDrinkID" + tryCount), JSON.stringify(data))
}


let editable = true;
document.getElementById("clearDataButton").addEventListener("click", function showSubmitedData() {
    let tryCount = 1;
    let data = [];

    if (editable) {

        while (localStorage.getItem(('ownDrinkID' + tryCount))) {
            data.push(JSON.parse(localStorage.getItem(('ownDrinkID' + tryCount))));
            tryCount++;
        }
        tryCount = 1;

        for (let i = 0; i < data.length; i++) {
            let btn = document.createElement('button');

            btn.setAttribute("class", "btn");
            btn.setAttribute("name", "submited");
            btn.setAttribute("id", ("sub" + data[i].fuel));

            btn.textContent = (data[i].fuel);
            document.getElementById("editSubmitedIP").append(btn);
            btn.addEventListener("click", function removeme() {
                btn.remove();
                localStorage.removeItem(('ownDrinkID' + (i + 1)));
            });
            let tryCount = 1;
        }

        editable = false;
    }
    else {
        let rembtn = document.getElementsByName("submited");
        for (let i = 0; i < rembtn.length; i++) {
            rembtn[i].remove();
        }
        editable = true;
    }
});


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