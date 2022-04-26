// DOM
var bmiField = document.getElementById('bmiField');
var calcBtn = document.getElementById('calcBtn');
var resultDiv = document.getElementById('resultDiv');

// Alapfeladatok
resultDiv.style.display = 'none';

// Kattintás esemény
calcBtn.onclick = function() {
    var bmi = parseFloat(bmiField.value);

    if(isNaN(bmi)) {
        alert('A megadott BMI index nem szám!');
    } else if(bmi < 5 || bmi > 100) {
        alert('A megadott érték kisebb mint 5 vagy nagyobb mint, 100!');
        resultDiv.style.display = 'block';
    } else if(bmi < 18.5) {
        resultDiv.innerHTML = '<p class="mb-0"><strong>Soványság</strong></p>';
        resultDiv.style.display = 'block';
    } else if(bmi < 25) {
        resultDiv.innerHTML = '<p class="mb-0"><strong>Normál testsúly</strong></p>';
        resultDiv.style.display = 'block';
    } else if(bmi < 30) {
        resultDiv.innerHTML = '<p class="mb-0"><strong>Túlsúly</strong></p>';
        resultDiv.style.display = 'block';
    } else {
        resultDiv.innerHTML = '<p class="mb-0"><strong>Elhízás</strong></p>';
        resultDiv.style.display = 'block';
    }
}