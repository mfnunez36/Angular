import { Component, OnInit, HostBinding } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { IJuego } from 'src/app/models/game';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  games: any = [];
  constructor(private gamesService: GamesService) { this.getGames(); }

  ngOnInit(): void {
    
  }

  getGames(){
    this.gamesService.listar().subscribe(
      res => {
        this.games = res;
      },
      err => { console.log("Error: ", err); }
    );
  }

  delete(id: string){
    this.gamesService.eliminar(id).subscribe(
      res => { 
        this.getGames();
        console.log("Eliminarción correcta: ", res) },
      err => { console.log("Error al eliminar: ", err) }
    );
  }
}
