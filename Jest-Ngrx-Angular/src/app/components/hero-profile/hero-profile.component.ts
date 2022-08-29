import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Location } from '@angular/common';
import { Heroe } from '../../classes/Heroe';
@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.css']
})
export class HeroProfileComponent implements OnInit {
  @ViewChild('modal') modal: { toggle_modal: () => void; } | any;

  public id: number | any;
  public heroe: Heroe | any;
  public question_modal: string | any;
  public team:string = "";

  constructor(
    private route: ActivatedRoute,
    private heroesService: HeroesService,
    private _location: Location
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getHeroe();
  }

  getHeroe() {
    this.heroesService.getHeroe(this.id).subscribe((data: any) => {
      const temp = data.data.results[0];

      this.heroe = new Heroe(
        temp.id,
        temp.name,
        temp.description,
        temp. modified,
        temp.thumbnail,
        temp.resourceURI,
        this.heroesService.getTeamColor(temp.id)
      );

      this.team = this.heroe.teamColor;
      return this.heroe;
    });
  }

  goBack() {
    this._location.back();
  }

  launchModal():void{
    this.question_modal="¿En cual grupo quieres colocar a tu súper héroe?";
    this.modal.toggle_modal();
  }

  getTeam(team: any):void{
    this.team = team;
    this.heroesService.teams.set(this.heroe.id, this.team);
  }

}
