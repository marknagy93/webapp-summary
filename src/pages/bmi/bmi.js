// Állandó DOM elemeket változóba vétele
var heightField = document.getElementById('heightField');
var weightField = document.getElementById('weightField');
var calcBtn = document.getElementById('calcBtn');
var resultDiv = document.getElementById('resultDiv');

// Betöltéskor elvégzendő feladat
resultDiv.style.display = 'none';

// calcBtn kattintás eseménye során fut le a BMI számítás
calcBtn.addEventListener('click', function() {

    // Két érték számmá alakítva való tárolása változóval
    // Int-té alakítja a megadott értéket, ha nem lehet NaN lesz belőle
    var height = parseInt(heightField.value); 
    var weight = parseInt(weightField.value);
    
    // Üres String az esetleges hibaüzenetek összegyűjtéséhez
    // alert() böngészős ablakban lesz megjelenítve (nem HTML szöveg)
    var errorMsg = '';

    // Magasság ellenőrzése
    // isNaN(változó):bool - Megadja, hogy a változó értéke NaN-e? ha igen true, ha nem false
    if(isNaN(height)) {
        errorMsg += 'A megadott magasság nem szám!\r\n';
    } else if(height < 30) {
        errorMsg += 'A magasság nem lehet kisebb, mint 30cm!\r\n';
    } else if(height > 250) {
        errorMsg += 'A magasság nem lehet nagyobb, mint 250cm!\r\n';
    }
    // Ez a feladatrész, ennél a feladatnál összevonva is elfogadható, illetve a sortörés vezérlőkarakterek sem elvártak!

    // Súly ellenőrzése
    if(isNaN(weight)) {
        errorMsg += 'A megadott súly nem szám!\r\n';
    } else if(weight < 10) {
        errorMsg += 'A megadott súly nem lehet kisebb, mint 10kg!\r\n';
    } else if(weight > 300) {
        errorMsg += 'A megadott súly nem lehet nagyobb, mint 300kg!\r\n';
    }

    // Kiértékelés
    // Ha volt hiba, akkor alert-ben jelzés a felhasználónak
    // Ha nincs hiba, akkor BMI számítás és érték megjelenítés
    if(errorMsg == '') {
        // Nem lett hozzáfűzve üzenet, akkor nem volt hiba
        var BMI = weight / ( (height/100) * (height/100) );
        resultDiv.innerHTML = '<p class="mb-0"><strong>'+(Math.round(BMI*100)/100)+'</strong></p>';
        resultDiv.style.display = 'block';

    } else {
        // Megváltozott az értéke, hiba volt
        alert('Hiba!\r\n\r\n'+errorMsg);
    }

});