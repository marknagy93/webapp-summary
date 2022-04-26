/* Tanuló kereső osztállyal megvalósítva */

class StudentSearch {
    searchField;
    searchBtn;
    suggestionBox;
    resultBox;

    constructor() {
        this.searchField = document.getElementById('searchField');
        this.searchBtn = document.getElementById('searchBtn');
        this.suggestionBox = document.getElementById('suggestionBox');
        this.resultBox = document.getElementById('resultBox');

        // Ha megváltozik a viewport mérete, akkor kerüljön újrakonfigurálásra a javaslati doboz szélessége
        window.onresize = this.setSuggestionBoxWidth;
        // Ha billentyűt "engednek fel" a keresési mezőben, elkezdődhet a javaslat adás
        this.searchField.onkeyup = this.suggest;
        // Ha a keresés gombra kattintanak, indulhat a keresési folyamat
        this.searchBtn.onclick = this.search;

        // Betöltéskor javaslati doboz szélesség beállítás
        this.setSuggestionBoxWidth();
        // Betöltéskor alapvetően kerüljön elrejtésre a javaslati doboz
        this.hideSuggestionBox();
    }

    setSuggestionBoxWidth = () => {
        this.suggestionBox.style.width = this.searchField.offsetWidth+'px';
    }

    showSuggestionBox = () => {
        this.suggestionBox.style.display = 'block';
    }

    hideSuggestionBox = () => {
        this.suggestionBox.style.display = 'none';
    }

    suggest = () => {
        const searchText = this.searchField.value;

        // Ha legalább egy karakter van a keresési mezőben, akkor megjelenítjük a javaslati dobozt, és elindítjuk a javaslatok keresését, ha egy sem, akkor elrejtjük a dobozt.
        if(searchText.length > 0) {
            this.showSuggestionBox();

            // Aszinkron kérést indítunk a tanulók adataira (students.json)
            const xhr = new XMLHttpRequest();
            xhr.open('get', 'students.json');
            xhr.send();
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4 && xhr.status == 200) {

                    // Visszakapott adatok tárolása tömbként
                    const students = JSON.parse(xhr.responseText);
                    
                    let suggestionHTML = '';
                    for(let studentData of students) {
                        if(studentData.name.toLowerCase().startsWith(searchText.toLowerCase())) {
                            // A beírt szöveg kiemelve jelenik meg, és a hozzákapcsolódó kiegészítés egyéb formázás nélkül
                            // Beírt szöveg + adott tanuló neve az elejéről levágva annyi karakter ahány karaktert beírt a felhasználó
                            // String.slice(elejérőlDB, végérőlDB = 0);
                            const newSuggestion = 
                            '<p studentname="'+studentData.name+'" class="m-0 px-2 py-1">'+
                                '<span class="highlighted">'+searchText+'</span>'+
                                studentData.name.slice(searchText.length)+
                            '</p>';

                            // Csak akkor fűzzűk hozzá a meglévő javaslatokhoz az új javaslatot, ha még ilyen nincs benne
                            // String.includes(String):bool
                            if(!suggestionHTML.includes(newSuggestion)) {
                                suggestionHTML += newSuggestion;
                            }
                        }
                    }

                    // Ha van javaslat akkor megjelenítjük, ha nincs, akkor ezt jelezzük
                    this.suggestionBox.innerHTML = (suggestionHTML.length > 0) ? suggestionHTML : 
                    '<p class="m-0 px-2 py-1">Nincs javaslat!</p>';

                    // A frissen hozzáadott paragrafusokhoz kattintás eseményt társítunk azzal a függvénnyel amelyik majd a mezőkitöltést végzi (setSearchFieldValue)
                    const suggestions = document.querySelectorAll('#suggestionBox p'); // Tömb
                    for(let suggestionP of suggestions) {
                        suggestionP.onclick = this.setSearchFieldValue;
                    }

                }
            }

        } else {
            this.hideSuggestionBox();
        }
    }

    setSearchFieldValue = (event) => {
        // Ez a függvény fut le ha egy javaslat paragrafusra kattint a felhasználó
        // Az esemény objektumot használnunk kell, mert ebből lehet majd elérni hogy pontosan melyik javaslat paragrafuson történt a kattintás (event.target)
        this.searchField.value = event.target.getAttribute('studentname');
        this.hideSuggestionBox();
    }

    search = () => {
        const searchText = this.searchField.value.toLowerCase();
        
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'students.json');
        xhr.send();
        // Válasz érkezésének észlelése más módon - xhr.onload, akkor következik be ha teljesen felépült a kapcsolat, tehát már csak a statust kell vizsgálni benne
        xhr.onload = () => {
            if(xhr.status == 200) {
                const students = JSON.parse(xhr.responseText);

                let resultHTML = '';
                for(let studentData of students) {
                    if(searchText == studentData.name.toLowerCase()) {
                        resultHTML +=
                        `<div class="bg-white shadow rounded p-3 mb-3">
                            <h4>`+studentData.name+`</h4>
                            <p class="mb-0">Nem: `+studentData.gender+`</p>
                            <p class="mb-0">Születési dátum: `+studentData.birthDate+`</p>
                            <p class="mb-0">Osztály: `+studentData.class+`</p>
                        </div>`
                    }
                }

                this.resultBox.innerHTML = (resultHTML.length > 0) ? resultHTML :
                `<div class="bg-white shadow rounded p-3 mb-3">
                    <h4 class="mb-0">Nincs találat!</h4>
                </div>`

            }
        }
    }
}

// Létrehozunk egy példányt, ami konfigurálja magát, és már működik is
const search = new StudentSearch();