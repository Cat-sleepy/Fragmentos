import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Fragment } from '../../services/fragment';

@Component({
  selector: 'app-submeter',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './submeter.html',
  styleUrl: './submeter.css',
})
export class Submeter {
  form: FormGroup;
  selectedFile: File | null = null;
  loading = false;
  sucesso = false;
  erro = '';
  tipoSelecionado: string | null = null;

  constructor(private fb: FormBuilder, private fragmentService: Fragment) {
    this.form = this.fb.group({
      texto: [''],
      categoria: ['', Validators.required],
    });
  }

  selecionarTipo(tipo: string) {
    this.tipoSelecionado = tipo;
    this.form.reset();
    this.selectedFile = null;
    this.erro = '';
    this.sucesso = false;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.tipoSelecionado === 'texto' && !this.form.value.texto?.trim()) {
      this.erro = 'Escreve algum texto.';
      return;
    }

    if (this.tipoSelecionado !== 'texto' && !this.selectedFile) {
      this.erro = 'Seleciona um ficheiro.';
      return;
    }

    if (this.form.get('categoria')?.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.erro = '';
    this.sucesso = false;

    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    formData.append('text', this.form.value.texto ?? '');
    formData.append('category', this.form.value.categoria);

    this.fragmentService.uploadFragment(formData).subscribe({
      next: () => {
        this.sucesso = true;
        this.loading = false;
        this.form.reset();
        this.selectedFile = null;
        this.tipoSelecionado = null;
      },
      error: (err) => {
        this.erro = err.error?.message || 'Erro ao submeter fragmento. Tenta novamente.';
        this.loading = false;
      }
    });
  }
}