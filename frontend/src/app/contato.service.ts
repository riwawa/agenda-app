import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contato } from './contato/contato';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private readonly apiUrl = 'http://localhost:8080/api/contatos';

  constructor(private http: HttpClient) {}

  save(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.apiUrl, contato);
  }

  list(page: number, size: number): Observable<Contato[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Contato[]>(this.apiUrl, { params });
  }

  favourite(contato: Contato): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${contato.id}/favorito`, {});
  }

  upload(contato: Contato, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${contato.id}/foto`, formData, {
      observe: 'events',
      reportProgress: true
    });
  }
}
