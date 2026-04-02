import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Fragment } from '../../services/fragment';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  fragments: any[] = [];
  loading = true;
  erro = '';

  constructor(private fragmentService: Fragment) {}

  ngOnInit() {
    this.fragmentService.getMyFragments().subscribe({
      next: (res) => {
        this.fragments = res.data;
        this.loading = false;
      },
      error: () => {
        this.erro = 'Erro ao carregar os teus fragmentos.';
        this.loading = false;
      }
    });
  }

  eliminar(id: number) {
    this.fragmentService.deleteFragment(id).subscribe({
      next: () => {
        this.fragments = this.fragments.filter(f => f.id !== id);
      },
      error: () => {
        this.erro = 'Erro ao eliminar fragmento.';
      }
    });
  }
}