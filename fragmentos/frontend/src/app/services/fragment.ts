import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { supabase } from '../lib/supabase';
import { from, switchMap } from 'rxjs';

export interface FragmentData {
  id: number;
  text: string | null;
  media_url: string;
  media_type: string;
  category: string | null;
  created_at: string;
  user_id: string | null;
}

interface FragmentsResponse {
  data: FragmentData[];
}

interface UploadResponse {
  image: string;
}

interface UpdateResponse {
  data: FragmentData;
}

@Injectable({
  providedIn: 'root',
})
export class Fragment {
  private apiUrl = 'https://fragmentos-backend.onrender.com';

  constructor(private http: HttpClient) {}

  getFragments() {
    return this.http.get<FragmentsResponse>(`${this.apiUrl}/fragments`);
  }

  uploadFragment(formData: FormData) {
    return from(supabase.auth.getSession()).pipe(
      switchMap(({ data }) => {
        const token = data.session?.access_token;
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.post<UploadResponse>(`${this.apiUrl}/api/images`, formData, { headers });
      })
    );
  }

  getMyFragments() {
    return from(supabase.auth.getSession()).pipe(
      switchMap(({ data }) => {
        const token = data.session?.access_token;
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get<FragmentsResponse>(`${this.apiUrl}/fragments/mine`, { headers });
      })
    );
  }

  updateFragment(id: number, body: { text: string; category: string }) {
    return from(supabase.auth.getSession()).pipe(
      switchMap(({ data }) => {
        const token = data.session?.access_token;
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        return this.http.put<UpdateResponse>(`${this.apiUrl}/fragments/${id}`, body, { headers });
      })
    );
  }

  deleteFragment(id: number) {
    return from(supabase.auth.getSession()).pipe(
      switchMap(({ data }) => {
        const token = data.session?.access_token;
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.delete<void>(`${this.apiUrl}/fragments/${id}`, { headers });
      })
    );
  }
}