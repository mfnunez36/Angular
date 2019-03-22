import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html'
})
export class ArtistaComponent {

  loading: boolean;
  artista: any = {};
  tracks: any[] = [];
  
  constructor(private router: ActivatedRoute, private spotifyservice: SpotifyService) {
    this.router.params.subscribe(params => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  getArtista(id: string) {

    this.loading = true;

    if (!id) {

      this.loading = false;
      this.artista = {};

    } else {

      this.loading = true;
      this.spotifyservice.getArtista(id)
        .subscribe(data => {
          this.artista = data;
          this.loading = false;
        });
    }
    
  }

  getTopTracks(id:string) {
    this.spotifyservice.getTopTracks(id)
      .subscribe(data => { this.tracks = data; console.log(data) });
  }

}
