# Ngrx 
Es un manejador de estados que utiliza rjsx y redux con su patron de arquitectura.

# Ngrx Store
Este modulo sirbe para el control global del estado de la aplicacion 

Permite la lectura del estado actual por medio de `getState()`

permite crear un nuevo estado con el metodo `dispatch(Action)` y notifica los cambios por medio de `subscribe()`

# conceptos baiscos

**Actions** Son los eventos que ocurren en cada componente y sevicio
tiene 2 propiedades `type`: describe que es lo que se hara y `payload`: (es opcional) es la informacion para relizar una accion

**Reducers** Son funciones que manejan los cambios de estado (toman el estado actual y la ultima accion para entregar un nuevo estado)

tiene 2 argumentos `oldState`: es el estado actual de la aplicacion y `action`: es el objeto que indica lo que se hara o cambiara.

retorna el nuevo estado despues de completar las tareas.

**Selectors** Son funciones que se utilizan para seleccionar, derivar y componer las piezas de estado con los selectores podemos obtener la informacion del store o parte de el 

**State** Es el valor actual de la informacion de la aplicacion

el `state` es de solo lectura. 

# Instalacion Ngrx Store 

`ng add @ngrx/store@latest` esto intalara el store y nos actualizara el `app.module.ts` e importara el `StoreModule.forRoot({})` 


# Instalacion Ngrx DevTools 

`ng add @ngrx/store-devtools@latest` esto instalara las herramientas de desarrollo que nos permiten ver lo que ocurre con el store. Esto intalara el paquete y nos actualizara el `app.module.ts` e importara el `StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })`


Ademas se debe instalar una herramienta opcional en el navegador para poder hacer el seguimiento de los cambios de estado. Esta Herramienta es `ReduxDevTools` que se encuentra en el siguiente enlace: [ReduxDevTools Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=es) 

# Implementacion Ejemplo

## Estructura 


Lo primero es crear nuestra estructura de store para ello crearemos en ***`src/app`*** una carpeta que llamaremos `state` y otra que llamaremos `models`

luego dentro de ***`src/app/state`*** crearemos 3 carpetas mas, que llamaremos `actions`, `reducers` y `selectors` respectivamente

luego dentro de ***`src/app/models`*** crearemos una interface de Heroe con el nomnbre `heroe.interface.ts` y completaremos de la siguiente manera: 

```

export interface HeroeModel {
  id: string;
  name: string;
  description: string;
  modified: Date;
  thumbnail: Object;
  resourceURI: string;
  teamColor: string
}

```

## Action 

Dentro de ***`src/app/state/actions`*** Crearemos un archivo con el nombre `heroes.actions.ts` y completaremos de la siguiente manera: 

```

import { createAction, props } from "@ngrx/store"; 
import { HeroeModel } from "src/app/models/heroe.interface";

export const GETHEROES = '[Heroes] Listar Heroes';

export const GetHeroesAction = createAction(
  GETHEROES, props<{ listHeroes: HeroeModel[] }>()
);

```

importamos `{ createAction, props }` de @ngrx/store y tambien `{ HeroeModel }`

creamos un nombre de accion como constante que se exporta que llamaremos `GETHEROES` para no tener errores de tipeo cuando se utiliza o se llama dicha action

creamos una action con el metodo createAction este recibe nombre de action de tipo string y props<any> (props es opcional)

la accion `GetHeroesAction` representara la accion de listar heroes en la aplicacion por ello utilizamos las props que son las que esperan el tipo de dato `HeroeModel[]` cuando se realize dicha accion

## Reducer

Para poder utilizar un reducer primero debemos crear un estado inicial de aplicacion o de lo que queremos manejar desde el store. En este caso debemos tener un estado inicial de heroe. 

Para crear nuestro estado inicial de Heroe modificaremos la interface de heroe que creamos anteriormente.

dentro de `heroe.interface.ts` modificaremos agregando una interface HeroeState la cual crearemos con una propiedad list de la siguiente manera: 

```
...

export interface HeroeState {
  listHeroes: ReadonlyArray<HeroeModel>;
}

```

Se utiliza ReadonlyArray<HeroeModel> ya que el estado es de solo lectura y con esto ya tenemos nuestro estado inicial de heroe

luego vamos a la carpeta ***`src/app/state/reducers`*** y creamos un archivo de nombre `heroe.reducer.ts` y el cual completaremos de la siguiente manera: 

```

import { createReducer, on } from "@ngrx/store";
import { HeroeState } from "../../models/heroe.interface";
import { GetHeroesAction } from "../actions/heroes.actions";

export const initialState: HeroeState = { listHeroes: [] }

export const heroeReducer = createReducer(
  initialState,// al crear el reducer este recibe el estado inicial
  //con on() ejecutamos una action responde el estado anterior y el final
  on(GetHeroesAction, (state, { listHeroes }) => {
    return { ...state, listHeroes: listHeroes };
  })
);

```

