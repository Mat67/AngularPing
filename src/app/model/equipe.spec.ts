import { Equipe } from './equipe';

describe('Equipe', () => {
  it('should create an instance', () => {
    expect(Equipe.fabriqueNouvelleEquipe(6, 'A')).toBeTruthy();
  });

  it('joueur 2 equipe A à la lettre B', () => {
    expect(Equipe.fabriqueNouvelleEquipe(6, 'A').joueurs[1].position).toBe('B');
  });

  it('joueur 6 equipe A à la lettre F', () => {
    expect(Equipe.fabriqueNouvelleEquipe(6, 'A').joueurs[5].position).toBe('F');
  });

  it('joueur 3 equipe X à la lettre W', () => {
    expect(Equipe.fabriqueNouvelleEquipe(6, 'U').joueurs[2].position).toBe('W');
  });

  it('joueur 6 equipe X à la lettre Z', () => {
    expect(Equipe.fabriqueNouvelleEquipe(6, 'U').joueurs[5].position).toBe('Z');
  });

  it('Recuperation du joueur U', () => {
    expect(Equipe.fabriqueNouvelleEquipe(6, 'U').getJoueurByPosition('U').position).toBe('U');
  });

  it('Recuperation du joueur E', () => {
    expect(Equipe.fabriqueNouvelleEquipe(6, 'A').getJoueurByPosition('E').position).toBe('E');
  });

  it('should create Equipe using fabrique method with existing data', () => {
    const rawJoueurs = [
      { position: 'A', nom: 'Alice', estCapitaine: false },
      { position: 'B', nom: 'Bob', estCapitaine: true }
    ];
    const equipe = Equipe.fabrique('TT Paris', rawJoueurs);

    expect(equipe.nomEquipe).toBe('TT Paris');
    expect(equipe.joueurs.length).toBe(2);
    expect(equipe.joueurs[0].nom).toBe('Alice');
    expect(equipe.joueurs[1].nom).toBe('Bob');
  });

  it('should return capitaine using getCapitaine()', () => {
    const rawJoueurs = [
      { position: 'A', nom: 'Alice', estCapitaine: false },
      { position: 'B', nom: 'Bob', estCapitaine: true }
    ];
    const equipe = Equipe.fabrique('TT Paris', rawJoueurs);
    const cap = equipe.getCapitaine();

    expect(cap).toBeTruthy();
    expect(cap?.nom).toBe('Bob');
  });
});
