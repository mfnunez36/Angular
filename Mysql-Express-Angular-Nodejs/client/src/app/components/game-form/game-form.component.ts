import { Component, OnInit, HostBinding } from '@angular/core';
import { IJuego } from 'src/app/models/game';
import { GamesService } from 'src/app/services/games.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-game-form',
  templateUrl:  './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {
  game: IJuego = {
    id: 0,
    title: '',
    description: '',
    img: '',
    createdAt: new Date()
  };

  edit: boolean = false;

  constructor(
    private gameService: GamesService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ) { }

  @HostBinding('class') classes = 'row';
  
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if(params.id){
      this.gameService.getById(params.id).subscribe(
        res => { 
          this.game = res; 
          this.edit = true; 
        },
        err => {  console.log("Error :", err); }
      );
    }
  }

  create(){
    delete this.game.id;
    delete this.game.createdAt;
    this.gameService.agregar(this.game)
    .subscribe(
      res => { 
        console.log("Se agrego correctamente.");
        this.router.navigate(['/games']);
      },
      err => { console.log("Error ", err) }
    );
  }

  update(){
    delete this.game.createdAt;
    
    this.gameService.actualizar(this.game.id, this.game)
    .subscribe(
      res => { 
        this.router.navigate(['/games']);
        console.log("Se actualizo correctamente.");
      },
      err => { console.log("Error ", err) }
    );
  }

}