importamos `{ createReducer }` desde el @ngrx/store, tambien debemos traer a `{ HeroeState }` y por ultimo la Action `{ GetHeroesAction }`. creamos una constante initialState que representa el estado inicial de nuestro estado de `HeroeState` e inicializamos nuestra propiedad en vacio []. 

luego creamos un reducer que le llamaremos `heroeReducer` el cual recibira el initialState que es el estado actual que tiene el `HeroeState` y recibe y ejecutara la funcion `on()` la cual recibe la accion a ejecutar y manejara el estado actual de esa accion que actualiza la lista de heroes del `HeroesState` mediante el `AppState`




## configurar app.module.ts para la implementacion de Reducers creados

Ahora con ese estado inicial podemos crear un `ActionReducerMap` el cual permitira mapear los diferentes reducers de la aplicacion para no tener que estar configurando el `app.module.ts` cada vez que se crea un nuevo reducer. 

para esto nos posicionamos en la carpeta `src/app/state` y crearemos un nuevo archivo que llamaremos `app.state.ts` y completaremos de la siguiente manera: 

```

import { ActionReducerMap } from '@ngrx/store';
import { HeroeState } from '../models/heroe.interface';
import { heroeReducer } from './reducers/heroes.reducer';

export interface AppState {
  listHeroes: HeroeState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  listHeroes: heroeReducer
}

```

para crear un `ActionReducerMap` que contendra todos nuestros reducer de la aplicacion lo importamos desde @ngrx/store esta interface, e importamos el `HeroeState` de nuestra interface `heroe.interface.ts` y por ultimo importamos el `heroeReducer`.

creamos una interface dentro del archivo `app.state.ts` de nombre `AppState` que realiza la implementacion o que representa a cada uno de los cambios o cada action que se hara en el store. Representa el estado completo de la aplicacion y puede ser completada con cada uno de los estados que requiramos o que necesitemos manejar.

luego se crea una constante export de nombre `ROOT_REDUCER` el cual representa todos los reducer mapeados para su implementacion mas rapida y para no modificar el `app.module.ts` cada ves que creamos un nuevo reducer.


para ello implementamos esta constante `ROOT_REDUCER` en el `app.module.ts`, esto hara que la aplicacion tome la implementacion de store y reducers y actiones dentro de nuestra aplicacion el `app.module.ts` quedaria de la siguiente manera: 

```
... 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(ROOT_REDUCERS), // agregar aqui el ROOT_REDUCER para implementar los reducers que se creen
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

...

```

creamos una constante `ROOT_REDUCER` que sera la representacion de todos los reducer que creemos en base a nuestras necesidades. Para este caso en particular listaremos heroes y guardaremos esa lista en el store. Utilizaremos el `AppState` que es el estado global de todo lo que cambiara en la aplicacion por lo que se crea esta interface `AppState`, para indicarle que guardara en el store una lista de heroes que pertenece a la lista de heroes del estado del `HeroeState` que creamos.

Esto se reprenseta o explica de la siguiente forma: 

creamos el estado global `AppState` y le indicamos que tiene una parte del store que es listarheroes y que esta lista proviene de la implementacion de la interface de `HeroeState` que contiene una lista de heroes como propiedad, esa propiedad del `HeroeState` es de solo lectura y representa el estado que tendra al momento de ser ejecutada la accion `GetHeroesAction`. Al momento de ejecutar dicha accion, esta llamara al reducer y actualizara el estado de la lista en base a lo que recibe desde un `store.dispach()` esta accion recibira una lista de heroes ya que espera en como parametros el nombre de la action y una lista de Heroes en sus props. 

En este caso recibiremos la lista de heroes desde nuestro servicio ya que utilizamos el `store.dispach()` y por ello se le asigna este arreglo de Heroes[] a la listHeroes de la action. esta accion utilizara el reducer creado y actualizara el estado de AppState y de HeroeState con el ultimo cambio de listaHeroes y retornara el estado final de la listaHeroes hacia dichos estados de la aplicacion y se guarda el estado completo en el store;

## Ejecutar Action y cargar lista de Heroes 

primero debemos ir al archivo `heroe.service.ts` el cual deberemos modificar para ejecutar una accion. Lo modificaremos de la siguiente forma

```
import { Store } from '@ngrx/store';
...

constructor(private http: HttpClient, private store: Store<any>) {
}


```


primero es importar el `{ Store }` de @ngrx/store y debemos injectarlo en nuestro componente desde el constructor como hacemos con servicios y modulos y otras importaciones que utilizamos normalmente en angular.

tambien debemos importar la accion `{ GetHeroesAction }` que ejecutaremos al momento de obtener los datos de Heroes.


