export class Joueur {
    position: string;
    nom: string;
    classement: string;
    numeroLicence: string;
    estCapitaine: boolean;


    constructor (position:string) {
        this.position = position;
    }

    static fabrique(data: any): Joueur {
      var joueur = new Joueur(data.position)
      joueur.nom = data.nom
      joueur.classement = data.classement
      joueur.numeroLicence = data.numeroLicence
      return joueur
    }
}
