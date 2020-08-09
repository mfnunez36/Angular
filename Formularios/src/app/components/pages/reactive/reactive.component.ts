import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  // identificador de formulario o referencia de formulario pero del componente y no en el form
  form: FormGroup;

  constructor( private formBuilder: FormBuilder ) {
    // ejecutamos la creacion del formulario antes de que cargue el HTML
    this.crearform();
    //this.cargarData();
  }

  ngOnInit() {
  }

  // creando un getter podemos hacer evaluaciones a nuestros controles de formulario
  get validaNombre(){
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get validaApellido(){
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }

  get validaEmail(){
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get validaCiudad(){
    return this.form.get('direccion.ciudad').invalid && this.form.get('direccion.ciudad').touched;
  }

  get validaProvincia(){
    return this.form.get('direccion.provincia').invalid && this.form.get('direccion.provincia').touched;
  }

  get hobbies(){
    return this.form.get('hobbies') as FormArray;
  }



  // crear grupo de controles de formulario y sus validaciones.
  crearform() {
    // form group crea objetos de controles de formulario y estos a su vez pueden ser anidados con nuevos grupos de controles
    this.form = this.formBuilder.group({
      // dentro de los [] recibe 3 argumentos ['valorpordefecto','validadores sincronos','validadores asincronos']
      // los validadores sincronos son todos aquellos que se pueden hacer inmediatamente o se ejecutan en el mismo hilo de tiempo
      // como ej.: required, minlength, maxlength, pattern (que sirbe para regex ) etc..
      nombre  : ['', [ Validators.required, Validators.minLength(5) ] ],
      apellido: ['', [ Validators.required, Validators.minLength(5) ] ],
      email   : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ] ],
      // direccion es un nuevo grupo de controles de formBuilder por lo que se pueden anidar
      direccion: this.formBuilder.group({
        ciudad: ['', [ Validators.required, Validators.minLength(5) ] ],
        provincia: ['', [ Validators.required, Validators.minLength(5) ] ]
      }),
      //tambien tenemos arreglos
      hobbies: this.formBuilder.array([])
    });
  }

  // esto realiza la validacion del formulario
  guardar() {
    if( this.form.invalid ){
      //con Object.values podemos obtener todos los controles del formulario y al recorrerlo
      //marcamos como touched los controles para que al enviar el formulario este realice las validaciones de los campos
      return Object.values( this.form.controls ).forEach( control => {
        if( control instanceof FormGroup ){
          // cuando tenemos formgroups anidados podemos recorrerlos tambien para poder manejar los controles
          Object.values( control.controls ).forEach( controlAnidado => {
            // marcamos como touched para validar el campo al momento de hacer submit en base a las validaciones que tenemos
            controlAnidado.markAsTouched();
          });
        }else{
          // marcamos como touched para validar el campo al momento de hacer submit en base a las validaciones que tenemos
          control.markAllAsTouched();
        }
      });
    }
  }

  //cargar datos al formulario
  cargarData(){
    // con esto se puede enviar data a los controles del formulario pero no puede faltar ningun campo de dicho formulario
    this.form.setValue({
      nombre: "Max Prueba",
      apellido: "",
      email: "",
      direccion: {
        ciudad: "",
        provincia: ""
      },
      hobbies: []
    });
  }

  //Limpiar datos del formulario
  limpiarData(){
    // con esto se puede resetear todos los controles del formulario y permite que falten campos de dicho formulario
    this.form.reset({
      nombre: "",
      apellido: "",
      email: "",
      direccion: {
        ciudad: "",
        provincia: ""
      }
    });
  }

  // Aqui agregamos inputs a la tabla
  agregarHobby(){
    // agregamos un control y su validacion con el formBuilder
    this.hobbies.push( this.formBuilder.control( '', Validators.required ));
  }

  // para borrar un elemento del arreglo por la posicion i del arreglo hobbies utilizamos removeAt y recibe el indice
  borrarHobby( i: number ){
    this.hobbies.removeAt( i );
  }




}
