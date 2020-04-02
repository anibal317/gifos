let cssInUse=document.getElementById('lnkStyleSheet');
let btnThemDay=document.getElementById('themDay');
let btnThemNight=document.getElementById('themNight');

btnThemDay.addEventListener('click', chooseThemDay);
btnThemNight.addEventListener('click', chooseThemNight);

function chooseThemDay(){
    cssInUse.href='css/dayStyle.css';
}
function chooseThemNight(){
    cssInUse.href='css/nightStyle.css';
}