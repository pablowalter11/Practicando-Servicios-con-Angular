import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personaje } from '../interfaces/personajes.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PersonajeService {

  constructor(private http: HttpClient) { }

  urlBase = environment.urlbase

  getPj(): Observable<Personaje[]> {
    return this.http.get<Personaje[]>(this.urlBase)
  }

  getPjById(id: string | null): Observable<Personaje> {
    return this.http.get<Personaje>(`${this.urlBase}/${id}`)
  }

  postPj(pj: Personaje): Observable<Personaje> {
    return this.http.post<Personaje>(this.urlBase, pj)
  }

  putPj(pj: Personaje, id: string | null): Observable<Personaje> {
    return this.http.put<Personaje>(`${this.urlBase}/${id}`, pj)
  }

  deletePjById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}`)
  }
}
