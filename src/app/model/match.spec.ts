import { Match } from './match';
import { RencontreSimple } from './rencontre-simple';
import { Rencontre } from './rencontre';
import { RencontreDouble } from './rencontre-double';

describe('Match', () => {
  it('should create an instance', () => {
    expect(new Match(6)).toBeTruthy();
  });

  it('Match 1 A contre U', () => {
    var rencontre =  new Match(6).rencontres[0] as RencontreSimple;
    expect(rencontre.joueurEquipeReceveuse.position).toBe('A');
    expect(rencontre.joueurEquipeVisiteuse.position).toBe('U');
  });

  it('match est pas termine', () => {
    var match =  new Match(6);
    expect(match.matchEstTermine()).toBe(false);
  });

  it('match est termine', () => {
    var match =  new Match(6);
    match.rencontres = [];
    
    var rencontre = new RencontreDouble('AB');
    rencontre.manches[0].score = '11-9';
    rencontre.manches[1].score = '11-4';
    rencontre.manches[2].score = '11-7';
    match.rencontres.push(rencontre);
    expect(match.matchEstTermine()).toBe(true);
  });

  it('Saison 2019/2020', () => {
    var match =  new Match(6);
    expect(match.getSaison()).toBe('2019/2020');
  });
});
