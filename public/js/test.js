document.getElementById("testbtn").addEventListener("click", async function sendrequest() {

    console.log("button is clicked")

    const testdata = "hallo";
    const data = {testdata};

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    };

    const response = await fetch("/test", options)
    const resp = await response.json();
    console.log("Das ist Antwort")
    console.log(resp)
});
