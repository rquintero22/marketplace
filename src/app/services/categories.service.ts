import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  url: string = environment.urlService;

  constructor( private http: HttpClient ) { }

  getData() {
    return this.http.get(`${this.url}categories.json`);
  }
  
}
