let btnCreateGifo=document.getElementsByClassName('btn_createGifo');
let btnDropdown=document.getElementsByClassName('dropdown');
let btnMisGifos=document.getElementsByClassName('btn_misGifos');
let btnCancelar=document.getElementById('btnCancelar');
let btnComenzar=document.getElementById('btnComenzar');
let btnCapturar=document.getElementById('btnCapturar');
let btnListo=document.getElementById('btnListo');
let btnSubirGuifo=document.getElementById('btnSubirGuifo');

let sectionMisGifos=document.getElementsByClassName('myGuifos');
let pag1=document.getElementsByClassName('frmPag1');
let pag2=document.getElementsByClassName('frmPag2');
let pag3=document.getElementsByClassName('frmPag3');
let pag4=document.getElementsByClassName('frmPag4');
let pag5=document.getElementsByClassName('frmPag5');
let pag6=document.getElementsByClassName('frmPag6');
let timer=document.getElementsByClassName('timer');

btnCancelar.addEventListener('click', ()=>console.log("Cancelar"));
btnComenzar.addEventListener('click', pagina2);
btnCapturar.addEventListener('click', pagina3);
btnListo.addEventListener('click', pagina4);
btnSubirGuifo.addEventListener('click', pagina5);

btnCreateGifo[0].hidden=true;
btnDropdown[0].hidden=true;
btnMisGifos[0].hidden=true;
sectionMisGifos[0].hidden=false;

pag1[0].hidden=true;
pag2[0].hidden=true;
pag3[0].hidden=true;
pag4[0].hidden=true;
pag5[0].hidden=true;
pag6[0].hidden=false;
timer[0].hidden=true;


function pagina2(){
    pag1[0].hidden=true;
    pag2[0].hidden=false;
    sectionMisGifos[0].hidden=true;
}
function pagina3(){
    pag2[0].hidden=true;
    pag3[0].hidden=false;
    timer[0].hidden=false;
}
function pagina4(){
    pag3[0].hidden=true;
    pag4[0].hidden=false;
}
function pagina5(){
    pag4[0].hidden=true;
    timer[0].hidden=true;
    pag5[0].hidden=false;
}
function pagina6(){
    pag5[0].hidden=true;
    timer[0].hidden=true;
    pag6[0].hidden=false;
}