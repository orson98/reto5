'use strick';

const documentReady = () => {
    const colaBurro = document.getElementById('colaBurro');
    
    const quesemuevalaCOLA = () => {
        colaBurro.style.position='absolute';
        colaBurro.style.top=(Math.random() * window.innerHeight)+ 'px';
        colaBurro.style.left=(Math.random() * window.innerWidth)+ 'px';
    };
    const welcome = prompt(' dime tu nombre' ) ;
    bienvenidoB.innerHTML += welcome +  '😁' ;
     

    colaBurro.addEventListener('mouseover',quesemuevalaCOLA);
};

document.addEventListener('DOMContentLoaded',documentReady);

 