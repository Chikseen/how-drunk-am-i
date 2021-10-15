
function addAction(btn, name, id) {
    if (btn == undefined) {
        const btns = document.getElementsByClassName("btn")

        for (let i = 0; i < btns.length; i++) {
            setLogic(btns[i], btns[i].name, btns[i].id)
        }
    }
    else {
        setLogic(btn, name, id)
    }
}

function setLogic(btn, name, id) {
    btn.addEventListener("click", function test() {
        toggleLogic(name, id);

        if (name == "cat") {
            setNewCat(id)
            changecontent(id);
        }
        else if (name == "onewaybtn") {
            btn.classList.toggle("isChecked", false);
        }
        else if (name == "getsex") {
            setSex(id)
        }
        else if (name == "volume") {
            setVolume(id)
        }
        else if (name == "newContent") {
            setDrink(id)
            setMil(id);
        }
        else if (name == "setNewCat") {
            setNewCat(id)
        }
    });
}

function toggleLogic(btnname, btnid) {

    if (btnname != "") {
        const rem = document.getElementsByName(btnname);
        for (let i = 0; i < rem.length; i++) {
            rem[i].classList.toggle("isChecked", false);
        }
    }

    if (btnid != "") {
        document.getElementById(btnid).classList.toggle("isChecked");
    }
    if (btnid == "volume") {
        document.getElementById(btnid).classList.toggle("isCheckedVolume");
    }
}

let vueclick = 0;
document.getElementById("titel").addEventListener("click", function vuetest() {
    console.log("titel is clicked")
    vueclick++;
    if (vueclick > 4) {
        console.log("change")
        window.location.href = "../VUETEST/vindex.html"
    }
});