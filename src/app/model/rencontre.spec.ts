import { Rencontre } from './rencontre';
import { Joueur } from './joueur';
import { RencontreSimple } from './rencontre-simple';

describe('Rencontre', () => {
  it('should create an instance', () => {
    expect(new RencontreSimple(new Joueur('A'), new Joueur('B'))).toBeTruthy();
  });
});
