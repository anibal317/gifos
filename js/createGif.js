let dd = 0; let ho = 0; let mn = 0; let sg = 0; let cs = 0;
     
let video = document.getElementById("vCamera");
let video1 = document.getElementById("vCamera1");
let form = new FormData();
let gifDone;
let objectUrl;
let gifoUrl="https://giphy.com/embed/";
let strTags='';

arrMyGifos=JSON.parse(localStorage.getItem('myGifos')) || [];


let btnCreateGifo=document.getElementsByClassName('btn_createGifo');
let btnDropdown=document.getElementsByClassName('dropdown');
let btnMisGifos=document.getElementsByClassName('btn_misGifos');
let btnCancelar=document.getElementById('btnCancelar');
let btnComenzar=document.getElementById('btnComenzar');
let btnCapturar=document.getElementById('btnCapturar');
let btnListo=document.getElementById('btnListo');
let btnSubirGuifo=document.getElementById('btnSubirGuifo');
let preViewGifo=document.getElementById('preView');
let btnRepetir=document.getElementById('btnRepetir');
let btnCancelarSubida=document.getElementById('btnCancelarSubida');
let bntCopyLink=document.getElementById('bntCopyLink');
let btnDownloadGif=document.getElementById('btnDownloadGif');
let btnReady=document.getElementById('btnReady');
let tags=document.getElementById('tags');
let txtTags=document.getElementById('txtTags');
let txtfinalUrl=document.getElementById('txtfinalUrl');
let message=document.getElementById('message');

let sectionMisGifos=document.getElementsByClassName('myGuifos');
let pag1=document.getElementsByClassName('frmPag1');
let pag2=document.getElementsByClassName('frmPag2');
let pag3=document.getElementsByClassName('frmPag3');
let pag4=document.getElementsByClassName('frmPag4');
let pag5=document.getElementsByClassName('frmPag5');
let pag6=document.getElementsByClassName('frmPag6');
let timerBox=document.getElementsByClassName('timer');

btnComenzar.addEventListener('click', pagina2);
btnCapturar.addEventListener('click', pagina3);
btnRepetir.addEventListener('click', repeat);
btnListo.addEventListener('click', pagina4);
btnSubirGuifo.addEventListener('click', pagina5);
btnCancelarSubida.addEventListener('click', ()=>{ location.reload();});
bntCopyLink.addEventListener('click', copylink);
btnDownloadGif.addEventListener('click', downlaodGif);
btnReady.addEventListener('click', toMygifos);

btnCreateGifo[0].hidden=true; 
btnDropdown[0].hidden=true; 
btnMisGifos[0].hidden=true; 
sectionMisGifos[0].hidden=false;

//Acciones para la página 1
pag1[0].hidden=false; 
pag2[0].hidden=true; 
pag3[0].hidden=true; 
pag4[0].hidden=true; 
pag5[0].hidden=true; 
pag6[0].hidden=true; 
timerBox[0].hidden=true;

