import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordStrengthValidator } from 'src/app/helpers/pasword-sterngth.validators';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public errorMessage: string;
  public successMessage: string;
  public registrationForm: FormGroup;
  @Output() closeResult: EventEmitter<boolean> = new EventEmitter();
  result: any;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private modalService: NgbModal) { }

  public formInit() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        PasswordStrengthValidator
      ])]
    })
  }

  ngOnInit(): void {
    this.formInit();
    const modalRef = this.modalService.open(ModalComponent,);
    modalRef.componentInstance.title = "Congratulations!";
    modalRef.componentInstance.body = "Registration successfull!. Please login for using service. Thank you.";
    
    modalRef.result.then(
      (result) => {
        this.result = result;
        result == 'OK' ? this.closeResult.emit(true) : this.closeResult.emit(false);
        console.log(result);
      },
      (reason) => {
        this.result = reason;
        this.closeResult.emit(false);
        console.log(reason);
      }
    );


  }

  get f() {
    return this.registrationForm.controls;
  }
  public onSubmit(): void {
    this.userService.registration(this.registrationForm.value).subscribe({
      next: () => {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.title = "Congratulations!";
        modalRef.componentInstance.title = "Registration successfull!. Please login for using service. Thank you.";

        // this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    });
    this.registrationForm.reset();
  }
}
