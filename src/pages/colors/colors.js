// Állandó DOM elemek
var inputArray = document.getElementsByTagName('input');

var redRange = document.querySelector('#redBox input');
var greenRange = document.querySelector('#greenBox input');
var blueRange = document.querySelector('#blueBox input');
var alphaRange = document.querySelector('#alphaBox input');

var szinDoboz = document.getElementById('colorBox');

// Szín indikátorszám beállító függvény
function setIndicator(boxId) {
    document.querySelector('#'+boxId+' .indicator').innerHTML = 
    document.querySelector('#'+boxId+' input').value;
}

// Színbeállító függvény - range mozdításokhoz és az oldal betöltésekor való beállításhoz
function setColor() {
    // Összekapcsoljuk a range inputokat az indikátoraikkal
    setIndicator('redBox');
    setIndicator('greenBox');
    setIndicator('blueBox');
    setIndicator('alphaBox');

    // Színbeállításhoz RGB értékek kiolvasása
    var red = redRange.value;
    var green = greenRange.value;
    var blue = blueRange.value;
    var alpha = alphaRange.value;

    // Színdoboznak inline style formázással beállítjuk a megadott színt háttérnek
    colorBox.style.backgroundColor = 'rgba('+red+','+green+','+blue+','+alpha+')';
}

setColor();

// Range típusu inputoknál ha minden mozdulatot kezelni szeretnénk, akkor az input eseményt kell kezelnünk
// Minden input megkapja input eseményhez a színbeállító függvényt
for(var rangeInput of inputArray) {
    rangeInput.oninput = setColor;
}