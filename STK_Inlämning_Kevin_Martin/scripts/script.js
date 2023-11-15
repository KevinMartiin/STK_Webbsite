// Variabel som deklareras utanför något scope då den kommer användas i flertal funktioner
// Hämtar referensen till elementet "outputDiv"
var outputDiv = document.getElementById("outputDiv");

// Hämtar referenser till de diverse HTML knappar som jag kommer att använda mig av i denna JS fil
const addProgramBtn = document.getElementById("addProgramBtn");
const showArchiveBtn = document.getElementById("showArchiveBtn");
const clearArchiveBtn = document.getElementById("clearArchiveBtn");
const searchForBtn = document.getElementById("searchForBtn");

// Arrow funktioner för att hantera eventet när man klickar på en knapp ska en funktion köras
addProgramBtn.onclick = () => AddProgram();
showArchiveBtn.onclick = () => ShowArchive();
clearArchiveBtn.onclick = () => ClearArchive();
searchForBtn.onclick = () => SearchArchive();

// En funktion för att lägga till program i local storage/lokalt lagringsutrymme
function AddProgram() {
    // Hämta värdena från fälten för input
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const ageLimit = document.getElementById("ageLimit").value;

    // Detta hämtar existerande data från local storage och om det är tomt så skapas istället en tom array alltså om ingen data hittas
    let existingData = localStorage.getItem("savedData");
    existingData = existingData ? JSON.parse(existingData) : [];

    // Lägg till det inmatade programmet som data
    existingData.push({
        title: title,
        description: description,
        ageLimit: ageLimit
    });

    // Spara den uppdaterade datan till local storage
    localStorage.setItem('savedData', JSON.stringify(existingData));

    // Visa meddelande om att datan har sparats
    const dataStored = "Datan har nu sparats!";
    outputDiv.innerHTML = dataStored;


    // Detta rensar input fälten, återställer de till ursprungliga tillståndet
    document.getElementById("title").value = '';
    document.getElementById("description").value = '';
    document.getElementById("ageLimit").value = '';
}

// Funktion för att visa upp alla program som är sparade i local storage
function ShowArchive() {
    // Hämta sparad data i local storage men hämtar även referensen till elementet "outputDiv" så att denna kan användas i senare skede
    const savedData = localStorage.getItem("savedData");
    // const outputDiv = document.getElementById("outputDiv");

    // Om det finns sparad data i local storage
    if (savedData) {
        const parsedData = JSON.parse(savedData);

        // Om det finns data för minst ett program sparad
        if (parsedData.length > 0) {
            // Bygg upp HTML-sträng för att visa resultaten som en tabell
            let resultHTML = "<table>";
            resultHTML += "<tr><th>Titel</th><th>Beskrivning</th><th>Åldersgräns</th></tr>";

            // Loop som itererar varje program och lägger till dess data i den nyskapade HTML-strängen
            for (const program of parsedData) {
                resultHTML += `<tr><td>${program.title}</td><td>${program.description}</td><td>${program.ageLimit}</td></tr>`;
            }

            // Stängande HTML-taggar för att avsluta tabellen
            resultHTML += "</table>";

            // Uppdatera innehållet i outputDiv
            outputDiv.innerHTML = resultHTML;
        } else {
            // Ingen data hittat
            outputDiv.innerHTML = '<p>Ingen data hittad</p>';
        }
    } else {
        // Ingen data hittad
        outputDiv.innerHTML = '<p>Ingen data hittad</p>';
    }
    // Anropa en funktion för att justera höjden på body-elementet baserat på innehållets höjd
    adjustBodyHeight();
}

// Funktion för att rensa local storage
function ClearArchive() {
    // Tar bort den sparade datan från local storage
    localStorage.removeItem("savedData");

    // Visar ett meddelande i form av en alert att datan rensats, anledningen till detta är för att när man rensar data tycker jag det är bättre att använda sig av en alert
    alert("Arkivet är nu rensat!")

    // Återställ body-height till ursprungligt värde
    document.body.style.height = "100vh";

    // Töm elementet outputDiv på dess innehåll, rättare sagt, fyll elementet med en tom sträng
    outputDiv.innerHTML = ""
}

// Funktion för att söka igenom arkivet/local storage
function SearchArchive() {
    // Här hämtas söktermen från input-fältet
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();

    // Hämta sparad data från local storage och även referensen till "outputDiv"
    const savedData = localStorage.getItem("savedData");

    // Om det finns sparad data
    if (savedData) {
        const parsedData = JSON.parse(savedData);

        // Skapa en tom array för att lagra alla program som matchar söktermen från input
        let foundPrograms = [];

        // Iterera över varje program för att göra en jämföring om titel eller åldersgränsen matchar med användarens sökterm
        for (const program of parsedData) {
            // Jämför både titel och åldersgräns
            const titleMatch = program.title.toLowerCase().includes(searchTerm);
            const ageLimitMatch = program.ageLimit.toString() === searchTerm;

            // Om det finns en matchning, lägg till program i foundPrograms
            if (titleMatch || ageLimitMatch) {
                foundPrograms.push(program);
            }
        }

        // Om det finns program som är en match med söktermen
        if (foundPrograms.length > 0) {
            // Bygg upp HTML-sträng för att visa resultaten som en tabell
            let resultHTML = "<table>";
            resultHTML += "<tr><th>Titel</th><th>Beskrivning</th><th>Åldersgräns</th></tr>";

            // Iterera över varje program som matchar söktermen och lägg till dess innehåll till HTML-strängen
            for (const program of foundPrograms) {
                resultHTML += `<tr><td>${program.title}</td><td>${program.description}</td><td>${program.ageLimit}</td></tr>`;
            }

            // Avsluta html taggen för table
            resultHTML += "</table>";

            // Uppdatera innehållet i outputDiv vilket görs med HTML-strängen
            outputDiv.innerHTML = resultHTML;
        } else {
            // Inget data hittat
            outputDiv.innerHTML = '<p>Ingen matchning hittad</p>';
        }
    } else {
        // Ingen data att söka igenom
        outputDiv.innerHTML = '<p>Ingen data att söka igenom</p>';
    }
}

// Funktion för att justera höjd på elementet body och detta görs baserat på innehållets höjd
function adjustBodyHeight() {
    const documentHeight = document.documentElement.scrollHeight;
    document.body.style.height = `${documentHeight}px`;
}

// Funktion för att översätta hemsidan med hjälp av google translate API
function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'sv' }, 'google_translate_element');
}

// Lägg till ett eventlyssnare för ändringar i fönsterstorleken
window.addEventListener('resize', adjustBodyHeight);