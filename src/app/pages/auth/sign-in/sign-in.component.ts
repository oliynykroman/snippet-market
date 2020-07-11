import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordStrengthValidator } from 'src/app/helpers/pasword-sterngth.validators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public loginForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  public initForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ])],
      password: [null, Validators.compose([
        Validators.required,
        Validators.minLength(8),
        PasswordStrengthValidator
      ])]
    });
  }
  public ngOnInit(): void {
    this.initForm();
  }

  public submit() {
    console.log(this.loginForm.value);
  }

}
