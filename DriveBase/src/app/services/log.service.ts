import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from '../models/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  http = inject(HttpClient);
  API = "http://192.168.56.3:8081/api/log";

  constructor() { }

  findAll(): Observable<Log[]> {
    return this.http.get<Log[]>(`${this.API}/findAll`);
  }

  findLogsByCriterio(startDate?: string, endDate?: string, acao?: string, roleUser?: string, logName?: string, entity?: string, username?: string): Observable<Log[]> {
    let params = new HttpParams();

    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    if (acao) params = params.set('acao', acao);
    if (roleUser) params = params.set('roleUser', roleUser);
    if (logName) params = params.set('logName', logName);
    if (entity) params = params.set('entity', entity);
    if (username) params = params.set('username', username);

    return this.http.get<Log[]>(`${this.API}/findLogsByCriterio`, { params });
  }
}
