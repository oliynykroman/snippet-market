import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PasswordCheckValidator } from 'src/app/helpers/pasword-check.validators';
import { Subscription } from 'rxjs';
import { UserData } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public userId;
  public userInfo: UserData;
  public userGitInfo;
  public isPasswordChange = false;
  public error: string = null;
  public profileForm: FormGroup;

  private subscription: Subscription;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.formInit();
    this.userId = this.userService.getUser();
    this.subscription = this.userService.getUserInfo(this.userId).subscribe((data) => { this.userInfo = data },
      error => this.error = error.status);
    console.log('user info', this.userInfo);

  }

  // will get git data
  getGitData(gitUrl) {
    if (gitUrl) {
      this.subscription = this.userService.getGitData(gitUrl).subscribe((data) => { this.userGitInfo = data; console.log(data) },
        error => this.error = error.status);
    }
  }

  formInit() {
    this.profileForm = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      secondName: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required),
      gitProfile: this.fb.control('', Validators.required),

    });
  }

  get f() {
    return this.profileForm.controls;
  }

  get newPass() {
    return (<FormGroup>this.profileForm.get('newPassConfirm'));
  }

  matchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const fromValue = control.value;
    if (this.profileForm) {
      const toValue = (<FormGroup>this.profileForm.get('newPass')).value;
      if (toValue && fromValue === toValue) {
        return { 'fieldMatch': true };
      }
      return null;
    }
  }

  changePassword() {
    this.isPasswordChange = !this.isPasswordChange;
    this.profileForm.addControl('newPass', this.fb.control('', Validators.required));
    this.profileForm.addControl('newPassConfirm', this.fb.control('', this.matchValidator.bind(this)));
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
