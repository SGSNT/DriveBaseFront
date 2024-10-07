import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manutencao } from '../models/manutencao';

@Injectable({
  providedIn: 'root'
})
export class ManutencaoService {

  http = inject(HttpClient);

  API = "http://192.168.56.3:8081/api/manutencao";

  constructor() { }

  findAll(): Observable<Manutencao[]>{
    return this.http.get<Manutencao[]>(this.API+"/findAll");
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id,{responseType: 'text' as 'json'});
  }

  save(manutencao: Manutencao): Observable<string>{
    return this.http.post<string>(this.API+"/save",manutencao,{responseType: 'json'});
  }

  update(manutencao: Manutencao, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id,manutencao,{responseType: 'json'});
  }

  findById(id: number): Observable<Manutencao>{
    return this.http.get<Manutencao>(this.API+"/findById/"+id);
  }
}
