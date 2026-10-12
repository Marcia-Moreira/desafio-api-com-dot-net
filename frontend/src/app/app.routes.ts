import { Routes } from '@angular/router';
import { TarefasComponent } from './pages/tarefas/tarefas.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tarefas', pathMatch: 'full' },
  { path: 'tarefas', component: TarefasComponent, title: 'TaskMaster 95 — Tarefas' },
  { path: 'cadastro', component: CadastroComponent, title: 'TaskMaster 95 — Cadastro' },
  { path: '**', redirectTo: 'tarefas' }
];
