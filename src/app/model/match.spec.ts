import { Match } from './match';
import { RencontreSimple } from './rencontre-simple';

describe('Match', () => {
  it('should create an instance', () => {
    expect(new Match(6)).toBeTruthy();
  });

  it('Match 1 A contre U', () => {
    var rencontre =  new Match(6).rencontres[0] as RencontreSimple;
    expect(rencontre.joueurEquipeReceveuse.position).toBe('A');
    expect(rencontre.joueurEquipeVisiteuse.position).toBe('U');
  });
});
