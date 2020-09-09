import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SnippetModel } from '../models/snippet.model';
const api = environment;
@Injectable({
  providedIn: 'root'
})
export class SnippetsService {

  constructor(private http: HttpClient) { }
  public getSnippets(userId) {
    return this.http.get<SnippetModel>(`${api.userDataDomain}/snippets?userId=${userId}`);
  }
  public addSnippet(data) {
    return this.http.post<SnippetModel>(`${api.userDataDomain}/snippets`, data);
  }
  public editSnippet(id, data) {
    return this.http.patch<SnippetModel>(`${api.userDataDomain}/snippets/${id}`, data);
  }
  public deleteSnippet(id) {
    return this.http.delete<SnippetModel>(`${api.userDataDomain}/snippets/${id}`);
  }
}
