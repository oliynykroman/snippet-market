import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HighlightResult } from 'ngx-highlightjs';
import { Observable } from 'rxjs';
import { SnippetModel } from 'src/app/models/snippet.model';
import { SnippetsService } from 'src/app/services/snippets.service';
import { UserService } from 'src/app/services/user.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  snippet: Observable<SnippetModel>;
  snippetId: number;
  response: HighlightResult;

  constructor(
    private snippetService: SnippetsService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {
    //
  }

  ngOnInit(): void {
    this.snippetId = this.route.snapshot.params.id;
    this.getSnippet(this.snippetId);
  }
  getSnippet(snippetId) {
    this.snippet = this.snippetService.getCurrentSnippet(snippetId);
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
  deleteItem() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = 'Delete confirmation';
    modalRef.componentInstance.body = `Do you really want to delete snippet id: ${this.snippetId}`;
    modalRef.componentInstance.confirmButtonTitle = `Delete`;
    modalRef.result.then((result) => {
      if (result === 'confirm') {
        this.snippetService.deleteSnippet(this.snippetId);
        this.router.navigate(['snippets'])
      } else {
        alert(`Oooops something wrong. Please reload page manually`);
      }
    });
  }

  editItem(id) {
    const modalRef = this.modalService.open(EditComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then((result) => {
      if (result === 'close') {
        this.getSnippet(this.userId, this.snippetId);
      } else {
        alert(`Oooops something wrong. Please reload page manually`);
      }
    });
  }

}
