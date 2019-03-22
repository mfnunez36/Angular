import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class SpotifyService {

  constructor( private http: HttpClient ) { }

  getQuery(query: string) {

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDkb709oaO0QA9Nm6LCpItGNCbtZEH2DYMjX4kLvzAGTqmuIBUohTkKhlHc1Ujn_c1evZptChCuyrqNXyM'
    });

    return this.http.get(url, { headers });

  }

  getNewReleases() {

    return this.getQuery('browse/new-releases')
      .pipe(map( data => data['albums'].items));
  }
  
  getArtistas( artista: string ) {

    return this.getQuery(`search?q=${ artista }&type=artist`)
      .pipe( map(data => data['artists'].items ));
  }

  getArtista(id: string) {

    return this.getQuery(`artists/${ id }`);
  }

  getTopTracks(id: string) {

    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(map(data => data['tracks']));
  }
}
