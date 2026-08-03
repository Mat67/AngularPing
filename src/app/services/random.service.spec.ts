import { TestBed } from '@angular/core/testing';
import { RandomService } from './random.service';

describe('RandomService', () => {
  let service: RandomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('random', () => {
    it('should return a number within the specified min and max range', () => {
      for (let i = 0; i < 50; i++) {
        const val = service.random(5, 10);
        expect(val).toBeGreaterThanOrEqual(5);
        expect(val).toBeLessThan(10);
      }
    });
  });

  describe('getRandomString', () => {
    it('should return a non-empty string of length between 5 and 10', () => {
      const str = service.getRandomString();
      expect(typeof str).toBe('string');
      expect(str.length).toBeGreaterThanOrEqual(5);
      expect(str.length).toBeLessThanOrEqual(10);
    });
  });

  describe('getRandomScore', () => {
    it('should return a string formatted as score "X-Y"', () => {
      const score = service.getRandomScore();
      expect(score).toMatch(/^\d+-\d+$/);
    });
  });
});
