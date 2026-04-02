import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Fragment {
  private apiUrl = 'https://fragmentos-backend.onrender.com';

  constructor(private http: HttpClient) {}

  getFragments() {
    return this.http.get<any>(`${this.apiUrl}/fragments`);
  }
}