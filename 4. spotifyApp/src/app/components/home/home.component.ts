import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  canciones:any[] = [];
  loading: boolean;
  error: boolean;
  mensaje: string;

  constructor(private spotifyServices: SpotifyService){

    this.loading = true;

    this.spotifyServices.getNewReleases()
      .subscribe((data: any) => {

        this.canciones = data;
        this.loading = false;

      }, (errorService) => {

        this.loading = false;
        this.error = true;        
        this.mensaje = errorService.error.error.message;

      });
  }
}
