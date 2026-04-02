import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Submeter } from './pages/submeter/submeter';
import { Perfil } from './pages/perfil/perfil';
import { Sobre } from './pages/sobre/sobre';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'submeter', component: Submeter },
  { path: 'perfil', component: Perfil },
  { path: 'sobre', component: Sobre },
  { path: 'submeter', component: Submeter, canActivate: [authGuard] },
{ path: 'perfil', component: Perfil, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];