import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SnippetModel } from '../models/snippet.model';
import { find, first, map, mergeAll } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
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
    return this.http.get<SnippetModel>(`snippets?userId=${this.userId}`);
  }
  public getCurrentSnippet(snippetId) {
    return this.http.get(`snippets?userId=${this.userId}&id=${snippetId}`).pipe(
      mergeAll(),
      first()
    );
  }

  // toDo create right url
  public searchSnippets(searchPhrase) {
    return this.http.get<SnippetModel>(`snippets?userId=${this.userId}&id=${searchPhrase}`).pipe(
      first()
    );
  }
  public addSnippet(data) {
    return this.http.post<SnippetModel>(`snippets`, data);
  }
  public editSnippet(data, id) {
    return this.http.patch<SnippetModel>(`snippets/${id}`, data);
  }
  public deleteSnippet(id) {
    return this.http.delete<SnippetModel>(`snippets/${id}`);
  }
}
