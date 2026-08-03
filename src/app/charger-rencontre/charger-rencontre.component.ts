import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { App } from '../model/app';
import { Match } from '../model/match';
import { RepositoryService } from '../services/repository.service';

@Component({
  selector: 'app-charger-rencontre',
  templateUrl: './charger-rencontre.component.html',
  styleUrls: ['./charger-rencontre.component.css']
})
export class ChargerRencontreComponent {
  @Input() app: App;
  @ViewChild('contentChargerRencontre') contentChargerRencontre: any;
  matchs: Match[] = [];

  // Continuous Infinite Scroll state
  page: number = 1;
  pageSize: number = 6;
  totalCount: number = 0;
  loading: boolean = false;
  hasMore: boolean = true;

  constructor(private modalService: NgbModal, private repository: RepositoryService, private router: Router) {}

  public open() {
    this.openChargerRencontre(this.contentChargerRencontre);
  }

  async chargerPlusMatchs() {
    if (this.loading || !this.hasMore) return;

    this.loading = true;
    try {
      const res = await this.repository.listeMatchsSauvegardes(this.page, this.pageSize);
      let newMatchs: Match[] = [];

      if (Array.isArray(res)) {
        newMatchs = res;
        this.totalCount = res.length;
      } else {
        newMatchs = res.matchs || [];
        this.totalCount = res.totalCount || 0;
      }

      // Eviter les doublons
      const existingIds = new Set(this.matchs.map(m => m.id));
      const filtered = newMatchs.filter(m => !existingIds.has(m.id));
      this.matchs = [...this.matchs, ...filtered];

      // Vérification fin des résultats
      if (newMatchs.length < this.pageSize || (this.totalCount > 0 && this.matchs.length >= this.totalCount)) {
        this.hasMore = false;
      } else {
        this.page++;
      }
    } catch (error) {
      console.warn('Erreur lors du chargement des rencontres', error);
      this.hasMore = false;
    } finally {
      this.loading = false;
    }
  }

  async openChargerRencontre(content) {
    const targetContent = content || this.contentChargerRencontre;
    // Reset state for new opening
    this.matchs = [];
    this.page = 1;
    this.hasMore = true;
    this.loading = false;

    await this.chargerPlusMatchs();

    this.modalService.open(targetContent, { size: 'md', centered: true }).result.then(
      (result) => {},
      (reason) => {}
    );
  }

  onScroll(event: any) {
    const element = event.target;
    // Détecter si on est proche du bas de la liste (50px de marge)
    const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 50;

    if (atBottom && !this.loading && this.hasMore) {
      this.chargerPlusMatchs();
    }
  }

  public onClick(match: Match) {
    if (match) {
      if (this.app) {
        this.app.match = match;
      }
      this.modalService.dismissAll();
      this.router.navigate(['/matchs/' + match.id]);
    }
  }

  public async supprimer(match: Match) {
    this.repository.supprimerMatch(match.id);
    this.matchs = this.matchs.filter(m => m.id !== match.id);
    if (this.totalCount > 0) this.totalCount--;
  }

  confirmAndDelete(match: Match) {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cette rencontre ?');
    if (confirmation) {
      this.supprimer(match);
    }
  }

  public afficheDateDepuis(match: Match) {
    if (match && match.Date) {
      var tmpDate = new Date(match.Date);
      var tmpHeure = match.Heure;

      var d = moment(new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate(), tmpHeure ? tmpHeure.hour : 0, tmpHeure ? tmpHeure.minute : 0));
      return d.locale('fr').fromNow();
    } else return '';
  }
}
