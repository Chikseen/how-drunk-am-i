let sex;
let drink;

function addAction() {
    const btns = document.getElementsByClassName("btn")
    console.log("meine btns: " + btns)


    for (let i = 0; i < btns.length; i++) {

        btns[i].addEventListener("click", function test() {
            toggleLogic(btns[i].name, btns[i].id);
            if (btns[i].name == "cat") {
                console.log("ich bin eine cat")
                cat = btns[i].id;
                newcat = btns[i].id;
                console.log(cat);
                console.log("give: " + btns[i].id);
                changecontent(btns[i].id);
            }
            if (btns[i].name == "onewaybtn") {
                console.log("ich bin eine onewaybtn")
                btns[i].classList.toggle("isChecked", false);
            }
            if (btns[i].name == "getsex") {
                console.log("ich bin eine getsex")
                console.log(btns[i].id)
                sex = btns[i].id;
            }
            if (btns[i].name == "newContent") {
                console.log("ich bin eine newcontent")
                console.log(btns[i].id)
                drink = btns[i].id;
                setmil(btns[i].id);
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