import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordStrengthValidator } from 'src/app/helpers/pasword-sterngth.validators';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public passwordHidden: boolean = true;
  public errorMessage: string = '';

  public loginForm: FormGroup;
  public subscribtion = Subscription;
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  public initForm() {
    this.loginForm = this.fb.group({
      email: ['bruno@email.com', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ])],
      password: ['QQww11__', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        PasswordStrengthValidator
      ])]
    });
  }
  public ngOnInit(): void {
    this.initForm();
  }

  // get formcontrolls
  get f() { return this.loginForm.controls; }


  public showHidePass(el: any) {
    this.passwordHidden = !this.passwordHidden;
    el.type === 'password' ? el.type = 'text' : el.type = 'password';
  }

  public submit(): void {
    this.authService.login(this.loginForm.value).subscribe({
      error: (err) => {
        this.errorMessage = err;
      }
    });
    this.loginForm.reset();
  }
}
