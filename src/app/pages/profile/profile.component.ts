import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PasswordCheckValidator } from 'src/app/helpers/pasword-check.validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public isPasswordChange = false;
  public profileForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.formInit();
    this.userService.getUser();
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


}