injectamos el store en el constructor y le indicamos que no representa ningun statado de la aplicacion solo es parte de la ejecucion del store por ende le indicamos que es de tipo `Store<Any>` (solo para que no entregue un error de injeccion o error de tipado)

ahora es el momento de utilizar nuestro store para despachar una accion en particular en este caso de ejemplo haremos el dispatch `GetHeroesAction` una ves se carguen los heroes y tengamos el arreglo con la lista completa de heroes. 

modificamos el `heroes.service.ts` metodo `getHeroes(nameStartsWith?: string, page?: number)` y agregamos el dispatch al momento de obtener los datos de la api y le enviamos los heroes obtenidos y guardados en un array. 

```
...
this.store.dispatch(GetHeroesAction({ listHeroes: arr }));

this.heroes = arr;
...

```

con esto ya creamos una lista de heroes que esta guardada en el map de ActionReducerMap ahora solo nos falta modificar el `app.module.ts` y agregar nuestros map de reducers en `StoreModule.forRoot(ROOT_REDUCERS)`, y con esto ya estaremos implementando completamente el reducer y actualizando el store que creamos el cual solo estara guardando la lista de heroes que se llama listaheroes.

y esto mostrara en la herramienta `ReduxDevTools` de chrome todas las acciones que han sido llamadas y tambien mostrara el estado de la lista caragada por medio de las props de la action por otra parte tambien se podra ver el state de listado de heroes pero aun no se utiliza el stado actual de la listaheroes ya que nos falta crear un selector que nos permita acceder a dicha propiedad del store y con ello poder listar en nuestro componente `ListadoDeHeroesComponent` para cargar la data sin volver a llamar al servicio de listado de heroes.
 

## Selectors

para poder utilizar el estado de la aplicacion en un momento dado se utilizan los `Selectors` que son funciones que pueden utilizar el store ya sea globalmente o se permite que se seleccione siertos valores del store.
para ello crearemos un selector que nos permita acceder al estado de la lista de heroes creada anteriormente.
iremos a la carpeta ***`src/app/state/selectors/`*** y crearemos un nuevo archivo llamado `heroe.selectors.ts`, el cual completaremos de la siguiente manera: 

```

import { createSelector } from "@ngrx/store";
import { HeroeState } from "src/app/models/heroe.interface";
import { AppState } from "../app.state";

export const listHeroesFeature = (state: AppState) => state.listHeroes;

export const ListaHeroesSelector = createSelector(
  listHeroesFeature,
  (state: HeroeState) => state.listHeroes
);


```

importamos de @ngrx/store el modulo `{ createSelector }`, tambien debemos importar a `{ HeroeState }` y el `{AppState}` 

luego creamos nuestro selector ListHeroesSelector() y este recibe el feature que es el estado global de la aplicacion pero en este caso solo seleccionamos la lista de heroes. y retorna el nuevo estado de la lista de heroes del `HeroeState`.

luego podemos llamar al stado global para obtener la lista para ello iremos al componente `listado-de-heroes` e importaremos el selector que creamos `{ ListaHeroesSelector }` y el store `{ Store }` e injectaremos en el constructor el store: 


```
import { Store } from '@ngrx/store';
...
constructor(public heroesService: HeroesService, private router:Router, private store: Store<AppState>) {
}

```

como podemos ver en la injeccion del Store le estamos diciendo que es un store de tipo global <AppState>. Por lo tanto ya podemos acceder al store por medio de nuestro selector, para ello en el ngOninit() ocuparemos el `store.select()` el cual nos permite ejecutar un selector y traer los datos. nos crearemos una variable de tipo `Observable<any>` llamada `listheroes$` la cual setearemos con el valor del observable que nos devuelve la ejecucion de nuestro selector quedando de la siguiente manera: 


```
...
listheroes$: Observable<any> = new Observable();
 ...

ngOnInit(): void {
  // ejecutamos la carga de heroes para que sea despachado un nuevo estado de listaheroes
  this.heroesService.getHeroes(); 

  this.listheroes$ = this.store.select(ListaHeroesSelector);
}

```

al utilizar este selector este traera del state global la listadeheroes y se asignara a un observable el cual ya podemos utilizar para listar los heroes. iremos al archivo `listado-de-heroes.html` y cambiaremos heroesservice.heroes por nuestra lista de heroes y agregamos el pipe async para esperar la respuesta del observable y poder mostrar los heroes desde el store y no desde el servicio quedaria de la siguiente manera:

```
...
<div *ngFor="let heroe of listheroes$ | async" class="col-xs-12 col-sm-6 col-md-3">
...

```


y con esto ya podemos ver los heroes cargados desde el store y tambien podemos verificar con las herramientas de `ReduxDevTools` las acciones y el state.


Saludos.
