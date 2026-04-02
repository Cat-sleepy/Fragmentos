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

  constructor(private fb: FormBuilder, private fragmentService: Fragment) {
    this.form = this.fb.group({
      texto: [''],
      categoria: ['', Validators.required],
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.form.invalid || !this.selectedFile) {
      this.form.markAllAsTouched();
      this.erro = 'Por favor preenche todos os campos obrigatórios.';
      return;
    }

    this.loading = true;
    this.erro = '';

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('texto', this.form.value.texto);
    formData.append('categoria', this.form.value.categoria);

    this.fragmentService.uploadFragment(formData).subscribe({
      next: () => {
        this.sucesso = true;
        this.loading = false;
        this.form.reset();
        this.selectedFile = null;
      },
      error: (err) => {
        this.erro = 'Erro ao submeter fragmento. Tenta novamente.';
        this.loading = false;
      }
    });
  }
}