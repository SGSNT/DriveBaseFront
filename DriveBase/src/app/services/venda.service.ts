import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venda } from '../models/venda';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  http = inject(HttpClient);

  API = "http://localhost:8081/api/venda";

  constructor() { }

  findAll(): Observable<Venda[]>{
    return this.http.get<Venda[]>(this.API+"findAll");
  }

  delete(id: number): Observable<String>{
    return this.http.delete<String>(this.API+"/delete/"+id,{responseType: 'text' as 'json'});
  }

  save(venda: Venda): Observable<String>{
    return this.http.post<string>(this.API+"/save",venda,{responseType: 'json'});
  }

  update(venda: Venda, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id,venda,{responseType: 'json'});
  }

  findById(id: number): Observable<Venda>{
    return this.http.get<Venda>(this.API+"/findById/"+id);
  }
}
