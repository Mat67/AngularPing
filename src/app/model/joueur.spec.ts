import { Joueur } from './joueur';

describe('Joueur', () => {
  it('should create an instance', () => {
    expect(new Joueur(1, 'A')).toBeTruthy();
  });

  it('joueur 2 equipe A à la lettre B', () => {
    expect(new Joueur(2, 'A').id).toBe('B');
  });

  it('joueur 6 equipe A à la lettre E', () => {
    expect(new Joueur(2, 'A').id).toBe('E');
  });

  it('joueur 3 equipe X à la lettre V', () => {
    expect(new Joueur(3, 'U').id).toBe('W');
  });

  it('joueur 6 equipe X à la lettre V', () => {
    expect(new Joueur(3, 'U').id).toBe('Z');
  });
});
