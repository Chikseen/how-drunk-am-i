
function addAction() {
    const btns = document.getElementsByClassName("btn")

    for (let i = 0; i < btns.length; i++) {

        btns[i].addEventListener("click", function test() {
            toggleLogic(btns[i].name, btns[i].id);

            if (btns[i].name == "cat") {
                setNewCat(btns[i].id) 
                changecontent(btns[i].id);
            }
            else if (btns[i].name == "onewaybtn") {
                btns[i].classList.toggle("isChecked", false);
            }
            else if (btns[i].name == "getsex") {
                setSex(btns[i].id)
            }
            else if (btns[i].name == "volume") {
                setVolume(btns[i].id)
            }
            else if (btns[i].name == "newContent") {
                setDrink(btns[i].id)
                setmil(btns[i].id);
            }
        });  
    }
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
}