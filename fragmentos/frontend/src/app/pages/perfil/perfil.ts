import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Fragment, FragmentData } from '../../services/fragment';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  fragments: FragmentData[] = [];
  loading = true;
  erro = '';
  editandoId: number | null = null;
  textoEditado = '';
  categoriaEditada = '';

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

  editar(fragment: FragmentData) {
    this.editandoId = fragment.id;
    this.textoEditado = fragment.text ?? '';
    this.categoriaEditada = fragment.category ?? '';
  }

  cancelarEdicao() {
    this.editandoId = null;
    this.textoEditado = '';
    this.categoriaEditada = '';
  }

  guardar(id: number) {
    this.fragmentService.updateFragment(id, {
      text: this.textoEditado,
      category: this.categoriaEditada
    }).subscribe({
      next: (res) => {
        this.fragments = this.fragments.map(f =>
          f.id === id ? { ...f, text: this.textoEditado, category: this.categoriaEditada } : f
        );
        this.cancelarEdicao();
      },
      error: () => {
        this.erro = 'Erro ao guardar fragmento.';
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