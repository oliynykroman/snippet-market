import { Component, OnInit } from '@angular/core';
import { SnippetsService } from 'src/app/services/snippets.service';
import { SnippetModel } from 'src/app/models/snippet.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  error: string = null;
  public snippetList: SnippetModel;

  constructor(private snippetsService: SnippetsService) { }

  ngOnInit(): void {
    this.snippetsService.getSnippets(1).subscribe(data => this.snippetList = data);
  }
  deleteItem(id) {
    this.snippetsService.deleteSnippet(id).subscribe({
      next(data) {
      },
      error(msg) {
        this.error = msg;
      }
    });
  }

}
