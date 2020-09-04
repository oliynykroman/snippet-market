import { AbstractControl, ValidationErrors } from "@angular/forms"
import { UserService } from '../services/user.service';
import { Injector } from '@angular/core';

export const PasswordCheckValidator = function (control: AbstractControl): ValidationErrors | null {
    let value: string = control.value || '';
    let msg = "";

    let injector = Injector.create([ { provide: UserService, useClass:UserService,deps: []}])
    let service = injector.get(UserService);

    if (!value) {
        return null
    }

    if (service.getUser['password'] !== value) {
        return {
            passwordStrength: `${service.getUser['password']} - old, ${value}`
        }
    }
}