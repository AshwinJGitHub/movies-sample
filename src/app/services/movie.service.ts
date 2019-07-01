import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { stringify } from '@angular/core/src/util';

export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode'
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  url = 'http://www.omdbapi.com/';
  apiKey = 'd2e5a006';

  constructor(private http: HttpClient) { 
     
  }
  /**
  * Get data from the OmdbApi 
  * map the result to return only the results that we need
  * 
  * @param {string} title Search Term
  * @param {SearchType} type movie, series, episode or empty
  * @returns Observable with the search results
  */
 searchData(title: string, type: SearchType): Observable<any> {
    return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apiKey=${this.apiKey}`).pipe(
      map(results => results[`Search`]));
  }

  /**
  * Get the detailed information for an ID using the "i" parameter
  * 
  * @param {string} id imdbID to retrieve information
  * @returns Observable with detailed information
  */
 getDetails(id) {
   return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
 }

}
