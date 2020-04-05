let imgDOM=document.getElementById('img');
let btn=document.getElementById('btn');

btn.addEventListener('click', trending);



async function trending() {
    let resultado = await fetch("https://api.giphy.com/v1/gifs/trending?api_key=M2w3WvZMLnWs5ra5f7CsLTKJEwaGWD1O&limit=2&rating=G")
      .then(respuesta => respuesta.json())
      .then((dato) => dato);
      
      imgDOM.innerHTML = ' ';
      
    resultado.data.forEach((element, index) => {
        imgDOM.innerHTML +=`<div class="text" id="${element['id']}" alt="${element['title']}"><img src="${element['images'].downsized_large.url}"></div>`;
    });
  }

