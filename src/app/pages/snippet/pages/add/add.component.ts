import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SnippetsService } from 'src/app/services/snippets.service';
import { UserService } from 'src/app/services/user.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { Router } from '@angular/router';
import { switchMap, first, tap } from 'rxjs/operators';
import { SnippetModel } from 'src/app/models/snippet.model';

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
    modalRef.componentInstance.title = "Snippet added succesfull.";
  }

  onSubmit() {
    this.snippetService.addSnippet(this.addSnippet.value).pipe(
      switchMap((result) => this.snippetService.addSnippet(result)),
      tap(() => {
        console.log('cds');
        this.router.navigate(['/profile']);
      }),
      first());
  }
}
