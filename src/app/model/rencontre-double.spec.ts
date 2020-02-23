import { RencontreDouble } from './rencontre-double';

describe('RencontreDouble', () => {
  it('should create an instance', () => {
    expect(new RencontreDouble('D1')).toBeTruthy();
  });

  it('Retourne le nom des joueurs de l equipe receveuse', () => {
    expect(new RencontreDouble('AB').getNomJoueurEquipeReceveuse()).toBe('AB');
  });

  it('Retourne le nom des joueurs de l equipe receveuse', () => {
    expect(new RencontreDouble('XY').getNomJoueurEquipeVisiteuse()).toBe('XY');
  });
});
