import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { supabase } from '../lib/supabase';
import { from, switchMap } from 'rxjs';

export interface ProfileData {
  id: string;
  username: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
}

interface ProfileResponse {
  data: ProfileData;
}

@Injectable({
  providedIn: 'root',
})
export class Profile {
  private apiUrl = 'https://fragmentos-backend.onrender.com';

  constructor(private http: HttpClient) {}

  getProfile() {
    return from(supabase.auth.getSession()).pipe(
      switchMap(({ data }) => {
        const token = data.session?.access_token;
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get<ProfileResponse>(`${this.apiUrl}/profile`, { headers });
      })
    );
  }

  updateProfile(body: { username: string; bio: string; avatar_url: string }) {
    return from(supabase.auth.getSession()).pipe(
      switchMap(({ data }) => {
        const token = data.session?.access_token;
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        return this.http.put<ProfileResponse>(`${this.apiUrl}/profile`, body, { headers });
      })
    );
  }
}