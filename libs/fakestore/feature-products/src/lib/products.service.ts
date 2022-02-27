import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class ProductsServiceConfig {
  baseUrl = '';
}
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  _baseUrl = '';
  constructor(
    private http: HttpClient,
    @Optional() config?: ProductsServiceConfig
  ) {
    if (config) {
      this._baseUrl = config.baseUrl;
    }
  }

  getAll() {
    return this.http.get(`${this._baseUrl}/products`);
  }


  // Not actually using this since fakestoreapi.com doesn't have 
  // search functionality

  // query({ query }: { query: string }) {
  //   const params = new HttpParams()
  //     .set('query', query);
  //   return this.http.get(`${this._baseUrl}/products`, { params });
  // }
}
