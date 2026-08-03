import { Manche } from './manche';

describe('Manche', () => {
  it('should create an instance', () => {
    expect(new Manche()).toBeTruthy();
  });

  it('should create Manche from fabrique method', () => {
    const manche = Manche.fabrique('11-9');
    expect(manche).toBeTruthy();
    expect(manche.score).toBe('11-9');
  });

  describe('getResultat', () => {
    it('should return 0 when score is empty or invalid', () => {
      const manche = new Manche();
      expect(manche.getResultat()).toBe(0);

      manche.score = 'invalid';
      expect(manche.getResultat()).toBe(0);

      manche.score = '11-';
      expect(manche.getResultat()).toBe(0);
    });

    it('should return difference p1 - p2 when score is valid', () => {
      const manche = new Manche();
      manche.score = '11-9';
      expect(manche.getResultat()).toBe(2);

      manche.score = '8-11';
      expect(manche.getResultat()).toBe(-3);

      manche.score = '12-10';
      expect(manche.getResultat()).toBe(2);
    });
  });
});
