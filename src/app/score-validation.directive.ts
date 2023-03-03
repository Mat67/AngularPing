import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || control.value === '')
      return null


    var scores = control.value.split('-')

    if (scores.length !== 2 || (scores[0] < 11 && scores[1] < 11))
      return {forbiddenName: {value: control.value}}
    else
      return null

  };
}


@Directive({
  selector: '[appScoreValidation]',
  providers: [{provide: NG_VALIDATORS, useExisting: ScoreValidationDirective, multi: true}]
})
export class ScoreValidationDirective implements Validator {


  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return forbiddenNameValidator()(control)
  }

}
