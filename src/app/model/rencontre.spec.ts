import { Rencontre } from './rencontre';
import { Joueur } from './joueur';

describe('Rencontre', () => {
  it('should create an instance', () => {
    expect(new Rencontre(new Joueur('A'), new Joueur('B'))).toBeTruthy();
  });
});
