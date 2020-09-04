import { Component, OnInit } from '@angular/core';
import { SnippetsService } from 'src/app/services/snippets.service';
import { SnippetModel } from 'src/app/models/snippet.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public snippetList: SnippetModel;

  constructor(private snippetsService: SnippetsService) { }

  ngOnInit(): void {
    this.snippetsService.getSnippets(1).subscribe(data => this.snippetList = data);
  }
  delete(id) {

  }

}
