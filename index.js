const { request, response } = require("express");
const express = require("express");
const app = express();

const Datastore = require("nedb");

app.listen(3000, () => console.log("Connecet with Port:3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const proxyDB = new Datastore("database/proxyDB.db");
const publicDB = new Datastore("database/publicDB.db");
proxyDB.loadDatabase();
publicDB.loadDatabase();

app.post("/sendrequest", (request, response) => {

    let data = request.body;

    data.timestemp = Date.now();

    console.log("Incoming Data: ");
    console.log(data);



    if ((data.fuel != "") && (data.mil != "")) {
        if (data.fuel.length <= 2) {
            response.json(getresp(911));
        }
        else if (data.fuel.length >= 16) {
            response.json(getresp(912));
        }
        else {

            console.log("Data is valid!");
            proxyDB.insert(data);

            proxyDB.count({ fuel: data.fuel }, (err, count) => {
                console.log("Errors:  " + err);
                console.log("Name exits " + count + " times");

                //invite some fancy number to make a dynamic dependiencie+
                if (count >= 5) {
                    data._id = data.fuel;
                    publicDB.insert(data);
                    response.json(getresp(900));
                    updateEntry(data.fuel);
                }
                else {
                    response.json(getresp(950));
                }
            });
        }
    }
    else {
        console.log("Data is invalid!");
        console.log("Empty Fields are not Allowed");
        response.json(getresp(910));
    }
    dataWizard();
});

app.get("/getList", (request, response) => {
    console.log("Try to fetch data")
    publicDB.find({}, (err, data) => {
        console.log("Fetch data")
        console.log(data)
        response.json(data);
    });
});

function updateEntry(datafuel) {
    proxyDB.find({ fuel: datafuel }, (err, data) => {

        let avg = [];
        let temp = 0;
        let final;
        for (item of data) {
            avg.push(item.mil)
            temp = (temp + parseInt(item.mil));
            console.log("temp: " + temp)

        }
        final = (temp / avg.length);
        console.log(final)

        publicDB.update({ fuel: datafuel }, { $set: { mil: final } }, { multi: true }, function (err, numReplaced) {
            // numReplaced = 1
            // The doc #3 has been replaced by { _id: 'id3', planet: 'Pluton' }
            // Note that the _id is kept unchanged, and the document has been replaced
            // (the 'system' and inhabited fields are not here anymore)
            console.log("numReplaced: " + numReplaced)
        });
    });
}

function dataWizard() {

    proxyDB.find({}, (err, tdata) => {

        var cache = [];
        for (item of tdata) {
            cache.push(item);
        }
        getmycount(cache);
    });
}


function getmycount(data) {
    console.log(data)

    let cache = [];
    let temp;
    let count = 0;

    console.log("DataLength: " + data.length);
    for (let i = 0; i < data.length; i++) {
        console.log("");
        console.log("LeftSide");
        console.log(data[i].fuel);

        count = 0;
        if (cache.includes(data[i].fuel)) {
            console.log(data[i].fuel + " wurde bereits behadnelt")
        }
        else {

            for (let j = 0; j < data.length; j++) {

                if (i != j) {
                    console.log("Compare: " + data[i].fuel + " with " + data[j].fuel);
                    if (data[i].fuel == data[j].fuel) {
                        count++;
                    }
                }
                else {
                    console.log("Cant Compare same index")
                }
            }
            console.log("occurence of: " + data[i].fuel + " times " + count);
            if (((Date.now() - data[i].timestemp) > 60000)) {
                console.log("Old man");
                if (count < 3) {
                    console.log("To old and unpopular");
                    console.log("Entry " + data[i].fuel + " got removed");

                    proxyDB.remove({ fuel: data[i].fuel }, { multi: true }, function (err, numRemoved) {
                        console.log("numRemoved" + numRemoved)
                    });
                    cache.push(data[i].fuel);
                }
                else {
                    console.log("At least hes known");
                    cache.push(data[i].fuel);
                }
            }
            else {
                console.log("New Born");
                cache.push(data[i].fuel);
            }
            console.log("Pairs " + count);
            console.log("change")
            proxyDB.update({ fuel: data[i].fuel }, { $set: { occourenc: count } }, { multi: true }, function (err, numReplaced) {
                console.log("numReplaced: " + numReplaced)
            });
        }
    }
}




function getresp(stat) {
    switch (stat) {
        case 900:
            return { status: stat, message: "Data Saved Successfully" };
            break;
        case 910:
            return { status: stat, message: "Empty Fields are not Allowed" };
            break;
        case 911:
            return { status: stat, message: "Name is to short" };
            break;
        case 912:
            return { status: stat, message: "Name is to Long" };
            break;
        case 950:
            return { status: stat, message: "Stored but not enough cases" };
            break;
    }
}