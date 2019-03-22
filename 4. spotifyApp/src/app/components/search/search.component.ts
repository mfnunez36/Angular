import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent{

  artistas:any[] = [];
  loading: boolean;

  constructor(private spotifyService: SpotifyService) { }

  Buscar( artista:string )
  {
    if (!artista) {

      this.loading = false;
      this.artistas = [];

    } else {

      this.loading = true;

      this.spotifyService.getArtistas(artista)
        .subscribe((data: any) => {
          this.artistas = data;
          this.loading = false;
        });
    }

    
  }

}
