import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../model/match';
import { RepositoryService } from '../services/repository.service';

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.css']
})
export class PrintPageComponent implements OnInit {
  @Input() match: Match;
  signatureEquipeReceveuse: any;
  signatureEquipeVisiteuse: any;

  constructor(private repository: RepositoryService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

  }

  getDateHeure() {
    return `${this.getDate()} ${this.getHeure()}`
  }


  getDate() {
    var date = this.match?.Date

    if (date) {
      // Créez un objet Date à partir de la chaîne de date
      const dateObj = new Date(date);

      // Extrayez le jour, le mois et l'année
      const jour = dateObj.getDate();
      const mois = dateObj.getMonth() + 1; // Les mois sont indexés à partir de zéro
      const annee = dateObj.getFullYear();

      // Assurez-vous d'avoir deux chiffres pour le jour et le mois
      const jourFormat = jour < 10 ? `0${jour}` : jour;
      const moisFormat = mois < 10 ? `0${mois}` : mois;

      // Concaténez les éléments pour obtenir le format JJ/MM/AAAA
      const dateFormatee = `${jourFormat}/${moisFormat}/${annee}`;

      return dateFormatee;
    }

    return null;
  }

  getHeure() {
     var heureObj = this.match?.Heure
    
     if (heureObj) {
        // Extrayez les heures et les minutes
        const heures = heureObj['hour'];
        const minutes = heureObj['minute'];

        // Assurez-vous d'avoir deux chiffres pour les heures et les minutes
        const heuresFormat = heures < 10 ? `0${heures}` : heures;
        const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;

        // Concaténez les éléments pour obtenir le format HH:MM
        const heureFormatee = `${heuresFormat}:${minutesFormat}`;

        return heureFormatee;
     }

     return ''
   
  }

}
