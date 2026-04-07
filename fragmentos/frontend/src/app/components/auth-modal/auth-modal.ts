import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-auth-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-modal.html',
  styleUrl: './auth-modal.css',
})
export class AuthModal {
  @Output() fechar = new EventEmitter<void>();
  @Output() autenticado = new EventEmitter<void>();

  modo: 'login' | 'registo' = 'login';
  form: FormGroup;
  erro = '';
  loading = false;

  constructor(private fb: FormBuilder, private authService: Auth) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  trocarModo() {
    this.modo = this.modo === 'login' ? 'registo' : 'login';
    this.erro = '';
    this.form.reset();
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.erro = '';

    const { email, password } = this.form.value;

    const resultado = this.modo === 'login'
      ? await this.authService.login(email, password)
      : await this.authService.register(email, password);

    if (resultado.error) {
  if (resultado.error.message.includes('registered')) {
    this.erro = 'Este email já está a ser utilizado.';
  } else {
    this.erro = 'Erro ao autenticar.';
  }
  this.loading = false;
  return;
}

    this.loading = false;
    this.autenticado.emit();
    this.fechar.emit();
  }
}