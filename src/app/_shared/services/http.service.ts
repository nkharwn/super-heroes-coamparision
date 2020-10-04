import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }


  get(url: string): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get<any>(url, { headers: headers });
  }

 

  setHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers.set("content-Type", "application/json");
    return headers
  }
}
