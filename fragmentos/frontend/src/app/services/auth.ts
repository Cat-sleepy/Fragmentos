import { Injectable } from '@angular/core';
import { supabase } from '../lib/supabase';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  // Registar utilizador
  async register(email: string, password: string) {
    return await supabase.auth.signUp({ email, password });
  }

  // Login
  async login(email: string, password: string) {
    return await supabase.auth.signInWithPassword({ email, password });
  }

  // Logout
  async logout() {
    return await supabase.auth.signOut();
  }

  // Utilizador atual
  async getUser() {
    return await supabase.auth.getUser();
  }

  // Sessão atual
  async getSession() {
    return await supabase.auth.getSession();
  }
}