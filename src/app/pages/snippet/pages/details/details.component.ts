import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HighlightResult } from 'ngx-highlightjs';
import { Observable } from 'rxjs';
import { SnippetModel } from 'src/app/models/snippet.model';
import { SnippetsService } from 'src/app/services/snippets.service';
import { UserService } from 'src/app/services/user.service';
import { SnippetModule } from '../../snippet.module';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {


  snippet: Observable<SnippetModel>;
  userId: number;
  routeId: number;
  response: HighlightResult;

  code = `function myFunction() {
    document.getElementById("demo1").innerHTML = "Hello there!";
    document.getElementById("demo2").innerHTML = "How are you?";
  }`


  constructor(private userService: UserService, private snippetService: SnippetsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.userService.getUser();
    this.routeId = this.route.snapshot.params.id;
    this.getSnippet(this.userId, this.routeId);
  }
  getSnippet(userId, routeId) {
    this.snippet = this.snippetService.getCurrentSnippet(userId, routeId);
  }
  onHighlight(e) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      second_best: '{...}',
      top: '{...}',
      value: '{...}'
    }
  }

}
