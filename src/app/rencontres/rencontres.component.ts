import { Component, OnInit, Input, Output, EventEmitter, ElementRef, HostListener, ViewChild, QueryList, ViewChildren  } from '@angular/core';
import { Rencontre, RencontreDouble, RencontreSimple } from '../model/rencontre';
import { Match, Match6 } from '../model/match';
import { Equipe } from '../model/equipe';
import { RepositoryService } from '../services/repository.service';

// Trigger hot reload for badge colors update
@Component({
  selector: 'app-rencontres',
  templateUrl: './rencontres.component.html',
  styleUrls: ['./rencontres.component.css']
})
export class RencontresComponent implements OnInit {

  dropdownEquipeVisiteuseOpen: boolean[] = []
  dropdownEquipeReceveuseOpen: boolean[] = []
  allSavedMatches: Match[] = [];
  
  @Input() rencontres: Rencontre[]
  @Input() equipeReceveuse: Equipe

  @Input() match: Match;
  @Input() lectureSeule: boolean
  @Input() cacherCompositionEquipeReceveuse: boolean
  @Input() cacherCompositionEquipeVisiteuse: boolean

  @Output() BlurMethod: EventEmitter<any> = new EventEmitter();


    // Utilisez ViewChild pour référencer la dropdown via son template
    @ViewChildren('dropdownMenusReceveur') dropdownMenusReceveur: QueryList<ElementRef>;
    @ViewChildren('dropdownMenusVisiteur') dropdownMenusVisiteur: QueryList<ElementRef>;
    
  constructor(private eRef: ElementRef, private repository: RepositoryService) {
    this.dropdownEquipeVisiteuseOpen[0] = false
    this.dropdownEquipeVisiteuseOpen[1] = false

    this.dropdownEquipeReceveuseOpen[0] = false
    this.dropdownEquipeReceveuseOpen[1] = false
  }


  async ngOnInit(): Promise<void> {
    this.faceAFaceCache.clear();
    this.pendingRequests.clear();
    try {
      const res = await this.repository.listeMatchsSauvegardes(1, 100);
      if (Array.isArray(res)) {
        this.allSavedMatches = res;
      } else if (res && res.matchs) {
        this.allSavedMatches = res.matchs;
      }
      // Vider le cache après chargement des matchs pour invalider les éventuels résultats à 0 prématurés
      this.faceAFaceCache.clear();
    } catch (err) {
      console.warn('Impossible de charger les matchs sauvegardés pour le face-à-face', err);
    }
  }

  faceAFaceCache: Map<string, { victoires: number, defaites: number, total: number }> = new Map();
  pendingRequests: Set<string> = new Set();

  private getPlayerKey(j: any): string {
    if (!j) return '';
    if (j.numeroLicence && String(j.numeroLicence).trim() !== '' && String(j.numeroLicence).trim() !== '0') {
      return `lic_${String(j.numeroLicence).trim()}`;
    }
    if (j.nom) {
      return `nom_${String(j.nom).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim().toLowerCase()}`;
    }
    return '';
  }

  async loadFaceAFaceFromBackend(joueur1: any, joueur2: any): Promise<void> {
    const k1 = this.getPlayerKey(joueur1);
    const k2 = this.getPlayerKey(joueur2);
    if (!k1 || !k2) return;

    const key1 = `${k1}_vs_${k2}`;
    const key2 = `${k2}_vs_${k1}`;

    if (this.faceAFaceCache.has(key1) || this.pendingRequests.has(key1)) return;

    this.pendingRequests.add(key1);
    this.pendingRequests.add(key2);

    try {
      const res = await this.repository.getFaceAFaceStats(joueur1, joueur2, this.match?.id);
      if (res && res.stats) {
        const statsJ1 = {
          victoires: res.stats.victoiresJoueur1 || 0,
          defaites: res.stats.victoiresJoueur2 || 0,
          total: res.stats.totalMatchs || 0
        };
        const statsJ2 = {
          victoires: res.stats.victoiresJoueur2 || 0,
          defaites: res.stats.victoiresJoueur1 || 0,
          total: res.stats.totalMatchs || 0
        };
        this.faceAFaceCache.set(key1, statsJ1);
        this.faceAFaceCache.set(key2, statsJ2);
      }
    } catch (e) {
      // Fallback local si le backend n'a pas encore répondu
    } finally {
      this.pendingRequests.delete(key1);
      this.pendingRequests.delete(key2);
    }
  }

