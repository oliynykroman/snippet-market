import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UserData, UserGitData } from 'src/app/models/user.model';
import { PasswordStrengthValidator } from 'src/app/helpers/pasword-sterngth.validators';
import { MatchValidator } from 'src/app/helpers/pasword-check.validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public userInfo$: Observable<UserData>;
  public userGitInfo: UserGitData = null;
  public isPasswordChange: boolean = false;
  public error: string = null;
  public profileForm: FormGroup;
  private subscrition: Subscription;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.formInit();

    this.userService.getUserData().subscribe(data => {
      this.userGitInfo = data.userGit;
      this.profileForm.patchValue({
        firstName: data.userServer.firstName,
        secondName: data.userServer.secondName,
        email: data.userServer.email,
        gitProfile: data.userServer.gitProfile
      });
    });
  }

  formInit() {
    this.profileForm = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      secondName: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required),
      gitProfile: this.fb.control('', Validators.required)
    });
  }

  get f() {
    return this.profileForm.controls;
  }

  matchValidator(control: AbstractControl): ValidationErrors | null {
    const fromValue = control.value;
    const toValue = (<FormGroup>this.profileForm.get('newPass')).value;

    if (toValue && fromValue === toValue) {
      console.log('valid');
      return { 'match': true };
    }
    console.log('invalid');
    return null;
  }

  changePassword() {
    this.isPasswordChange = !this.isPasswordChange;
    this.profileForm.addControl('newPass', this.fb.control('qqQQ11__', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      PasswordStrengthValidator
    ])));
    this.profileForm.addControl('newPassConfirm', this.fb.control('qqQQ11__', [
      Validators.required,
      MatchValidator(this.profileForm.get('newPass').value)]
    ));

    setTimeout(() => {
      const invalid = [];
      const controls = this.profileForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
        }
      }
      console.log(invalid);
    }, 1000)
  }

  onSubmit() {
    let formData = this.profileForm.value;
    console.log(formData);
    this.subscrition = this.userService.saveUserData(formData).subscribe(
      success => {
        alert('edited created!');
      },
      error => alert(`Oooops something wrong. Please try again later`)
    );
  }

  ngOnDestroy() {
    this.subscrition.unsubscribe();
  }
}
