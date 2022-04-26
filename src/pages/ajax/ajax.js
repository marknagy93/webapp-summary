// Állandó DOM elemek konstansokba
const fullnameField = document.getElementById('fullnameField');
const birthDateField = document.getElementById('birthDateField');
const jobField = document.getElementById('jobField');
const favColorField = document.getElementById('favColorField');
const tableBody = document.getElementById('tableBody');
const allInputField = document.getElementsByTagName('input');

// AJAX keresés folyamat
const ajaxSearch = () => {
    const fullName = fullnameField.value.toLowerCase();
    const birthDate = birthDateField.value.toLowerCase();
    const job = jobField.value.toLowerCase();
    const favColor = favColorField.value.toLowerCase();

    const xhr = new XMLHttpRequest();
    xhr.open('get', 'munkavallalok.json');
    xhr.send();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                const employees = JSON.parse(xhr.responseText);

                // String a HTML megjelenítéshez
                let resultHTML = '';

                // Végigjárjuk a munkavállalók tömbjét
                for(let person of employees) {
                    if(
                        person.teljesNev.toLowerCase().includes(fullName) &&
                        person.szuletesiDatum.toLowerCase().includes(birthDate) &&
                        person.beosztas.toLowerCase().includes(job) &&
                        person.kedvencSzin.toLowerCase().includes(favColor)
                    ) {
                        resultHTML +=
                        '<tr>'+
                            '<td>'+person.teljesNev+'</td>'+
                            '<td>'+person.szuletesiDatum+'</td>'+
                            '<td>'+person.beosztas+'</td>'+
                            '<td>'+person.kedvencSzin+'</td>'+
                        '</tr>'
                    }
                }
                tableBody.innerHTML = resultHTML;
            }
        }
    }
}

// Betöltéskor egy keresés
ajaxSearch();

// Összes input elem keyup eseménykor keresés
for(let input of allInputField) {
    input.onkeyup = ajaxSearch;
}