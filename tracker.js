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

const duaVerses = [
    "2:201", "3:8", "7:23", "14:40", "17:24",
    "20:114", "21:87", "23:118", "25:74",
    "28:24", "59:10", "66:8"
];

// Daily change
const today = new Date();
const index = today.getDate() % duaVerses.length;
const verseKey = duaVerses[index];

// Fetch Quran verse
fetch(`https://api.quran.com/api/v4/verses/by_key/${verseKey}?translations=131&fields=text_uthmani`)
    .then(res => res.json())
    .then(async data => {

        const verse = data.verse;
        const arabicText = verse.text_uthmani;

        document.getElementById("arabic").innerText = arabicText;

        let translationText = "";

        if (verse.translations && verse.translations.length > 0) {

            translationText =
                verse.translations[0].text.replace(/<[^>]*>/g, "");

        } else {

            const translateURL =
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(arabicText)}&langpair=ar|en`;

            const transRes = await fetch(translateURL);
            const transData = await transRes.json();

            translationText = transData.responseData.translatedText;
        }

        document.getElementById("translation").innerText = translationText;

        document.getElementById("reference").innerText =
            `Quran ${verse.verse_key}`;

    })
    .catch(err => console.error(err));