import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuaria } from '../models/usuaria.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Usuarias`;

  listar(): Observable<Usuaria[]> {
    return this.http.get<Usuaria[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Usuaria> {
    return this.http.get<Usuaria>(`${this.apiUrl}/${id}`);
  }

  criar(usuaria: Usuaria): Observable<Usuaria> {
    return this.http.post<Usuaria>(this.apiUrl, usuaria);
  }

  atualizar(id: number, usuaria: Usuaria): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { ...usuaria, id });
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
