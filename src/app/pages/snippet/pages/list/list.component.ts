import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SnippetsService } from 'src/app/services/snippets.service';
import { SnippetModel } from 'src/app/models/snippet.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  error: string = null;
  public snippetList$: Observable<SnippetModel>;

  constructor(private snippetsService: SnippetsService) { }

  ngOnInit(): void {
    this.getItems(1);
  }

  getItems(userId) {
    this.snippetList$ = this.snippetsService.getSnippets(userId);

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
