import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TarefaService } from '../../services/tarefa.service';
import { UsuariaService } from '../../services/usuaria.service';
import { NotificationService } from '../../services/notification.service';
import { Tarefa } from '../../models/tarefa.model';
import { Usuaria } from '../../models/usuaria.model';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container mt-20">
      <div class="page-header">
        <h1>[ 📋 GERENCIADOR DE TAREFAS ]</h1>
        <p>Painel de Controle Central de Produtividade & Operações</p>
      </div>

      <!-- Barra de Ações & Filtros -->
      <div class="pixel-window mb-20">
        <div class="pixel-window-title">
          <span>PAINEL_FILTROS.SYS</span>
          <div class="win-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
        <div class="pixel-window-body">
          <div class="filters-bar">
            <!-- Busca -->
            <div class="filter-item search-box">
              <label class="pixel-label">Buscar Tarefa</label>
              <input
                type="text"
                class="pixel-input"
                [(ngModel)]="termoBusca"
                placeholder="Filtrar por título ou descrição..."
              />
            </div>

            <!-- Filtro por Usuária -->
            <div class="filter-item">
              <label class="pixel-label">Filtrar por Usuária</label>
              <select class="pixel-input" [(ngModel)]="filtroUsuariaId">
                <option [ngValue]="null">TODAS AS USUÁRIAS</option>
                <option *ngFor="let u of usuarias" [ngValue]="u.id">
                  {{ u.nome }} (#{{ u.id }})
                </option>
              </select>
            </div>

            <!-- Filtro por Status -->
            <div class="filter-item">
              <label class="pixel-label">Status</label>
              <select class="pixel-input" [(ngModel)]="filtroStatus">
                <option value="todos">TODAS ({{ tarefas.length }})</option>
                <option value="pendentes">PENDENTES ({{ totalPendentes }})</option>
                <option value="concluidas">CONCLUÍDAS ({{ totalConcluidas }})</option>
              </select>
            </div>

            <!-- Botão Nova Tarefa -->
            <div class="filter-action">
              <button
                type="button"
                class="btn-pixel btn-green"
                (click)="abrirModalNovaTarefa()"
              >
                + NOVA TAREFA
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Indicador de Carregamento -->
      <div *ngIf="carregando" class="loading-text pixel-cursor">
        CARREGANDO REGISTROS DE TAREFAS...
      </div>

      <!-- Alerta de Conexão com a API -->
      <div *ngIf="!carregando && erroConexao" class="pixel-window mb-20">
        <div class="pixel-window-title" style="background: #ff3344;">
          <span>ALERTA: BACKEND .NET DESCONECTADO</span>
        </div>
        <div class="pixel-window-body text-center" style="padding: 24px;">
          <p style="color: #ff3344; font-family: var(--font-pixel); font-size: 9px; margin-bottom: 12px;">
            ⚠️ NÃO FOI POSSÍVEL CONECTAR À API (PORTA 5058)
          </p>
          <p style="font-size: 19px; color: var(--pixel-text); margin-bottom: 16px; line-height: 1.5;">
            O servidor Backend precisa estar em execução para salvar e carregar dados.<br>
            Execute em outro terminal: <br>
            <code style="background: #000; color: #00ff66; padding: 4px 10px; border: 1px solid #333; display: inline-block; margin-top: 8px;">cd backend && dotnet run</code>
          </p>
          <button type="button" class="btn-pixel btn-green" (click)="carregarDados()">
            ► [ 🔄 TENTAR CONECTAR NOVAMENTE ]
          </button>
        </div>
      </div>

      <!-- Estado Vazio -->
      <div *ngIf="!carregando && !erroConexao && tarefasFiltradas.length === 0" class="empty-state">
        <span class="empty-state-icon">📋</span>
        <p>
          NENHUMA TAREFA ENCONTRADA COM OS FILTROS SELECIONADOS.<br>
          <span *ngIf="usuarias.length === 0">
            DICA: Crie primeiro uma <a routerLink="/cadastro">usuária no sistema</a>.
          </span>
          <span *ngIf="usuarias.length > 0">
            CLIQUE NO BOTÃO "+ NOVA TAREFA" ACIMA PARA CRIAR UMA!
          </span>
        </p>
      </div>

      <!-- Lista de Tarefas -->
      <div *ngIf="!carregando && tarefasFiltradas.length > 0" class="tasks-grid">
        <div
          *ngFor="let t of tarefasFiltradas"
          class="task-card"
          [class.concluida]="t.concluida"
        >
          <div class="task-header">
            <h3 class="task-title">{{ t.titulo }}</h3>
            <div class="task-meta">
              <span class="task-badge badge-pending" *ngIf="!t.concluida && !estaAtrasada(t)">
                [PENDENTE]
              </span>
              <span class="task-badge badge-overdue" *ngIf="!t.concluida && estaAtrasada(t)">
                [ATRASADA]
              </span>
              <span class="task-badge badge-done" *ngIf="t.concluida">
                [CONCLUÍDA]
              </span>
              <span class="task-badge badge-user">
                👤 {{ t.nomeUsuaria || obterNomeUsuaria(t.usuariaId) }}
              </span>
            </div>
          </div>

          <p class="task-desc">{{ t.descricao || '(Sem descrição detalhada)' }}</p>

          <div class="task-footer">
            <div class="task-date">
              📅 Vencimento: <strong>{{ formatarData(t.dataVencimento) }}</strong>
            </div>

            <div class="task-actions">
              <!-- Botão Concluir / Reabrir -->
              <button
                type="button"
                class="btn-pixel"
                [ngClass]="t.concluida ? 'btn-yellow' : 'btn-green'"
                (click)="alternarStatus(t)"
                [title]="t.concluida ? 'Reabrir tarefa' : 'Marcar como concluída'"
              >
                {{ t.concluida ? '↺ REABRIR' : '✔ CONCLUIR' }}
              </button>

              <!-- Botão Editar -->
              <button
                type="button"
                class="btn-pixel btn-cyan"
                (click)="abrirModalEditarTarefa(t)"
                title="Editar dados da tarefa"
              >
                ✎ EDITAR
              </button>

              <!-- Botão Excluir -->
              <button
                type="button"
                class="btn-pixel btn-red"
                (click)="excluirTarefa(t)"
                title="Excluir tarefa"
              >
                ✖ EXCLUIR
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal / Overlay de Criação & Edição -->
      <div class="pixel-modal-backdrop" *ngIf="modalAberto" (click)="fecharModal()">
        <div class="pixel-window modal-window" (click)="$event.stopPropagation()">
          <div class="pixel-window-title">
            <span>{{ modoEdicao ? 'EDITAR_TAREFA.EXE' : 'NOVA_TAREFA.EXE' }}</span>
            <div class="win-dots">
              <span (click)="fecharModal()" style="cursor: pointer;">✖</span>
            </div>
          </div>

          <div class="pixel-window-body">
            <form (ngSubmit)="salvarTarefa()" #formTarefa="ngForm">
              <div class="form-group">
                <label class="pixel-label" for="tituloTarefa">Título da Tarefa *</label>
                <input
                  id="tituloTarefa"
                  type="text"
                  name="titulo"
                  class="pixel-input"
                  [(ngModel)]="tarefaEmEdicao.titulo"
                  #tituloModel="ngModel"
                  required
                  maxlength="100"
                  placeholder="Ex: Entregar Módulo de API"
                />
                <span class="field-error" *ngIf="tituloModel.invalid && tituloModel.touched">
                  ! O título é obrigatório (máx 100 caracteres).
                </span>
              </div>

              <div class="form-group">
                <label class="pixel-label" for="descTarefa">Descrição Detalhada</label>
                <textarea
                  id="descTarefa"
                  name="descricao"
                  rows="3"
                  class="pixel-input"
                  [(ngModel)]="tarefaEmEdicao.descricao"
                  maxlength="500"
                  placeholder="Ex: Detalhes, requisitos e observações importantes..."
                ></textarea>
              </div>

              <div class="grid-2-col">
                <div class="form-group">
                  <label class="pixel-label" for="vencimento">Data de Vencimento *</label>
                  <input
                    id="vencimento"
                    type="date"
                    name="dataVencimento"
                    class="pixel-input"
                    [(ngModel)]="dataVencimentoInput"
                    required
                  />
                </div>

                <div class="form-group">
                  <label class="pixel-label" for="usuariaSelect">Usuária Responsável *</label>
                  <select
                    id="usuariaSelect"
                    name="usuariaId"
                    class="pixel-input"
                    [(ngModel)]="tarefaEmEdicao.usuariaId"
                    required
                  >
                    <option [ngValue]="null" disabled>Selecione a usuária</option>
                    <option *ngFor="let u of usuarias" [ngValue]="u.id">
                      {{ u.nome }} (#{{ u.id }})
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-group checkbox-group" *ngIf="modoEdicao">
                <label class="pixel-checkbox-label">
                  <input
                    type="checkbox"
                    name="concluida"
                    [(ngModel)]="tarefaEmEdicao.concluida"
                  />
                  <span>MARCAR COMO CONCLUÍDA</span>
                </label>
              </div>

              <div class="modal-actions">
                <button
                  type="button"
                  class="btn-pixel btn-gray"
                  (click)="fecharModal()"
                >
                  CANCELAR
                </button>
                <button
                  type="submit"
                  class="btn-pixel btn-green"
                  [disabled]="salvando || formTarefa.invalid || !tarefaEmEdicao.usuariaId"
                >
                  <span *ngIf="!salvando">► GRAVAR DADOS</span>
                  <span *ngIf="salvando">SALVANDO...</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .mb-20 {
      margin-bottom: 24px;
    }
    .filters-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: flex-end;
    }
    .filter-item {
      flex: 1;
      min-width: 200px;
    }
    .search-box {
      flex: 1.5;
    }
    .filter-action {
      display: flex;
      align-items: flex-end;
      padding-bottom: 2px;
    }
    .tasks-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
      margin-bottom: 40px;
    }
    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 8px;
    }
    .badge-user {
      color: var(--pixel-accent);
      border-color: var(--pixel-accent);
      background: rgba(0, 212, 255, 0.08);
    }
    .task-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      border-top: 1px dashed var(--pixel-gray);
      padding-top: 12px;
      margin-top: 10px;
    }
    .task-date {
      font-family: var(--font-vt);
      font-size: 19px;
      color: var(--pixel-text2);
    }
    .task-date strong {
      color: var(--pixel-green);
    }
    /* Modal */
    .pixel-modal-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.85);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .modal-window {
      max-width: 580px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
    }
    .grid-2-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    @media (max-width: 580px) {
      .grid-2-col {
        grid-template-columns: 1fr;
      }
    }
    .checkbox-group {
      margin: 16px 0;
    }
    .pixel-checkbox-label {
      font-family: var(--font-pixel);
      font-size: 8px;
      color: var(--pixel-green);
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }
    .pixel-checkbox-label input[type="checkbox"] {
      width: 18px;
      height: 18px;
      accent-color: var(--pixel-green);
      cursor: pointer;
    }
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
    }
  `]
})
export class TarefasComponent implements OnInit {
  private tarefaService = inject(TarefaService);
  private usuariaService = inject(UsuariaService);
  private notificationService = inject(NotificationService);
  private route = inject(ActivatedRoute);

  tarefas: Tarefa[] = [];
  usuarias: Usuaria[] = [];
  carregando = false;
  salvando = false;
  erroConexao = false;

  // Filtros
  termoBusca = '';
  filtroUsuariaId: number | null = null;
  filtroStatus: 'todos' | 'pendentes' | 'concluidas' = 'todos';

  // Modal
  modalAberto = false;
  modoEdicao = false;
  dataVencimentoInput = '';

  tarefaEmEdicao: Tarefa = {
    titulo: '',
    descricao: '',
    dataVencimento: '',
    concluida: false,
    usuariaId: 0
  };

  ngOnInit(): void {
    // Verificar se foi passado queryParam usuariaId
    this.route.queryParams.subscribe(params => {
      if (params['usuariaId']) {
        this.filtroUsuariaId = Number(params['usuariaId']);
      }
    });

    this.carregarDados();
  }

  carregarDados(): void {
    this.carregando = true;
    this.erroConexao = false;
    this.usuariaService.listar().subscribe({
      next: (uList) => {
        this.usuarias = uList;
        this.carregarTarefas();
      },
      error: () => {
        this.carregarTarefas();
      }
    });
  }

  carregarTarefas(): void {
    this.tarefaService.listar().subscribe({
      next: (dados) => {
        this.tarefas = dados;
        this.carregando = false;
        this.erroConexao = false;
      },
      error: (err) => {
        this.carregando = false;
        this.erroConexao = (err.status === 0);
        const msg = err.status === 0
          ? 'Servidor Backend offline! Inicie com "dotnet run" na pasta backend (porta 5058).'
          : (err.error?.message || err.message || 'Falha ao carregar tarefas da API.');
        this.notificationService.error(msg);
      }
    });
  }

  get totalPendentes(): number {
    return this.tarefas.filter(t => !t.concluida).length;
  }

  get totalConcluidas(): number {
    return this.tarefas.filter(t => t.concluida).length;
  }

  get tarefasFiltradas(): Tarefa[] {
    return this.tarefas.filter(t => {
      // Filtro texto
      if (this.termoBusca.trim()) {
        const termo = this.termoBusca.toLowerCase();
        const bateu = (t.titulo || '').toLowerCase().includes(termo) ||
                      (t.descricao || '').toLowerCase().includes(termo);
        if (!bateu) return false;
      }
      // Filtro usuaria
      if (this.filtroUsuariaId !== null && t.usuariaId !== this.filtroUsuariaId) {
        return false;
      }
      // Filtro status
      if (this.filtroStatus === 'pendentes' && t.concluida) return false;
      if (this.filtroStatus === 'concluidas' && !t.concluida) return false;

      return true;
    });
  }

  obterNomeUsuaria(usuariaId: number): string {
    const usuaria = this.usuarias.find(u => u.id === usuariaId);
    return usuaria ? usuaria.nome : `Usuária #${usuariaId}`;
  }

  estaAtrasada(tarefa: Tarefa): boolean {
    if (!tarefa.dataVencimento || tarefa.concluida) return false;
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataVenc = new Date(tarefa.dataVencimento);
    return dataVenc < hoje;
  }

  formatarData(dataIso: string): string {
    if (!dataIso) return '-';
    try {
      const data = new Date(dataIso);
      return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    } catch {
      return dataIso;
    }
  }

  abrirModalNovaTarefa(): void {
    if (this.usuarias.length === 0) {
      this.notificationService.warning('Cadastre ao menos uma usuária antes de criar tarefas!');
    }

    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    this.dataVencimentoInput = amanha.toISOString().split('T')[0];

    this.modoEdicao = false;
    this.tarefaEmEdicao = {
      titulo: '',
      descricao: '',
      dataVencimento: this.dataVencimentoInput,
      concluida: false,
      usuariaId: this.filtroUsuariaId || (this.usuarias[0]?.id ?? 0)
    };
    this.modalAberto = true;
  }

  abrirModalEditarTarefa(tarefa: Tarefa): void {
    this.modoEdicao = true;
    this.tarefaEmEdicao = { ...tarefa };

    if (tarefa.dataVencimento) {
      this.dataVencimentoInput = tarefa.dataVencimento.split('T')[0];
    } else {
      this.dataVencimentoInput = new Date().toISOString().split('T')[0];
    }

    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  salvarTarefa(): void {
    if (!this.tarefaEmEdicao.titulo.trim() || !this.dataVencimentoInput || !this.tarefaEmEdicao.usuariaId) {
      this.notificationService.warning('Preencha os campos obrigatórios (Título, Data e Usuária)!');
      return;
    }

    this.tarefaEmEdicao.dataVencimento = new Date(this.dataVencimentoInput).toISOString();
    this.salvando = true;

    if (this.modoEdicao && this.tarefaEmEdicao.id) {
      this.tarefaService.atualizar(this.tarefaEmEdicao.id, this.tarefaEmEdicao).subscribe({
        next: () => {
          this.salvando = false;
          this.fecharModal();
          this.notificationService.success(`Tarefa "${this.tarefaEmEdicao.titulo}" atualizada!`);
          this.carregarTarefas();
        },
        error: (err) => {
          this.salvando = false;
          const msg = typeof err.error === 'string' ? err.error : err.error?.title || 'Erro ao atualizar tarefa.';
          this.notificationService.error(msg);
        }
      });
    } else {
      this.tarefaService.criar(this.tarefaEmEdicao).subscribe({
        next: (criada) => {
          this.salvando = false;
          this.fecharModal();
          this.notificationService.success(`Tarefa "${criada.titulo}" criada com sucesso!`);
          this.carregarTarefas();
        },
        error: (err) => {
          this.salvando = false;
          const msg = typeof err.error === 'string' ? err.error : err.error?.title || 'Erro ao criar tarefa.';
          this.notificationService.error(msg);
        }
      });
    }
  }

  alternarStatus(tarefa: Tarefa): void {
    this.tarefaService.alternarConcluida(tarefa).subscribe({
      next: () => {
        const novoStatus = !tarefa.concluida ? 'concluída' : 'reaberta';
        this.notificationService.success(`Tarefa "${tarefa.titulo}" marcada como ${novoStatus}!`);
        this.carregarTarefas();
      },
      error: (err) => {
        const msg = typeof err.error === 'string' ? err.error : 'Erro ao alterar status da tarefa.';
        this.notificationService.error(msg);
      }
    });
  }

  excluirTarefa(tarefa: Tarefa): void {
    if (!tarefa.id) return;
    const confirmou = confirm(`ATENÇÃO: Deseja realmente excluir a tarefa "${tarefa.titulo}" (ID: ${tarefa.id})?`);
    if (!confirmou) return;

    this.tarefaService.remover(tarefa.id).subscribe({
      next: () => {
        this.notificationService.success(`Tarefa "${tarefa.titulo}" excluída com sucesso!`);
        this.carregarTarefas();
      },
      error: (err) => {
        const msg = typeof err.error === 'string' ? err.error : 'Erro ao excluir a tarefa.';
        this.notificationService.error(msg);
      }
    });
  }
}
