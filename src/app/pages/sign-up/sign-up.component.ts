import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordStrengthValidator } from 'src/app/helpers/pasword-sterngth.validators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { }

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
  }
 
  get f() {
    return this.registrationForm.controls;
  }
  public onSubmit(): void {
    this.userService.registration(this.registrationForm.value).subscribe({
      error: (err) => {
        // this.errorMessage = err.error.message;
      }
    });
    // this.loginForm.reset();
  }
}
