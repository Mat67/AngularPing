export class Joueur {
    position: string;
    nom: string;
    classement: string;
    numeroLicence: string;
    isCapitaine: boolean;

    constructor (position:string) {
        this.position = position;
    }
}
