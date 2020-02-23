import { RencontreSimple } from './rencontre-simple';
import { Joueur } from './joueur';

describe('RencontreSimple', () => {
  it('should create an instance', () => {
    expect(new RencontreSimple(new Joueur('A'), new Joueur('U'))).toBeTruthy();
  });
});
