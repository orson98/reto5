'use strick';
const documentReady =()=> {
    
    const form =document.getElementById('formCalculadora');
    
    
    const calcular=(e)=> {
        e.preventDefault(); 
        
        const numero1 =parseInt(document.getElementById('numero1').value);
        const numero2 =parseInt(document.getElementById('numero2').value);
        const numero3 =parseInt(document.getElementById('numero3').value);
        const numero4 =parseInt(document.getElementById('numero4').value); 
        const operador =document.getElementById('operador').value;
        
        const contenedorError =document.getElementById('contenedorError');
        const contenedorResultado= document.getElementById('contenedorResultado')

         if (isNaN(numero1) || isNaN(numero2) ) {
         contenedorError.innerHTML = ('completar el formulario ');
       
        }
        else {
        contenedorError.innerHTML= ''; 

        let resultado = 0;
        contenedorError.innerHTML ='';
         switch (operador) {
      
             case 'promedio':
              resultado = (numero1 + numero2 + numero3 + numero4) / 4 ;
              break ;
              

          }
      
           
         contenedorResultado.innerHTML = resultado;

         if(resultado < 12 ){ 
            alert('lo siento mano jalaste')}
            else {
            alert('buenaaaa')}
      }

     
   
    };
    formCalculadora.addEventListener('submit', calcular);

 


         const colores = [ 'rojo','verde','amarillo','azul'];
         console.log(colores);
         colores.push('blanco');   
         console.log(colores);
         colores.unshift('negro');    
         console.log(colores);
         console.log(colores.pop());    
         console.log(colores);

}

document.addEventListener('DOMContentLoaded', documentReady);