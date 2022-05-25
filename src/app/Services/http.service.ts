import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  configUrl = 'http://localhost:3000/';

  getProducts() {
    return this.http.get<any>(this.configUrl + 'Products');
  }

  getPromoCodes() {
    return this.http.get<any>(this.configUrl + 'PromoCodes');
  }
}
