/* Állandó DOM elemek változóba */
var monthInput = document.getElementById('monthInput');
var seasonTextObj = document.getElementById('seasonText');

// Halmazok kezelése másképpen, nem switch-case-el
// Minden halmaz számára tömböt hozunk létre, és amikor vizsgáljuk a kapott értéket, azt nézzük meg, hogy eleme-e valamelyik tömbnek. tomb.includes('keresett elem'):bool
var seasons = {
    winter: ['január', 'február', 'december'],
    spring: ['március', 'április', 'május'],
    summer: ['június', 'július', 'augusztus'],
    fall: ['szeptember', 'október', 'november']
}

document.getElementById('seasonBtn').onclick = function() {
    var keresettHonap = monthInput.value.toLowerCase();

    // Keresés előtt "reseteljük" az oldalt, tisztalappal indulunk
    document.body.classList.remove('winterStyle', 'springStyle', 'summerStyle', 'fallStyle');

    if(seasons.winter.includes(keresettHonap)) {
        var styleClass = 'winterStyle';
        var seasonText = 'Tél';
    } else if(seasons.spring.includes(keresettHonap)) {
        var styleClass = 'springStyle';
        var seasonText = 'Tavasz';
    } else if(seasons.summer.includes(keresettHonap)) {
        var styleClass = 'summerStyle';
        var seasonText = 'Nyár';
    } else if(seasons.fall.includes(keresettHonap)) {
        var styleClass = 'fallStyle';
        var seasonText = 'Ősz';
    } else {
        var styleClass = '';
        var seasonText = 'Nincs ilyen hónapnév!';
    }

    if(styleClass.length > 0) {
        document.body.classList.add(styleClass);
    }
    
    seasonTextObj.innerHTML = seasonText;
}