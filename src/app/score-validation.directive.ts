import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}


@Directive({
  selector: '[appScoreValidation]',
  providers: [{provide: NG_VALIDATORS, useExisting: ScoreValidationDirective, multi: true}]
})
export class ScoreValidationDirective implements Validator {
  @Input('appScoreValidation') forbiddenName = '';

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenName ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
                              : null;
  }

}