  getPlayerStats(joueur: any, adversaire: any): { victoires: number, defaites: number, total: number } {
    const k1 = this.getPlayerKey(joueur);
    const k2 = this.getPlayerKey(adversaire);
    if (!k1 || !k2) {
      return { victoires: 0, defaites: 0, total: 0 };
    }

    const key = `${k1}_vs_${k2}`;
    if (this.faceAFaceCache.has(key)) {
      return this.faceAFaceCache.get(key)!;
    }

    // Demande au serveur backend en arrière-plan
    this.loadFaceAFaceFromBackend(joueur, adversaire);

    // Calcul local de secours (fallback)
    // Si les matchs ne sont pas encore arrivés par WebSocket, ne pas mettre en cache le résultat temporaire 0 !
    if (!this.allSavedMatches || this.allSavedMatches.length === 0) {
      return { victoires: 0, defaites: 0, total: 0 };
    }

    let victoires = 0;
    let defaites = 0;

    const normalizeStr = (str: any) => {
      if (!str) return '';
      return String(str)
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
    };

    const isSamePlayer = (j1: any, target: any) => {
      if (!j1 || !target) return false;
      const lic1 = j1.numeroLicence ? String(j1.numeroLicence).trim() : '';
      const licTarget = target.numeroLicence ? String(target.numeroLicence).trim() : '';

      if (lic1 !== '' && licTarget !== '' && lic1 !== '0' && licTarget !== '0') {
        return lic1 === licTarget;
      }

      const nom1 = normalizeStr(j1.nom);
      const nomTarget = normalizeStr(target.nom);
      return nom1 !== '' && nomTarget !== '' && nom1 === nomTarget;
    };

    for (const savedMatch of this.allSavedMatches) {
      // Comparaison stricte des identifiants de match convertis en String pour exclure le match en cours
      if (this.match && String(savedMatch.id).trim() === String(this.match.id).trim()) continue;
      if (!savedMatch.rencontres) continue;

      for (const r of savedMatch.rencontres) {
        if (r.getTypeRencontre && r.getTypeRencontre() === 'RencontreSimple') {
          const simpleR = r as any;
          const res = typeof simpleR.getResultat === 'function' ? simpleR.getResultat() : 0;
          if (res === 0) continue;

          const rec = simpleR.joueurEquipeReceveuse;
          const vis = simpleR.joueurEquipeVisiteuse;

          if (isSamePlayer(rec, joueur) && isSamePlayer(vis, adversaire)) {
            if (res > 0) victoires++;
            else if (res < 0) defaites++;
          } else if (isSamePlayer(vis, joueur) && isSamePlayer(rec, adversaire)) {
            if (res < 0) victoires++;
            else if (res > 0) defaites++;
          }
        }
      }
    }

    const calculatedStats = { victoires, defaites, total: victoires + defaites };
    this.faceAFaceCache.set(key, calculatedStats);
    return calculatedStats;
  }

  invalidatePlayerCache(joueur1: any, joueur2: any): void {
    const k1 = this.getPlayerKey(joueur1);
    const k2 = this.getPlayerKey(joueur2);

    if (k1) {
      for (const key of Array.from(this.faceAFaceCache.keys())) {
        if (key.includes(k1)) {
          this.faceAFaceCache.delete(key);
        }
      }
    }
    if (k2) {
      for (const key of Array.from(this.faceAFaceCache.keys())) {
        if (key.includes(k2)) {
          this.faceAFaceCache.delete(key);
        }
      }
    }
  }

