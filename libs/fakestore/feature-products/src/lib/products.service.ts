import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class ProductsServiceConfig {
  baseUrl = '';
}
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _baseUrl = '';
  constructor(
    private http: HttpClient,
    @Optional() config?: ProductsServiceConfig
  ) {
    if (config) {
      this._baseUrl = config.baseUrl;
    }
  }

  getAll() {
    console.log(this._baseUrl);
    return this.http.get(`${this._baseUrl}/products`);
  }
}
