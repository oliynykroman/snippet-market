import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SnippetsService } from 'src/app/services/snippets.service';
import { SnippetModel } from 'src/app/models/snippet.model';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UserData } from 'src/app/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public error: string = null;
  public snippetList: SnippetModel;
  public userId: number = null;

  constructor(private snippetsService: SnippetsService, private modalService: NgbModal, private userService: UserService) { }

  ngOnInit(): void {
    this.userId = this.userService.getUser();
    this.getItems(this.userId);

  }

  getItems(userId) {
    this.snippetsService.getAllSnippets(userId).subscribe(data => {
      this.snippetList = data;
    });

  }
  deleteItem(id) {
    this.snippetsService.deleteSnippet(id).subscribe(
      success => this.getItems(this.userId),
      error => alert(`Oooops something wrong: ${error}. Please try again later`)
    );
  }

  editItem(id) {
    const modalRef = this.modalService.open(EditComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then((result) => {
      if (result === 'close') {
        this.getItems(this.userId);
      } else {
        alert(`Oooops something wrong. Please reload page manually`);
      }
    });
  }
}
