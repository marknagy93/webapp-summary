var consumptionField = document.getElementById('consumptionField');
var calcBtn = document.getElementById('calcBtn');

resultDiv.style.display = 'none';

calcBtn.onclick = function() {

    var consumption = parseFloat(consumptionField.value);

    if(isNaN(consumption) || consumption < 0) {
        alert('Kérlek 0-nál nagyobb számot adj meg!');
    } else if(consumption <= 4.4) {
        resultDiv.innerHTML = '<p class="mb-0">Nagyon alacsony</p>';
        resultDiv.style.display = 'block';
    } else if(consumption <= 5.4) {
        resultDiv.innerHTML = '<p class="mb-0">Alacsony</p>';
        resultDiv.style.display = 'block';
    } else if(consumption <= 7.9) {
        resultDiv.innerHTML = '<p class="mb-0">Átlagos</p>';
        resultDiv.style.display = 'block';
    } else if(consumption <= 13.4) {
        resultDiv.innerHTML = '<p class="mb-0">Magas</p>';
        resultDiv.style.display = 'block';
    } else {
        resultDiv.innerHTML = '<p class="mb-0">Nagyon magas</p>';
        resultDiv.style.display = 'block';
    }

}