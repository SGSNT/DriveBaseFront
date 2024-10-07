import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  http = inject(HttpClient);

  API = "http://192.168.56.3:8081/api/marca";

  constructor() { }

  findAll(): Observable<Marca[]>{
    return this.http.get<Marca[]>(this.API+"/findAll");
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id,{responseType: 'text' as 'json'});
  }

  save(marca: Marca): Observable<string>{
    return this.http.post<string>(this.API+"/save",marca,{responseType: 'json'});
  }

  update(marca: Marca, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id,marca,{responseType: 'json'});
  }

  findById(id: number): Observable<Marca>{
    return this.http.get<Marca>(this.API+"/findById/"+id);
  }
}
