import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proprietario } from '../models/proprietario';

@Injectable({
  providedIn: 'root'
})
export class ProprietarioService {

  http = inject(HttpClient);

  API = "http://localhost:8081/api/proprietario";

  constructor() { }
  
  findAll(): Observable<Proprietario[]>{
    return this.http.get<Proprietario[]>(this.API+"/findAll");
  }

  delete(id: number): Observable<String>{
    return this.http.delete<String>(this.API+"/delete/"+id,{responseType: 'text' as 'json'});
  }

  save(proprietario: Proprietario): Observable<String>{
    return this.http.post<string>(this.API+"/save",proprietario,{responseType: 'json'});
  }

  update(proprietario: Proprietario, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id,proprietario,{responseType: 'json'});
  }

  findById(id: number): Observable<Proprietario>{
    return this.http.get<Proprietario>(this.API+"/findById/"+id);
  }
}
