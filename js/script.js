let cssInUse=document.getElementById('lnkStyleSheet');
let btnChooseThem=document.getElementById('btn_chooseThem');

btnChooseThem.addEventListener('click', chooseThem);

function chooseThem(){
    console.log(cssInUse.classList.toggle.name.toString);
}