//btnComenzar
function pagina2(){
    pag1[0].hidden=true;
    pag2[0].hidden=false;
    sectionMisGifos[0].hidden=true;
    getStreamAndRecord(video);

}
//btnCapturar
function pagina3(){
    pag2[0].hidden=true;
    pag3[0].hidden=false;
    timerBox[0].hidden=false;
    timer=window.setInterval(function(){
        if(cs==99){
            cs=0;
            sg++;
            if(sg==60){
                sg=0;
                mn++;
                if(mn==60){
                    mn=0;
                    ho++;
                    if(ho==23&&mn==59&&sg==59&&cs==99){
                        cs=0;
                        sg=0;
                        ho=0;
                        dd++;
                    }
                }
            }
        }   
        cs++;
        timerBox[0].innerText = (ho<10?"0"+ho:ho)+":"+(mn<10?"0"+mn:mn)+":"+(sg<10?"0"+sg:sg)+":"+(cs<10?"0"+cs:cs); 
    },10);
    function startVideoRecord() { 
        navigator.mediaDevices.getUserMedia({ // pide permisos al user para usar dispositivos
          audio: false,
          video: {
          height: { max: 480 }
          } 
          })
          .then(function(stream) { // si el user da permisos, acciona la cámara
          video1.srcObject = stream; //permite mostrar dentro del tag video lo que captura la cámara
          video1.play();
          recorder = RecordRTC(stream, { //se crea el objeto recorder de la librería 
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function() { 
             console.log('started')
           },
          }); 
          recorder.startRecording(); //comienza la grabación automáticamente
         })
    }
    startVideoRecord();
}
function repeat(){
    preViewGifo.src='';
    timerBox[0].innerText="00:00:00:00";
    dd = 0;
    ho = 0;
    mn = 0;
    sg = 0;
    cs = 0;
    form = new FormData();
    gifDone='';
    objectUrl='';

    pagina2();
}
//btnListo
function pagina4(){
    clearInterval(timer);
    pag3[0].hidden=true;
    pag4[0].hidden=false;
    stopRecord()
    video1.pause();
    function stopRecord() { 
        recorder.stopRecording(function(){ //para la grabación 
          gifDone = this.getBlob(); //genera el archivo gif blob
          objectUrl = this.toURL(); //guarda la url del gif para dsp mostrar en tag img como src
          form.append('file', gifDone, 'myGif.gif'); //arma el archivo q luego se envia al request POST
        })
    }
    console.log(URL.createObjectURL(form.get('file')));
    preViewGifo.src=URL.createObjectURL(form.get('file'));
}
//btnSubirGuifo
function pagina5(){
    pag4[0].hidden=true;
    timerBox[0].hidden=true;
    pag5[0].hidden=false;
    a=0;
    b=0;
    
    time=window.setInterval(function(){
        if(a==99){
            a=0;
            b++;
            if(b==3){
                b=0;
                clearInterval(time);
                btnCancelarSubida.disabled=true;
                txtTags.disable=true;
                strTags=txtTags.value;
                //Colocar metodo post a giphy
                postGif();
                pagina6();
            }
        }   
        a++;
    },10);
}
function pagina6(){
    pag5[0].hidden=true;
    timerBox[0].hidden=true;
    pag6[0].hidden=false;
}
function getStreamAndRecord (media) {  
    navigator.mediaDevices.getUserMedia({ 
        audio: false, 
        video: { 
        height: { max: 700 } 
      } 
    }) 
      .then(function(stream) { 
        media.srcObject = stream; 
       return media.play() ;
   })
 }
function postGif(){
    var formdata = new FormData();

    formdata.append("api_key", "M2w3WvZMLnWs5ra5f7CsLTKJEwaGWD1O");
    formdata.append("username", "jorgeanibalsardon");
    formdata.append("file", form.get('file')/*"https://gifsanimados.de/img-gifsanimados.de/l/los-simpson/los-simpson-lluvia.gif"*/);
    formdata.append(strTags);
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    fetch("https://upload.giphy.com/v1/gifs", requestOptions)
    .then(response => response.text())
    .then(result => addToMyGifosLsit(result.data.id))
    .catch(error => console.log('error', error));
}
function addToMyGifosLsit(id){
    objeto.push(id);
    console.table(objeto);
    localStorage.setItem("myGifos", JSON.stringify(objeto));
    console.table(JSON.parse(guardado));
}
function downlaodGif(){
    txtfinalUrl.value=gifoUrl+"-552da5rraAST$69";
}
function toMygifos(){
    window.location.href='index.html';
}
function copylink(){
    txtfinalUrl.select();
    try {
        var status = document.execCommand('copy');
        if(!status){
            message.innerText="No se pudo copiar el link";
        }else{
            message.innerText="El link fue copiado con éxito";
        }
    } catch (err) {
    }
}