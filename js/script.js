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
let img_suggest=document.getElementById('img_suggest');
let btn_misGifos=document.getElementById('btn_misGifos');
let maxSuggestedResult=4;

/*Creo eventos listener*/
btnThemDay.addEventListener('click', toDayTheme);
btnThemNight.addEventListener('click', toNightTheme);
btnChooseThem.addEventListener('click', chooseThem);
dropdownContent.addEventListener('mouseleave', hideChooseThem);
btn_search.addEventListener('click', searhGifOs);
dayBox.addEventListener('click', toDayTheme);
nightBox.addEventListener('click', toNightTheme);
/*btn_misGifos.addEventListener('click',trending);*/

trending();

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

async function trending() {
    let resultado = await fetch("https://api.giphy.com/v1/gifs/trending?api_key=M2w3WvZMLnWs5ra5f7CsLTKJEwaGWD1O&limit="+maxSuggestedResult+"&rating=G")
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
        //<img class="img_daily_" id="${element['id']}" alt="load${element['title']}ing img" src="${element['images'].original.url}">
    });
  }

  
  