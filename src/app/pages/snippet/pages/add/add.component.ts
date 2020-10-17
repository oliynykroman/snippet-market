import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SnippetsService } from 'src/app/services/snippets.service';
import { UserService } from 'src/app/services/user.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public addSnippet: FormGroup;
  example = { body: "" };
  public snippet: any

  constructor(private fb: FormBuilder, private snippetService: SnippetsService,
    private userService: UserService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.addSnippet = this.fb.group({
      title: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      userId: this.fb.control(this.userService.getUser()),
      lang: this.fb.control('', Validators.required),
      body: this.fb.control('', Validators.required),
    });
  }

  openModal() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = "Congratulations!";
    modalRef.componentInstance.body = "Snippet added succesfull.";
    modalRef.componentInstance.closeButtonTitle = "Close and go to items list";
    modalRef.componentInstance.confirmButtonTitle = "Add new item";
    modalRef.result.then((result) => this.formAction(result));
  }

  formAction(result) {
    if (result === 'close') {
      this.router.navigate(['snippets']);
    }
  }

  onSubmit() {
    this.snippetService.addSnippet(this.addSnippet.value).subscribe((data) => {
      this.openModal();
    });
  }
}
