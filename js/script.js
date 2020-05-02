arrMyGifos=JSON.parse(localStorage.getItem('myGifos')) || ["KZ5hI3mCLfwkUW4ANq","QsmzMduo77TUJR9WWn","ZDFA2y53aJg0pX0sgL", "Y4bA1xg5FZeZaY641X", "kfoYPgUrmsQS2xj71C", "jOzQBRIp3R45FXDw2F"];
let gifoUrl="https://giphy.com/embed/";

let cssInUse=document.getElementById('lnkStyleSheet');
let btnThemDay=document.getElementById('themDay');
let btnThemNight=document.getElementById('themNight');
let dayBox=document.getElementById('dayBox');
let nightBox=document.getElementById('nightBox');
let btnChooseThem=document.getElementById('btn_downArrow');
let dropdownContent=document.getElementById('dropdown-content');
let txtSearch=document.getElementById('txtSearch');
let img_suggest=document.getElementById('img_suggest');
let img_trending=document.getElementById('imgTrending');
let btnSearch=document.getElementById('btn_search');
let img_mySearchs=document.getElementById('img_mySearchs');
let tituloMySearchs=document.getElementById('listSearchs');
let suggestedList=document.getElementById('dropdown-content1');
let searchedList=document.getElementById('suggestedList');
let btnMyGifos=document.getElementById('btn_misGifos');
let lstSuggested=document.getElementById('lstSuggested');

const maxSuggestedResult=4;
const maxtrendingResult=24;
const maxSearchedResult=12;
let maxHeight=1900;
let offset=5;
let strBusqueda='';
let limpiarTrending=true;

let imgFrame=document.getElementsByClassName('imgFrame');
let sectionSearchs=document.getElementsByClassName('searchs');
let sectionSuggestions=document.getElementsByClassName('suggestions');
let sectionTrending=document.getElementsByClassName('trending');
let sectionMySearchs=document.getElementsByClassName('mySearchs');
let sectionMyGuifos=document.getElementsByClassName('myGuifos');

btnMyGifos.addEventListener('click', myGuifos);
btnThemDay.addEventListener('click', toDayTheme);
btnThemNight.addEventListener('click', toNightTheme);
btnChooseThem.addEventListener('click', chooseThem);
dropdownContent.addEventListener('mouseleave', hideChooseThem);
btnSearch.addEventListener('click', showSearch);
txtSearch.addEventListener('keyup', searhGifOs);
dayBox.addEventListener('click', toDayTheme);
nightBox.addEventListener('click', toNightTheme);

suggest();
trending();

sectionMySearchs[0].hidden=true;
sectionMyGuifos[0].hidden=true;

