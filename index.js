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


let datamil = 0;
let globaldata;

async function datasetavg(mil) {

    let temp = 0;
    for (let i = 0; i < mil.length; i++) {
        temp = temp + mil[i];
        console.log(temp)
    }
    let avgdata = (temp / mil.length);
    workwith(avgdata)
}

async function checkExisting(fuel, mil, response) {
    let avgdata = 0;

    proxyDB.find({ fuel: fuel }, (err, data) => {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            arr.push(data[i].mil)
        }
        console.log(arr);
        datasetavg(arr);
        datasetavg(arr);
    });
}

function workwith(avgdata) {
    console.log("avgdata: " + avgdata)
    console.log("data.mil: " + globaldata.mil)
    if (((avgdata + 3) > globaldata.mil) && (((avgdata - 3) < globaldata.mil))) {
        console.log("datafit")


        proxyDB.count({ fuel: globaldata.fuel }, (err, count) => {
            console.log("Errors:  " + err);
            console.log("Name exits " + count + " times");

            //invite some fancy number to make a dynamic dependiencie+
            if (count >= 5) {
                globaldata._id = globaldata.fuel;
                publicDB.insert(globaldata);
                //response.json(getresp(900));
                updateEntry(globaldata.fuel);
            }
            else {
                // response.json(getresp(950));
            }
        });
    }
    else {
        console.log("data is to unrealistic")
    }
}

async function datahandler(data) {


    data.timestemp = Date.now();
    globaldata = data;
    console.log("Incoming Data: ");
    console.log(globaldata);
    if ((globaldata.fuel != "") && (globaldata.mil != "")) {
        if (globaldata.fuel.length <= 2) {
            //response.json(getresp(911));
        }
        else if (globaldata.fuel.length >= 16) {
            //response.json(getresp(912));
        }
        else {

            console.log("Data is valid!");
            proxyDB.insert(globaldata);

        }
    }
    else {
        console.log("Data is invalid!");
        console.log("Empty Fields are not Allowed");
        // response.json(getresp(910));
    }
    dataWizard();
    checkExisting(data.fuel, data.mil, response)
}

app.post("/sendrequest", (request, response) => {
    datahandler(request.body);
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