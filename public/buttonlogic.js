
document.getElementById('gsm').onclick = function setcat() {
    sex = "male";
};
document.getElementById('gsf').onclick = function setcat() {
    sex = "female";
};

function addAction() {
    const btns = document.getElementsByClassName("btn")
    console.log("meine btns: " + btns)


    for (let i = 0; i < btns.length; i++) {

        btns[i].addEventListener("click", function test() {
            toggleLogic(btns[i].name, btns[i].id);
            if (btns[i].name == "cat") {
                console.log("ich bin eine ccat")
                cat = btns[i].id;
                console.log(cat);
            }
        });
       
    }
}

function toggleLogic(btnname, btnid) {
    console.log("name: " + btnname);
    console.log("id  : " + btnid);

    if (btnname != "") {
        const rem = document.getElementsByName(btnname);

        for (let i = 0; i < rem.length; i++) {
            rem[i].classList.toggle("isChecked", false);
        }
    }

    if (btnid != "") {
        document.getElementById(btnid).classList.toggle("isChecked");
    }
}


/*
document.getElementById('gsf').onclick = function setcat() {
    sex = "female";
};*/