function listTags(strTags){
    arrTags=strTags.split('-');
    lstSuggested.innerHTML='';
    for(i=0; i < (arrTags.length)-1; i++){
         lstSuggested.innerHTML+=`<div class="lnkSuggested"><a href="#" onclick="fromLinkToInput()" id="${arrTags[i]}">#${arrTags[i]}</a></div> `;
    }
}
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
function searhGifOs(){ //dropdown
    let resultado=searchGifos();
    suggestedList.innerHTML='';
    resultado.then(res =>{
        if(res.data.length!==0){
            searchedList.style.display='block';
            suggestedList.innerHTML=`
                    <div class="suggestedItem" id="item1"><a href="#" onclick="fromLinkToInput()" class="lnk" id="${res.data[0].id}">${res.data[0].title}</a></div>
                    <div class="suggestedItem" id="item1"><a href="#" onclick="fromLinkToInput()" class="lnk" id="${res.data[1].id}">${res.data[1].title}</a></div>
                    <div class="suggestedItem" id="item1"><a href="#" onclick="fromLinkToInput()" class="lnk" id="${res.data[2].id}">${res.data[2].title}</a></div>
                `;
        }
    });
    if (event.keyCode==13){
        showSearch();
    }
}
async function suggest() {
    let resultado = await fetch("https://api.giphy.com/v1/gifs/trending?api_key=NzreMCTPOd9ZcGAzVKXEkG2zPoJnL0bW&limit="+maxSuggestedResult+"&rating=G&lang=es")
      .then(respuesta => respuesta.json())
      .then((dato) => dato);
      
    img_suggest.innerHTML = '';
      
    resultado.data.forEach(element => {
    img_suggest.innerHTML +=` 
                        <div class="imgFrame" id="${element['id']}">
                            <div class="imgframeTitle">
                                <p class="title">${element['title']}</p>
                                <button class="btn-Close" id="btn-Close" ><img data-id="${element['id']}" src="./assets/close.svg" alt="" onclick="eliminar()"></button>
                            </div>
                            <img class="img_daily1" alt="loading img" src="${element['images'].downsized_large.url}">
                            <div class="btn_verMas" ><p data-more="${element['slug'].split('-')[0]}" onclick="showMore()">Ver más...</p></div>
                        </div>
                        `;
    });
    listTags(resultado.data[0].slug);
    searchedList.style.display='none';
} 
function eliminar(){
    let resultado=searchRandom()
    for(i=0;i<imgFrame.length;i++){
        if (event.target.dataset.id==imgFrame[i].getAttribute('id')){
            let hijo=document.getElementById(event.target.dataset.id);
            img_suggest.removeChild(hijo);
        }
    }
    resultado.then(res =>{
        img_suggest.innerHTML +=` 
                                <div class="imgFrame" id="${res.data.id}">
                                    <div class="imgframeTitle">
                                        <p class="title">${res.data.title}</p>
                                        <button class="btn-Close" id="btn-Close"><img data-id="${res.data.id}" src="./assets/close.svg" alt=""></button>
                                    </div>
                                    <img class="img_daily1" alt="loading img" src="${res.data.images.downsized_large.url}">
                                    <div class="btn_verMas" ><p data-more="${res.data.title}" onclick="showMore()">Ver más...</p></div>
                                </div>
                                `;
    });
}
async function trending() {
    let resultado = await fetch("https://api.giphy.com/v1/gifs/trending?api_key=M2w3WvZMLnWs5ra5f7CsLTKJEwaGWD1O&limit="+maxtrendingResult+"&rating=PG-13&offset="+offset+"&lang=en")
        .then(respuesta => respuesta.json())
        .then((dato) => dato);
      
    if(limpiarTrending){
        img_trending.innerHTML = ' ';
        limpiarTrending=false;
    }

    resultado.data.forEach((element, index) => {
        img_trending.innerHTML +=` 
            <div class="frmImgsTrending" id="frmImgsTrending"  onmouseover="yesTitle()" onmouseleave="noTitle()">
                <img class="img_trending1" id="${element['id']}" "alt="${element['title']}" src="${element['images'].downsized_large.url}">
                <div class="frmTrendingTitle" id"frmTrendingTitle" onmouseover="event.stopPropagation()" >
                    <p class="trendingTitle" >${splitSlug(element['slug']).trim()}</p>
                </div>
            </div>
                 `;
    });
}
function fromLinkToInput(){
    txtSearch.value = event.toElement.innerText;
    strBusqueda = txtSearch.value;
    showSearch();
    searchedList.style.display='none';
}
function myGuifos(){
    sectionTrending[0].hidden=true;
    sectionSearchs[0].hidden = true;
    sectionSuggestions[0].hidden = true;
    sectionMySearchs[0].hidden=true;
    sectionMyGuifos[0].hidden=false
}
async function searchRandom(){
    searchedList.style.display='none';
    strBusqueda = txtSearch.value.replace("#","");
    
    let resultado = await fetch("https://api.giphy.com/v1/gifs/random?api_key=NzreMCTPOd9ZcGAzVKXEkG2zPoJnL0bW&tag=&rating=G")
    .then(respuesta => respuesta.json())
    .then((dato) => dato);

    return resultado;
}
async function searchGifos(){
    strBusqueda = txtSearch.value.replace("#",'');

    let resultado = await fetch("https://api.giphy.com/v1/gifs/search?api_key=M2w3WvZMLnWs5ra5f7CsLTKJEwaGWD1O&q="+strBusqueda+"&limit="+maxSearchedResult+"&offset=0&rating=G&lang=en")
    .then(respuesta => respuesta.json())
    .then((dato) => dato);    
    return resultado;

}
function showMore(){
    txtSearch.value=event.target.dataset.more;
    showSearch();
}
async function showSearch() {

    sectionSearchs[0].hidden = false;
    sectionSuggestions[0].hidden = true;
    sectionTrending[0].hidden=true;
    sectionMySearchs[0].hidden=false;

    let resultado=searchGifos();

    resultado.then(res => {
        if (res.data.length!==0){
            img_mySearchs.innerHTML = '';
            tituloMySearchs.innerText = "Tu Búsqueda: "+strBusqueda;
            res.data.forEach(element => {
            img_mySearchs.innerHTML +=` 
                          <div class="imgFrameSearch">
                              <div class="imgFrameSearchTitle">
                                  <p class="titleSearchs">${element['title']}</p>
                              </div>
                              <img class="imgSearchs1" id="${element['id']}" alt="${element['slug']}" src="${element['images'].downsized_large.url}">
                          </div>
                          `;
            txtSearch.value='';                
            });
        }else{
            img_mySearchs.innerHTML = '';
            tituloMySearchs.innerText = " No se encontraron datos para la busqueda: "+strBusqueda;
        }
    });
}
function yesTitle(){
    event.toElement.nextElementSibling.style.display="block";
}
function noTitle(){
    event.target.lastElementChild.style.display="none";
}
function splitSlug(strSlug){
    strfinal='';
    strSlug.split("-").forEach(element => strfinal+="#"+element+" ");
    return strfinal;
}
window.onscroll = function (){
    var scroll = document.documentElement.scrollTop || document.body.scrollTop;
    if(scroll > maxHeight){
        trending();
        maxHeight=maxHeight+1700;
        offset=offset+30;
    }
}

function insertMyGifos(){
    myGuifosFrame.innerHTML='';
    arrMyGifos.forEach(element =>{
        myGuifosFrame.innerHTML +=` 
                            <div class="gifs">
                                <iframe class="imgMyGuifos1" id="imgSearchs01" alt="loading img" src="${gifoUrl+element}"></iframe>
                            div>
                          `;
    });
}
insertMyGifos();