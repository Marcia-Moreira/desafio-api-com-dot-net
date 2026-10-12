import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ToastComponent],
  template: `
    <!-- Top Navigation Bar (Retro 90s Pixel UI) -->
    <header class="pixel-nav">
      <div class="nav-logo">
        👾 TASKMASTER <span>95</span>
      </div>

      <nav>
        <ul class="nav-links">
          <li>
            <a routerLink="/tarefas" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
              [ 📋 TAREFAS ]
            </a>
          </li>
          <li>
            <a routerLink="/cadastro" routerLinkActive="active">
              [ 💾 CADASTRAR USUÁRIA ]
            </a>
          </li>
        </ul>
      </nav>

      <div class="nav-status">
        <span class="status-dot"></span>
        <span class="status-text">ONLINE</span>
      </div>
    </header>

    <!-- Global Toast Notifications -->
    <app-toast />

    <!-- Main Content Router Outlet -->
    <main class="main-content">
      <router-outlet />
    </main>

    <!-- Retro 90s Footer -->
    <footer class="pixel-footer">
      <div class="container text-center">
        <p>
          👾 TASKMASTER 95 • DESENVOLVIDO POR <strong>SQUAD CARMEN PORTINHO</strong>
        </p>
        <p class="footer-sub">
          BOOTCAMP BACKEND .NET & FRONTEND ANGULAR • WOMAKERSCODE • TODOS OS DIREITOS RESERVADOS 1995-2026
        </p>
      </div>
    </footer>
  `,
  styles: [`
    .nav-status {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-pixel);
      font-size: 7px;
      color: var(--pixel-green);
    }
    .status-dot {
      width: 8px;
      height: 8px;
      background: var(--pixel-green);
      display: inline-block;
      box-shadow: 0 0 6px var(--pixel-green);
      animation: blink 1.2s step-start infinite;
    }
    .main-content {
      min-height: calc(100vh - 130px);
      padding-bottom: 40px;
    }
    .pixel-footer {
      background: var(--pixel-panel);
      border-top: 2px solid var(--pixel-gray);
      padding: 20px 10px;
      font-family: var(--font-pixel);
      font-size: 7px;
      color: var(--pixel-text2);
      line-height: 2;
    }
    .footer-sub {
      color: var(--pixel-gray);
      font-size: 6px;
      margin-top: 4px;
    }
    @media (max-width: 600px) {
      .nav-status {
        display: none;
      }
    }
  `]
})
export class App {}