  onBlurMethod(rencontre?: Rencontre) {
    if (rencontre && rencontre.getTypeRencontre && rencontre.getTypeRencontre() === 'RencontreSimple') {
      const simpleR = rencontre as RencontreSimple;
      this.invalidatePlayerCache(simpleR.joueurEquipeReceveuse, simpleR.joueurEquipeVisiteuse);
    }
    this.BlurMethod.emit();
  }

  // Fermer le dropdown si un clic est détecté à l'extérieur
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (this.dropdownMenusReceveur) {
      this.dropdownMenusReceveur.forEach((dropdown, index) => {
        if (dropdown && !dropdown.nativeElement.contains(event.target)) {
          this.dropdownEquipeReceveuseOpen[index] = false;
        }
      });
    }

    if (this.dropdownMenusVisiteur) {
      this.dropdownMenusVisiteur.forEach((dropdown, index) => {
        if (dropdown && !dropdown.nativeElement.contains(event.target)) {
          this.dropdownEquipeVisiteuseOpen[index] = false;
        }
      });
    }
  }

  getBackgroundColor(rencontre: any): string {
    if (this.match && this.match.getRencontresSuivantes().filter(r => r?.getFormule() === rencontre?.getFormule()).length > 0) {
      return '#CCE5FF';
    } else {
      return '';
    }
  }

  toggleDropdownEquipeReceveuse(event: Event, index) {
    event.stopPropagation();
    this.dropdownEquipeReceveuseOpen[index] = !this.dropdownEquipeReceveuseOpen[index];
    this.dropdownEquipeVisiteuseOpen[0] = false;
    this.dropdownEquipeVisiteuseOpen[1] = false;
    this.dropdownEquipeReceveuseOpen[index == 0 ? 1 : 0] = false;
  }

  toggleDropdownEquipeVisiteuse(event: Event, index) {
    event.stopPropagation(); 
    this.dropdownEquipeVisiteuseOpen[index] = !this.dropdownEquipeVisiteuseOpen[index];
    this.dropdownEquipeReceveuseOpen[0] = false;
    this.dropdownEquipeReceveuseOpen[1] = false;
    this.dropdownEquipeVisiteuseOpen[index == 0 ? 1 : 0] = false;
  }

  // Méthode pour sélectionner une option
  selectOptionEquipeReceveuse(value: string, rencontre : RencontreDouble, index: number) {
    rencontre.doubleEquipeReceveuse = value;
    this.dropdownEquipeReceveuseOpen[index] = false;
  }

  selectOptionEquipeVisiteuse(value: string, rencontre : RencontreDouble, index: number) {
    rencontre.doubleEquipeVisiteuse = value;
    this.dropdownEquipeVisiteuseOpen[index] = false;
  }

  omit_number(score: string, evt: KeyboardEvent): boolean {
    const val = score || '';
    const charValid = (evt.key === '-' || (!isNaN(Number(evt.key)) && evt.key !== ' '));
    if (!charValid) {
      if (evt && evt.preventDefault) evt.preventDefault();
      return false;
    }

    const separateur = val.indexOf('-');
    if (evt.key === '-' && separateur !== -1) {
      if (evt && evt.preventDefault) evt.preventDefault();
      return false;
    }
    if (evt.key === '-' && separateur === -1 && val.split('-')[0].length === 0) {
      if (evt && evt.preventDefault) evt.preventDefault();
      return false;
    }
    if (!isNaN(Number(evt.key)) && evt.key !== ' ') {
      const parts = val.split('-');
      const partieGaucheValide = parts[0].length < 2 || separateur !== -1;
      const partieDroiteValide = separateur === -1 || (parts[1] && parts[1].length < 2);
      if (!(partieGaucheValide && partieDroiteValide)) {
        if (evt && evt.preventDefault) evt.preventDefault();
        return false;
      }
    }

    return true;
  }

  
}
