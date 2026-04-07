import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Fragment, FragmentData } from '../../services/fragment';
import { Profile, ProfileData } from '../../services/profile';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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

  // perfil
  profile: ProfileData | null = null;
  editandoPerfil = false;
  perfilForm: FormGroup;

  constructor(
    private fragmentService: Fragment,
    private profileService: Profile,
    private fb: FormBuilder
  ) {
    this.perfilForm = this.fb.group({
      username: [''],
      bio: [''],
      avatar_url: [''],
    });
  }

  ngOnInit() {
    this.carregarFragmentos();
    this.carregarPerfil();
  }

  carregarFragmentos() {
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

  carregarPerfil() {
    this.profileService.getProfile().subscribe({
      next: (res) => {
        this.profile = res.data;
        if (res.data) {
          this.perfilForm.patchValue({
            username: res.data.username ?? '',
            bio: res.data.bio ?? '',
            avatar_url: res.data.avatar_url ?? '',
          });
        }
      },
      error: () => {}
    });
  }

  guardarPerfil() {
    this.profileService.updateProfile(this.perfilForm.value).subscribe({
      next: (res) => {
        this.profile = res.data;
        this.editandoPerfil = false;
      },
      error: () => {
        this.erro = 'Erro ao guardar perfil.';
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
      next: () => {
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