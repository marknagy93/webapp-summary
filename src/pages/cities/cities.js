
class Cities {

    maxPopBtn;
    lower150Btn;
    searchField;
    searchBtn;
    resultTbody;

    constructor() {

        this.maxPopBtn = document.getElementById('maxPopBtn');
        this.lower150Btn = document.getElementById('lower150Btn');
        this.searchField = document.getElementById('searchField');
        this.searchBtn = document.getElementById('searchBtn');
        this.resultTbody = document.getElementById('resultTbody');

        this.maxPopBtn.onclick = this.maxPopCity;
        this.lower150Btn.onclick = this.lower150Cities;
        this.searchBtn.onclick = this.searchCity;

    }

    maxPopCity = () => {

        const xhr = new XMLHttpRequest();
        xhr.open('get', 'cities.json');
        xhr.send();
        xhr.onload = () => {
            if(xhr.status == 200) {
                const cities = JSON.parse(xhr.responseText);

                let maxPopCity = cities[0].population;

                for(let i=1; i<cities.length; i++) {
                    if(cities[i].population > maxPopCity) {
                        maxPopCity = cities[i].population;
                    }
                }

                let resultHTML = '';

                for(let cityData of cities) {
                    if(cityData.population == maxPopCity) {

                    resultHTML +=
                    `<tr>
                        <td>`+cityData.name+`</td>
                        <td class="text-end">`+cityData.population+` fő</td>
                    </tr>`
                    }
                }

                this.resultTbody.innerHTML = resultHTML;
            }
        }

    }

    lower150Cities = () => {

        const xhr = new XMLHttpRequest();
        xhr.open('get', 'cities.json');
        xhr.send();
        xhr.onload = () => {
            if(xhr.status == 200) {
                const cities = JSON.parse(xhr.responseText);

                let resultHTML = '';

                for(let cityData of cities) {
                    if(cityData.population < 150000) {
                        resultHTML +=
                        `<tr>
                            <td>`+cityData.name+`</td>
                            <td class="text-end">`+cityData.population+` fő</td>
                        </tr>`;
                    }
                }

                this.resultTbody.innerHTML = resultHTML;
            }
        }

    }

    searchCity = () => {

        const searchText = this.searchField.value.toLowerCase();

        if(searchText.length > 0) {
        
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'cities.json');
        xhr.send();
        xhr.onload = () => {
            if(xhr.status == 200) {
                const cities = JSON.parse(xhr.responseText);

                let resultHTML = '';

                for(let cityData of cities) {
                    if(cityData.name.toLowerCase() == searchText.toLowerCase()) {
                        resultHTML +=
                        `<tr>
                            <td>`+cityData.name+`</td>
                            <td class="text-end">`+cityData.population+` fő</td>
                        </tr>`
                    }
                }

                if(resultHTML.length > 0) {
                    this.resultTbody.innerHTML = resultHTML;
                } else {
                    alert('Nincs találat!');
                    this.resultTbody.innerHTML = '';
                }
            }
        }

        } else {
            alert('Üres keresési mező!');
            this.resultTbody.innerHTML = '';
        }

    }
}
const cityObj = new Cities();