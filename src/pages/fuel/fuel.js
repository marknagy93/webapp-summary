var consumptionField = document.getElementById('consumptionField');
var lengthField = document.getElementById('lengthField');
var fuelField = document.getElementById('fuelField');
var petrolPriceField = document.getElementById('petrolPriceField');
var dieselPriceField = document.getElementById('dieselPriceField');
var calcBtn = document.getElementById('calcBtn');

calcBtn.onclick = function() {

    var length = parseFloat(lengthField.value);
    var fuel = parseFloat(fuelField.value);

    if((isNaN(length) || isNaN(fuel)) || ((length < 0) || (fuel < 0))) {
        alert('Kérlek 0-nál nagyobb számot adj meg!');
    } else {
        var uzemanyagFogy = (fuel / length) * 100;
        consumptionField.value = (Math.round(uzemanyagFogy * 10) / 10)+' l/100km';

        var dieselPrice = 471.9 * fuel;
        dieselPriceField.value = (Math.round(dieselPrice * 1) / 1)+' Ft';

        var petrolPrice = 478.9 * fuel;
        petrolPriceField.value = (Math.round(petrolPrice * 1) / 1)+' Ft';
    }
}