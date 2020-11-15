import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordStrengthValidator } from 'src/app/helpers/pasword-sterngth.validators';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  public errorMessage: string;
  public successMessage: string;
  public registrationForm: FormGroup;
  public subscription = new Subscription();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
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


  get f() {
    return this.registrationForm.controls;
  }
  onSubmit(): void {
    this.subscription = this.authService.registration(this.registrationForm.value).subscribe({
      next: () => {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.title = "Congratulations!";
        modalRef.componentInstance.body = "Registration successfull!. Please login for using service. Thank you.";
        modalRef.result.then((result) => {
          if (result === 'close') {
            this.router.navigate(['/login']);
          }
        }
        )
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    });
    this.registrationForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
