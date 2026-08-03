import { FormControl } from '@angular/forms';
import { ScoreValidationDirective, scoreValidator } from './score-validation.directive';

describe('ScoreValidationDirective', () => {
  it('should create an instance', () => {
    const directive = new ScoreValidationDirective();
    expect(directive).toBeTruthy();
    const control = new FormControl('11-9');
    expect(directive.validate(control)).toBeNull();
  });

  describe('scoreValidator', () => {
    const validator = scoreValidator();

    it('should return null for empty or whitespace values', () => {
      expect(validator(new FormControl(''))).toBeNull();
      expect(validator(new FormControl('   '))).toBeNull();
      expect(validator(new FormControl(null))).toBeNull();
    });

    it('should return error for invalid format (not digits-digits)', () => {
      expect(validator(new FormControl('abc'))).toEqual({ value: 'abc' });
      expect(validator(new FormControl('11-'))).toEqual({ value: '11-' });
      expect(validator(new FormControl('11-9-5'))).toEqual({ value: '11-9-5' });
    });

    it('should return error when max score is less than 11 (no winner)', () => {
      expect(validator(new FormControl('10-8'))).toEqual({ value: '10-8' });
      expect(validator(new FormControl('9-5'))).toEqual({ value: '9-5' });
    });

    it('should return error when score difference is less than 2', () => {
      expect(validator(new FormControl('11-10'))).toEqual({ value: '11-10' });
      expect(validator(new FormControl('11-11'))).toEqual({ value: '11-11' });
    });

    it('should return error when max score is > 11 and difference is not exactly 2', () => {
      expect(validator(new FormControl('13-10'))).toEqual({ value: '13-10' });
      expect(validator(new FormControl('12-9'))).toEqual({ value: '12-9' });
    });

    it('should return null for valid scores', () => {
      expect(validator(new FormControl('11-9'))).toBeNull();
      expect(validator(new FormControl('11-0'))).toBeNull();
      expect(validator(new FormControl('5-11'))).toBeNull();
      expect(validator(new FormControl('12-10'))).toBeNull();
      expect(validator(new FormControl('10-12'))).toBeNull();
      expect(validator(new FormControl('15-13'))).toBeNull();
    });
  });
});
