import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuariaService } from '../../services/usuaria.service';
import { NotificationService } from '../../services/notification.service';
import { Usuaria } from '../../models/usuaria.model';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container mt-20">
      <div class="page-header">
        <h1>[ 💾 CADASTRO DE USUÁRIA ]</h1>
        <p>Insira as credenciais no sistema mainframe para habilitar o gerenciamento de tarefas</p>
      </div>

      <div class="grid-layout">
        <!-- Formulário de Cadastro -->
        <div class="pixel-window form-window">
          <div class="pixel-window-title">
            <span>REGISTRO_USUARIA.EXE</span>
            <div class="win-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
          <div class="pixel-window-body">
            <form (ngSubmit)="salvarUsuaria()" #formUsuaria="ngForm">
              <div class="form-group">
                <label class="pixel-label" for="nome">Nome Completo *</label>
                <input
                  id="nome"
                  type="text"
                  name="nome"
                  class="pixel-input"
                  [class.error-input]="nomeModel.invalid && nomeModel.touched"
                  [(ngModel)]="novaUsuaria.nome"
                  #nomeModel="ngModel"
                  required
                  maxlength="80"
                  placeholder="Ex: Mariana Lemos"
                />
                <span class="field-error" *ngIf="nomeModel.invalid && nomeModel.touched">
                  ! O nome é obrigatório (máx 80 caracteres).
                </span>
              </div>

              <div class="form-group">
                <label class="pixel-label" for="email">E-mail *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  class="pixel-input"
                  [class.error-input]="emailModel.invalid && emailModel.touched"
                  [(ngModel)]="novaUsuaria.email"
                  #emailModel="ngModel"
                  required
                  email
                  placeholder="Ex: mariana@email.com"
                />
                <span class="field-error" *ngIf="emailModel.invalid && emailModel.touched">
                  ! Informe um e-mail válido.
                </span>
              </div>

              <div class="form-group">
                <label class="pixel-label" for="senha">Senha de Acesso *</label>
                <input
                  id="senha"
                  type="password"
                  name="senha"
                  class="pixel-input"
                  [class.error-input]="senhaModel.invalid && senhaModel.touched"
                  [(ngModel)]="novaUsuaria.senha"
                  #senhaModel="ngModel"
                  required
                  minlength="4"
                  placeholder="••••••••"
                />
                <span class="field-error" *ngIf="senhaModel.invalid && senhaModel.touched">
                  ! Senha obrigatória (mínimo 4 caracteres).
                </span>
              </div>

              <div class="form-actions mt-20">
                <button
                  type="submit"
                  class="btn-pixel btn-green btn-full"
                  [disabled]="salvando || formUsuaria.invalid"
                >
                  <span *ngIf="!salvando">► GRAVAR NO DISCO (CADASTRAR)</span>
                  <span *ngIf="salvando">GRAVANDO DADOS...</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Lista de Usuárias Cadastradas -->
        <div class="pixel-window list-window">
          <div class="pixel-window-title">
            <span>USUARIAS_ATIVAS.DAT [{{ usuarias.length }}]</span>
            <div class="win-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
          <div class="pixel-window-body">
            <div *ngIf="carregando" class="loading-text pixel-cursor">
              LENDO DISCO RIGIDO...
            </div>

            <div *ngIf="!carregando && usuarias.length === 0" class="empty-state">
              <span class="empty-state-icon">💾</span>
              <p>NENHUMA USUÁRIA REGISTRADA.<br>UTILIZE O FORMULÁRIO AO LADO PARA CRIAR.</p>
            </div>

            <div *ngIf="!carregando && usuarias.length > 0" class="user-list">
              <div *ngFor="let u of usuarias" class="user-card">
                <div class="user-info">
                  <div class="user-name">
                    <span class="user-badge-id">#{{ u.id }}</span> {{ u.nome }}
                  </div>
                  <div class="user-email">✉ {{ u.email }}</div>
                </div>
                <div class="user-actions">
                  <a [routerLink]="['/tarefas']" [queryParams]="{ usuariaId: u.id }" class="btn-pixel btn-cyan">
                    TAREFAS
                  </a>
                  <button
                    type="button"
                    class="btn-pixel btn-red"
                    (click)="confirmarExclusao(u)"
                    title="Remover usuária"
                  >
                    ✖
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .grid-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 40px;
    }
    @media (max-width: 820px) {
      .grid-layout {
        grid-template-columns: 1fr;
      }
    }
    .user-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-height: 480px;
      overflow-y: auto;
      padding-right: 6px;
    }
    .user-card {
      background: var(--pixel-dark);
      border: 2px solid var(--pixel-gray);
      padding: 12px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      transition: border-color 0.2s;
    }
    .user-card:hover {
      border-color: var(--pixel-accent);
    }
    .user-badge-id {
      color: var(--pixel-yellow);
      font-size: 8px;
      margin-right: 4px;
    }
    .user-name {
      font-family: var(--font-pixel);
      font-size: 9px;
      color: var(--pixel-green);
      margin-bottom: 4px;
    }
    .user-email {
      font-family: var(--font-vt);
      font-size: 18px;
      color: var(--pixel-text2);
    }
    .user-actions {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-shrink: 0;
    }
  `]
})
export class CadastroComponent implements OnInit {
  private usuariaService = inject(UsuariaService);
  private notificationService = inject(NotificationService);

  usuarias: Usuaria[] = [];
  carregando = false;
  salvando = false;

  novaUsuaria: Usuaria = {
    nome: '',
    email: '',
    senha: ''
  };

  ngOnInit(): void {
    this.carregarUsuarias();
  }

  carregarUsuarias(): void {
    this.carregando = true;
    this.usuariaService.listar().subscribe({
      next: (dados) => {
        this.usuarias = dados;
        this.carregando = false;
      },
      error: (err) => {
        this.carregando = false;
        const msg = err.error?.message || err.message || 'Falha ao carregar usuárias da API.';
        this.notificationService.error(`Erro ao conectar com a API: ${msg}`);
      }
    });
  }

  salvarUsuaria(): void {
    if (!this.novaUsuaria.nome || !this.novaUsuaria.email || !this.novaUsuaria.senha) {
      this.notificationService.warning('Preencha todos os campos obrigatórios!');
      return;
    }

    this.salvando = true;
    this.usuariaService.criar(this.novaUsuaria).subscribe({
      next: (criada) => {
        this.salvando = false;
        this.notificationService.success(`Usuária "${criada.nome}" cadastrada com sucesso!`);
        this.novaUsuaria = { nome: '', email: '', senha: '' };
        this.carregarUsuarias();
      },
      error: (err) => {
        this.salvando = false;
        const erroMsg = typeof err.error === 'string' 
          ? err.error 
          : err.error?.mensagem || err.error?.title || 'Erro ao cadastrar usuária.';
        this.notificationService.error(erroMsg);
      }
    });
  }

  confirmarExclusao(usuaria: Usuaria): void {
    if (!usuaria.id) return;
    const confirmou = confirm(`ATENÇÃO: Deseja realmente excluir a usuária "${usuaria.nome}" (ID: ${usuaria.id})?`);
    if (!confirmou) return;

    this.usuariaService.remover(usuaria.id).subscribe({
      next: () => {
        this.notificationService.success(`Usuária "${usuaria.nome}" removida com sucesso!`);
        this.carregarUsuarias();
      },
      error: (err) => {
        const erroMsg = typeof err.error === 'string'
          ? err.error
          : err.error?.mensagem || 'Erro ao remover usuária (verifique se há tarefas vinculadas).';
        this.notificationService.error(erroMsg);
      }
    });
  }
}
