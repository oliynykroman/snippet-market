import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SnippetModel } from '../models/snippet.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { find, first, map, tap } from 'rxjs/operators';
import { once } from 'process';
import { UserService } from './user.service';
const api = environment;
@Injectable({
  providedIn: 'root'
})
export class SnippetsService {

  private userId: number = null

  constructor(private http: HttpClient, private userService: UserService) {
    this.userId = this.userService.getUser().userId;
  }

  public getAllSnippets() {
    return this.http.get<SnippetModel>(`${api.userDataDomain}/snippets?userId=${this.userId}`);
  }
  public getCurrentSnippet(snippetId): Observable<SnippetModel> {
    return this.http.get<SnippetModel>(`${api.userDataDomain}/snippets?userId=${this.userId}&id=${snippetId}`).pipe(
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
