import { Equipe } from './equipe';

describe('Equipe', () => {
  it('should create an instance', () => {
    expect(new Equipe(6, 'A')).toBeTruthy();
  });

  it('joueur 2 equipe A à la lettre B', () => {
    expect(new Equipe(6, 'A').joueurs[1].position).toBe('B');
  });

  it('joueur 6 equipe A à la lettre E', () => {
    expect(new Equipe(6, 'A').joueurs[5].position).toBe('F');
  });

  it('joueur 3 equipe X à la lettre V', () => {
    expect(new Equipe(6, 'U').joueurs[2].position).toBe('W');
  });

  it('joueur 6 equipe X à la lettre V', () => {
    expect(new Equipe(6, 'U').joueurs[5].position).toBe('Z');
  });

  it('Recuperation du joueur U', () => {
    expect(new Equipe(6, 'U').getJoueurById('U').position).toBe('U');
  });

  it('Recuperation du joueur E', () => {
    expect(new Equipe(6, 'A').getJoueurById('E').position).toBe('E');
  });
});
