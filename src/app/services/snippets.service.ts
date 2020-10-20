import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SnippetModel } from '../models/snippet.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { find, first, map, tap } from 'rxjs/operators';
import { once } from 'process';
const api = environment;
@Injectable({
  providedIn: 'root'
})
export class SnippetsService {

  constructor(private http: HttpClient) { }

  public getAllSnippets(userId) {
    return this.http.get<SnippetModel>(`${api.userDataDomain}/snippets?userId=${userId}`);
  }
  public getCurrentSnippet(userId, snippetId): Observable<SnippetModel> {
    return this.http.get<SnippetModel>(`${api.userDataDomain}/snippets?userId=${userId}&id=${snippetId}`).pipe(
      first()
    );
  }
  public addSnippet(data) {
    return this.http.post<SnippetModel>(`${api.userDataDomain}/snippets`, data);
  }
  public editSnippet(data, id) {
    return this.http.patch<SnippetModel>(`${api.userDataDomain}/snippets/${id}`, data);
  }
  public deleteSnippet(id) {
    return this.http.delete<SnippetModel>(`${api.userDataDomain}/snippets/${id}`);
  }
}
