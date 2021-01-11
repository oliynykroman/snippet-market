import { Component, OnInit } from '@angular/core';
import { SnippetsService } from 'src/app/services/snippets.service';
import { SnippetModel } from 'src/app/models/snippet.model';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from '../edit/edit.component';
import { concatMap, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public error: string = null;
  public snippetList: SnippetModel;
  public userId: number = null;
  public updateList = new BehaviorSubject<boolean>(false);

  constructor(private snippetsService: SnippetsService, private modalService: NgbModal, private userService: UserService) { }

  ngOnInit(): void {
    this.getItems();
    this.updateList.subscribe(update=>update === true ? this.getItems() : '');
  }

  getItems() {
    this.snippetsService.getAllSnippets().subscribe(data => {
      this.snippetList = data;
    });

  }
  deleteItem(id) {
    this.snippetsService.deleteSnippet(id).subscribe(()=>this.updateList.next(true));
  }

  editItem(id) {
    const modalRef = this.modalService.open(EditComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then((result) => {
      if (result === 'close') {
        this.getItems();
      } else {
        alert(`Oooops something wrong. Please reload page manually`);
      }
    });
  }
}
