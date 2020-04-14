let btntxt=document.getElementById('txtInput');

btntxt.addEventListener('keyup', clis);

function clis(){
  console.log(btntxt.value);
}