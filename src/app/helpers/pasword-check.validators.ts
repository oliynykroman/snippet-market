import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"

export const MatchValidator(matchField: FormControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null {
        let value: string = control.value || '';
        const fromValue = control.value;
        const toValue = matchField;

        if (toValue && fromValue === toValue) {
            console.log('valid');
            return { 'match': true };
        }
        console.log('invalid');
        return null;
    }
}
