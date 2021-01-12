import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url: string = environment.urlService;

  constructor( private http: HttpClient ) { }

  getData() {
    return this.http.get(`${this.url}products.json`);
  }

  getLimitData(startAt: string, limitToFirst: number ) {
    // {{url}}products.json?orderBy="$key"&startAt="34"&limitToFirst=5&print=pretty
    return this.http.get(`${this.url}products.json?orderBy="$key"&startAt="${ startAt }"&limitToFirst=${ limitToFirst }&print=pretty`);
  }

}
