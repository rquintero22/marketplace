import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {

  url: string = environment.urlService;

  constructor( private http: HttpClient ) { }

  getFilterData( orderBy: string, equalTo: string ) {
    return this.http.get(`${this.url}sub-categories.json?orderBy="${orderBy}"&equalT="${equalTo}"&print=pretty`);
  }
  
}
