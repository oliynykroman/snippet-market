import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SnippetModel } from 'src/app/models/snippet.model';
import { SnippetsService } from 'src/app/services/snippets.service';
import { UserService } from 'src/app/services/user.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input() id = null;
  userId: number = null;
  formData: SnippetModel;

  constructor(private snippetService: SnippetsService, private modalService: NgbModal, private userService: UserService, private activeModal: NgbActiveModal) {
    //
  }

  ngOnInit(): void {
    this.userId = this.userService.getUser();
    this.getFormData();
  }

  openModal() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = "Congratulations!";
    modalRef.componentInstance.body = "Snippet edited succesfull.";
    modalRef.componentInstance.closeButtonTitle = "Close";
    modalRef.result.then((result) => {
      console.log(result);
      if (result === 'close') {
        this.activeModal.close('close');
      }
    });
  }

  getFormData() {
    this.snippetService.getCurrentSnippet(this.userId, this.id).subscribe((data) => {
      this.formData = data;
    });
  }

  onSubmit($event) {
    this.snippetService.editSnippet($event.value, this.id).subscribe(() => {
      this.openModal();
    });
  }
}
