import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PasswordCheckValidator } from 'src/app/helpers/pasword-check.validators';
import { Observable, Subscription } from 'rxjs';
import { UserData } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public userInfo$: Observable<UserData>;
  public userGitInfo;
  public isPasswordChange = false;
  public error: string = null;
  public profileForm: FormGroup;


  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.formInit();
    this.userService.getUserData().subscribe((data) => {

    });
    this.userService.test().subscribe(data => {
      console.log('ffff', data);
      this.userGitInfo = data.userGit;
      this.profileForm.patchValue({
        firstName: data.userServer.firstName,
        secondName: data.userServer.secondName,
        email: data.userServer.email,
        gitProfile: data.userServer.gitProfile
      });
    });
  }

  /**
   *get data from GIThub
   *
   * @param {*} gitUrl
   * @memberof ProfileComponent
   */
  getGitData(userName) {
    // this.userService.getGitData(userName);
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
  }

}
