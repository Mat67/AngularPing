import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { Manche } from './model/manche';

export function scoreValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || control.value.trim() === '')
      return null;

    const val = control.value.trim();
    if (!/^\d+-\d+$/.test(val)) {
      return { value: control.value };
    }

    const scores = val.split('-');
    const s0 = parseInt(scores[0], 10);
    const s1 = parseInt(scores[1], 10);

    if (isNaN(s0) || isNaN(s1)) {
      return { value: control.value };
    }

    const maxScore = Math.max(s0, s1);
    const diff = Math.abs(s0 - s1);

    // Aucun gagnant (aucun joueur >= 11)
    if (maxScore < 11) {
      return { value: control.value };
    }

    // Écart minimal de 2 points obligatoire
    if (diff < 2) {
      return { value: control.value };
    }

    // Si le vainqueur a plus de 11 points, l'écart doit être exactement de 2 points (ex: 12-10, 13-11)
    if (maxScore > 11 && diff !== 2) {
      return { value: control.value };
    }

    return null;
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
