function convertTo12Hour(time24) {
    let [hour, minute] = time24.split(":");

    hour = parseInt(hour);
    let ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    hour = hour ? hour : 12;

    return `${hour}:${minute} ${ampm}`;
}


const city1 = "Dhaka";
const country = "Bangladesh";

const url = `https://api.aladhan.com/v1/timingsByCity?city=${city1}&country=${country}&method=1`;
fetch(url)
    .then(res => res.json())
    .then(data => {

        document.getElementById("sehri").innerText =
            convertTo12Hour(data.data.timings.Fajr);

        document.getElementById("iftar").innerText =
            convertTo12Hour(data.data.timings.Maghrib);

        document.getElementById("date").innerText = new Date().toLocaleDateString("en-GB");
        document.getElementById("day").innerText = new Date().toLocaleDateString("en-GB", { weekday: "long" });
    });