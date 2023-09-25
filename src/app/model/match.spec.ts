import { Match, Match6 } from './match';
import { Rencontre, RencontreDouble, RencontreSimple } from './rencontre';

describe('Match', () => {
  it('should create an instance', () => {
    expect(new Match6()).toBeTruthy();
  });

  it('Match 1 A contre U', () => {
    var match =  new Match6()

    var rencontre = match.rencontres[0] as RencontreSimple;
    expect(rencontre.joueurEquipeReceveuse.position).toBe('A');
    expect(rencontre.joueurEquipeVisiteuse.position).toBe('U');
  });

  it('match est pas termine', () => {
    var match =  new Match6();
    expect(match.matchEstTermine()).toBe(false);
  });

  it('match est termine', () => {
    var match =  new Match6();
    match.rencontres = [];

    var rencontre = new RencontreDouble('AB');
    rencontre.manches[0].score = '11-9';
    rencontre.manches[1].score = '11-4';
    rencontre.manches[2].score = '11-7';
    match.rencontres.push(rencontre);
    expect(match.matchEstTermine()).toBe(true);
  });

  it('Saison 20xx/20xx', () => {
    var match =  new Match6();
    
    var expectedSaison = new Date().getFullYear() + "/" + (new Date().getFullYear() + 1) 
    
    expect(match.getSaison()).toBe(expectedSaison);
  });
});
