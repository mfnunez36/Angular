function activar( quien:string, objeto:string = "batiseñal" ){
    let mensaje = `${ quien } activo la ${ objeto }`; 
    console.log(mensaje);
}
activar("Gordo");



//Declaracion de parametros opcionales

//function(variable:tipodedato: -> esto permite que el parametro sea obligatorio  
//         variable:tipodedato=valor   ->  esto permite que un paramertro sea opcional pero con un valor por defecto.
//         variable?:tipodedato  -> esto permite que el parametro sea opcional)
//{}



//Funciones de flecha sirven para no perder el contexto dentro de un objeto 

//let normal1 = function( a:tipodedato ){ 
//    return a; 
//};
//let flecha1 = ( a:tipodedato ) => a;

//let normal2 = function( a:tipodedato, b:tipodedato ){
//    return a + b;
//};
//let flecha2 = ( a:tipodedato, b:tipodedato ) => a + b;





//Desestructuracion de objetos

let avenger = {
    nombre: "ironman",
    poder: "traje"
}

let{ nombre, poder } = avenger;
console.log( nombre, poder );

let avenger2:string[] = ["thor", "steve", "Tony"];
let [ thor, capi, ironman ] = avenger2;
//para acceder a pasiciones se debe separar en , ejemplo: let[, , , ironman] = avenger;
//consoel.log(ironman);





//Promesas se ejecutan cuando una tarea asincrona es terminada

let promesa1 = new Promise( function( resolve, reject ){
    
    setTimeout( () => {
        console.log("Promesa terminada");

        //Terminada Bien
        resolve();

        //Terminada Mal 
        //reject();
    }, 1500);
});

//Cuando se ejecuta la promesa el then recibe 2 funciones resolve y el reject
promesa1.then(
    //resolve
    function(){
    console.log("Ejecuta cuando esta todo bien");
},
//reject
function(){
console.error("Error en la promesa");
});


Interpolacion :  {{ variable }}

Los Modulos permiten llamar en una sola carga todos los archivos que se utilizaran en la pagina web 
Componentes: Partes de la pagina
Directivas Estructurales: *ngif: condiciones  y *ngfor iteracion
Depurar Angular React y Ionic www.StackBlitz.com
package.json : se crea de forma automatica y dice cuales son las dependencias que encesita angular para la aplicacion
tsLint  : detecta los problemas que tiene nuestro codigo
tsconfig.json : le dice a typescript a que estandar necesitamos trabajar la aplicacion.
los archivos de tipo .spec.ts
polyfills.ts : archivo ayuda a la compatibilidad entre navegadores web antiguos.




