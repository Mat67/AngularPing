export class Joueur {
    position: number;
    id: string;
    nom: string;
    classement: string;
    numeroLicence: string;

    constructor (position:number, lettre:string) {
        this.position = position;
        this.id = this.getLettreAlphabet(lettre);
    }

    private getLettreAlphabet(lettre:string) {
        return String.fromCharCode(lettre.charCodeAt(0) + this.position - 1);
    }
}
