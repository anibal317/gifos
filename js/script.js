/*Asignación de controles DOM a variables*/
let cssInUse=document.getElementById('lnkStyleSheet');
let btnThemDay=document.getElementById('themDay');
let btnThemNight=document.getElementById('themNight');
let dayBox=document.getElementById('dayBox');
let nightBox=document.getElementById('nightBox');
let btnChooseThem=document.getElementById('btn_downArrow');
let dropdownContent=document.getElementById('dropdown-content');
let btnSearch=document.getElementById('btn_search');
let txtSearch=document.getElementById('txtSearch');

/*Creo eventos listener*/
btnThemDay.addEventListener('click', toDayTheme);
btnThemNight.addEventListener('click', toNightTheme);
btnChooseThem.addEventListener('click', chooseThem);
dropdownContent.addEventListener('mouseleave', hideChooseThem);
btn_search.addEventListener('click', searhGifOs);
dayBox.addEventListener('click', toDayTheme);
nightBox.addEventListener('click', toNightTheme);

/*Sección de funciones*/
function toDayTheme(){
    cssInUse.href='css/dayStyle.css';
}
function toNightTheme(){
    cssInUse.href='css/nightStyle.css';
}
function chooseThem(){
    if (dropdownContent.style.display=='block'){
        dropdownContent.style.display = "none";
    }else{
        dropdownContent.style.display = "block";
    }
}
function hideChooseThem(){
    dropdownContent.style.display="none";
}
function searhGifOs(){
    console.log(txtSearch.value);
}
