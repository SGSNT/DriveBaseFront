import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from '../models/carro';

@Injectable({
  providedIn: 'root'
})
export class CarrosService {

  http = inject(HttpClient);

  API = "http://192.168.56.3:8081/api/carro";

  constructor() { }

  findAll(): Observable<Carro[]>{
    return this.http.get<Carro[]>(this.API+"/findAll");
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id,{responseType: 'text' as 'json'});
  }

  save(carro: Carro): Observable<string>{
    return this.http.post<string>(this.API+"/save",carro,{responseType: 'json'});
  }

  update(carro: Carro, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id,carro,{responseType: 'json'});
  }

  findById(id: number): Observable<Carro>{
    return this.http.get<Carro>(this.API+"/findById/"+id);
  }
}
