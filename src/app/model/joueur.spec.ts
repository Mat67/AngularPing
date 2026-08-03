import { Joueur } from './joueur';

describe('Joueur', () => {
  it('should create an instance', () => {
    const joueur = new Joueur('A');
    expect(joueur).toBeTruthy();
    expect(joueur.position).toBe('A');
  });

  it('should create a Joueur from static fabrique method', () => {
    const data = {
      position: 'B',
      nom: 'Dupont',
      classement: '500',
      numeroLicence: '123456',
      estCapitaine: true
    };
    const joueur = Joueur.fabrique(data);

    expect(joueur.position).toBe('B');
    expect(joueur.nom).toBe('Dupont');
    expect(joueur.classement).toBe('500');
    expect(joueur.numeroLicence).toBe('123456');
    expect(joueur.estCapitaine).toBeTrue();
  });

  it('should return nom on toString()', () => {
    const joueur = new Joueur('A');
    joueur.nom = 'Martin';
    expect(joueur.toString()).toBe('Martin');
  });
});
