import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthModal } from '../auth-modal/auth-modal';
import { supabase } from '../../lib/supabase';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, AuthModal],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  mostrarModal = false;
  utilizadorAutenticado = false;

  async ngOnInit() {
    const { data } = await supabase.auth.getSession();
    this.utilizadorAutenticado = !!data.session;

    supabase.auth.onAuthStateChange((_, session) => {
      this.utilizadorAutenticado = !!session;
    });
  }

  async logout() {
    await supabase.auth.signOut();
    this.utilizadorAutenticado = false;
  }
}