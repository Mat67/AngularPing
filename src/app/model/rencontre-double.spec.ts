import { RencontreDouble } from './rencontre-double';

describe('RencontreDouble', () => {
  it('should create an instance', () => {
    expect(new RencontreDouble('D1')).toBeTruthy();
  });

  it('Retourne le nom des joueurs de l equipe receveuse', () => {
    var rencontre = new RencontreDouble('D1');
    rencontre.doubleEquipeReceveuse = 'AB';
    expect(rencontre.getNomJoueurEquipeReceveuse()).toBe('AB');
  });

  it('Retourne le nom des joueurs de l equipe receveuse', () => {
    var rencontre = new RencontreDouble('DD');
    rencontre.doubleEquipeVisiteuse = 'XY';
    expect(rencontre.getNomJoueurEquipeVisiteuse()).toBe('XY');
  });
});
