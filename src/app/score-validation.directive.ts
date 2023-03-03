import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { Manche } from './model/manche';

export function scoreValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || control.value === '')
      return null


    var scores = control.value.split('-')

    if (scores.length !== 2
      || (scores[0] < 11 && scores[1] < 11) // Aucun gagant

      || (Math.abs(scores[1] - scores[0]) < 2) // Différence de 2 min points non respectée
      || ((scores[0] > 11 || scores[1] > 11) && Math.abs(scores[1] - scores[0]) !== 2)) // différence de 2 points obligatoire si score > 11
        return {value: control.value}
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
    return scoreValidator()(control)
  }

}
