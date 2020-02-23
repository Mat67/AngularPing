import { Rencontre } from './rencontre';
import { Joueur } from './joueur';
import { RencontreSimple } from './rencontre-simple';

describe('Rencontre', () => {
  it('should create an instance', () => {
    expect(new RencontreSimple(new Joueur('A'), new Joueur('B'))).toBeTruthy();
  });

  it('match non commencé', () => {
    var rencontre = new RencontreSimple(new Joueur('A'), new Joueur('B'));
    expect(rencontre.getVainqueur()).toBe('');
  });

  it('match non terminé', () => {
    var rencontre = new RencontreSimple(new Joueur('A'), new Joueur('B'));
    rencontre.manches[0].score = "11-9";
    expect(rencontre.getVainqueur()).toBe('');
  });

  it('Victoire 3-0 joueur A', () => {
    var rencontre = new RencontreSimple(new Joueur('A'), new Joueur('B'));
    rencontre.manches[0].score = "11-9";
    rencontre.manches[1].score = "21-19";
    rencontre.manches[2].score = "11-0";
    expect(rencontre.getVainqueur()).toBe('A');
  });


  it('Victoire 3-0 joueur B', () => {
    var rencontre = new RencontreSimple(new Joueur('A'), new Joueur('B'));
    rencontre.manches[0].score = "0-11";
    rencontre.manches[1].score = "0-11";
    rencontre.manches[2].score = "0-11";
    expect(rencontre.getVainqueur()).toBe('B');
  });

  it('Victoire 3-2 joueur B', () => {
    var rencontre = new RencontreSimple(new Joueur('A'), new Joueur('B'));
    rencontre.manches[0].score = "0-11";
    rencontre.manches[1].score = "8-11";
    rencontre.manches[2].score = "11-9";
    rencontre.manches[2].score = "12-10";
    rencontre.manches[2].score = "12-14";
    expect(rencontre.getVainqueur()).toBe('B');
  });
});
