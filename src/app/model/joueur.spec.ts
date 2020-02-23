import { Joueur } from './joueur';

describe('Joueur', () => {
  it('should create an instance', () => {
    expect(new Joueur(1, 'A')).toBeTruthy();
  });

  it('joueur 2 equipe A à la lettre B', () => {
    expect(new Joueur(2, 'A').id).toBe('B');
  });
});
