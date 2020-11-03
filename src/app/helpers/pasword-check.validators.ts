import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export function MatchValidator(compareToField: FormControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const fromValue = control.value;
        const toValue = compareToField;

        if (toValue && fromValue === toValue) {
            console.log('valid');
            return { 'match': true };
        }
        console.log('invalid');
        return null;
    }
}
