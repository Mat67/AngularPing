import { Component, Input } from '@angular/core';
import { Rencontre } from '../model/rencontre';

@Component({
  selector: 'app-rencontre-row',
  templateUrl: './rencontre-row.component.html',
  styleUrls: ['./rencontre-row.component.css']
})
export class RencontreRowComponent {
  @Input() rencontre: Rencontre; // Remplacez 'any' par le type approprié de vos rencontres
}