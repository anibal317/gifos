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

const maxSuggestedResult=4;
let strBusqueda='';

let sectionSearchs=document.getElementsByClassName('searchs');
let sectionSuggestions=document.getElementsByClassName('suggestions');
let sectionTrending=document.getElementsByClassName('trending');
let sectionMySearchs=document.getElementsByClassName('mySearchs');

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
        if(res.data.length!=0){
            searchedList.style.display='block';

            suggestedList.innerHTML=`
                    <div class="suggestedItem" id="item1" onclick="fromLinToInput()"><a href="#" onclick="showSearch()" class="lnk" id="${res.data[0].id}">${res.data[0].title}</a></div>
                    <div class="suggestedItem" id="item1" onclick="fromLinToInput()"><a href="#" onclick="showSearch()" class="lnk" id="${res.data[1].id}">${res.data[1].title}</a></div>
                    <div class="suggestedItem" id="item1" onclick="fromLinToInput()"><a href="#" onclick="showSearch()" class="lnk" id="${res.data[2].id}">${res.data[2].title}</a></div>
                `;
        }else{
            suggestedList.innerHTML=`
                    <div class="suggestedItem" id="item1"><a href="#" class="lnk" id="1">No se encontraron resultados</a></div>`;
        }
    });
        if(strBusqueda===''){
            searchedList.style.display='none';
        }
    
}
async function suggest() {
    let resultado = await fetch("https://api.giphy.com/v1/gifs/trending?api_key=NzreMCTPOd9ZcGAzVKXEkG2zPoJnL0bW&limit="+maxSuggestedResult+"&rating=G&lang=es")
      .then(respuesta => respuesta.json())
      .then((dato) => dato);
      
    img_suggest.innerHTML = ' ';
      
    resultado.data.forEach((element, index) => {
    img_suggest.innerHTML +=` 
                        <div class="imgFrame">
                            <div class="imgframeTitle">
                                <p class="title">${element['title']}</p>
                                <button class="btn-Close" id="btn-Close"><img src="./assets/close.svg" alt=""></button>
                            </div>
                            <img class="img_daily1" id="${element['id']}" alt="loading img" src="${element['images'].downsized_large.url}">
                        </div>
                        `;
    });
} 
async function trending() {
    let resultado = await fetch("https://api.giphy.com/v1/gifs/trending?api_key=M2w3WvZMLnWs5ra5f7CsLTKJEwaGWD1O&limit=24&rating=PG-13&offset=5&lang=en")
        .then(respuesta => respuesta.json())
        .then((dato) => dato);
      
    img_trending.innerHTML = ' ';
      
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
function fromLinToInput(){
    txtSearch.value=event.toElement.innerText;
    strBusqueda=txtSearch.value;
}
async function searchGifos(){
    searchedList.style.display='none';
    strBusqueda = txtSearch.value;
    
    let resultado = await fetch("https://api.giphy.com/v1/gifs/search?api_key=M2w3WvZMLnWs5ra5f7CsLTKJEwaGWD1O&q="+strBusqueda+"&limit=12&offset=0&rating=G&lang=en")
    .then(respuesta => respuesta.json())
    .then((dato) => dato);

    return resultado;
}

async function showSearch() {
    sectionSearchs[0].hidden = false;
    sectionSuggestions[0].hidden = true;
    sectionTrending[0].hidden=true;
    sectionMySearchs[0].hidden=false;
    
    

    let resultado=searchGifos();

    resultado.then(res => {
        if (res.data.length!==0){
            img_mySearchs.innerHTML = ' ';
            tituloMySearchs.innerText += " "+strBusqueda;
            res.data.forEach(element => {
            img_mySearchs.innerHTML +=` 
                          <div class="imgFrameSearch">
                              <div class="imgFrameSearchTitle">
                                  <p class="titleSearchs">${element['title']}</p>
                              </div>
                              <img class="imgSearchs1" id="${element['id']}" alt="loading img" src="${element['images'].downsized_large.url}">
                          </div>
                          `;
            txtSearch.value="";    
            });
        }else{
            img_mySearchs.innerHTML = ' ';
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
