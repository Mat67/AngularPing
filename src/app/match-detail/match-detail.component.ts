import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { App } from '../model/app';
import { RepositoryService } from '../services/repository.service';
import * as _ from 'underscore';
import { Match } from '../model/match';
import { ToastService } from '../services/toast-service';
import { ActivatedRoute } from '@angular/router';
import { Joueur } from '../model/joueur';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css'],
})
// Trigger hot reload for bottom padding fix
export class MatchDetailComponent implements OnInit {
  app: App;
  onBlurMethod: any;
  @ViewChild('dangerTpl') public templateref: TemplateRef<any>;
  joueurs: Joueur[]
  equipes: string[]
  godMode: boolean
  get godeMode(): boolean { return this.godMode; }
  set godeMode(v: boolean) { this.godMode = v; }

  cacherComposition: boolean
  cacherCompositionVisiteur: boolean

  constructor(private repository: RepositoryService, public toastService: ToastService, private route: ActivatedRoute) {
    this.app = new App();
    this.godMode = false
    this.onBlurMethod = _.debounce(() => {
      console.log('sauvegarde');
      if (this.app && this.app.match) {
        this.repository.sauvegarderMatch(this.app.match);
      }
    }, 2000);

    this.repository.onMatchUpdate = (match: Match) => {
      if (this.app && this.app.match && match && this.app.match.id == match.id)
        this.app.match = match;
    };

    this.repository.onSignatureUpdate = (data) => {
      if (this.app && this.app.match && data && this.app.match.id === data.matchId) {
        if (data.equipeId === '0')
          this.app.match.signatureEquipeReceveuse = data.signature
        else if (data.equipeId === '1')
          this.app.match.signatureEquipeVisiteuse = data.signature
      }
    }

    this.repository.getAllJoueurs().then(j => {
      this.joueurs = j
    }).catch(err => console.warn(err));

    this.repository.getAllEquipes().then(e => {
      this.equipes = e
    }).catch(err => console.warn(err));

    this.repository.onError = (error) => {
      console.warn(`Error WS : ${ error }`)
      if (this.templateref) {
        this.showDanger(this.templateref)
      }
    }

  }

  async ngOnInit() {
    this.route.data.subscribe(
      ({match}) => {
        if (match) {
          this.app.match = match
          this.desactiverGodMode()

          this.repository.GetSignatures(this.app.match.id).then((s) => {
            if (s) {
              this.app.match.signatureEquipeReceveuse = s.signatureEquipeReceveuse
              this.app.match.signatureEquipeVisiteuse = s.signatureEquipeVisiteuse
            }
          }).catch(err => console.warn(err))
        }
      });
  }

  afficher() {
    return this.app.match;
  }

  estEnLectureSeule() {
    if (!this.app || !this.app.match) return false;
    const estTermine = typeof this.app.match.matchEstTermine === 'function' && this.app.match.matchEstTermine();
    const sigReceveuseValide = !!(this.app.match.signatureEquipeReceveuse && typeof this.app.match.signatureEquipeReceveuse === 'string' && this.app.match.signatureEquipeReceveuse.trim() !== '');
    const sigVisiteuseValide = !!(this.app.match.signatureEquipeVisiteuse && typeof this.app.match.signatureEquipeVisiteuse === 'string' && this.app.match.signatureEquipeVisiteuse.trim() !== '');
    const deuxSignaturesPresentes = sigReceveuseValide && sigVisiteuseValide;
    return (estTermine && deuxSignaturesPresentes) && !this.godMode;
  }

  showStandard() {
    this.toastService.show('I am a standard toast');
  }

  showSuccess(texte) {
    this.toastService.show(texte, { classname: 'bg-success text-light', delay: 2000 });
  }

  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 2000 });
  }

  showWarning(texte) {
    this.toastService.show(texte, { classname: 'bg-warning text-light', delay: 2000 });
  }

  ngOnDestroy(): void {
    this.toastService.clear();
    this.repository.onMatchUpdate = undefined;
    this.repository.onSignatureUpdate = undefined;
    this.repository.onError = undefined;
  }

  onCacherCompositionEquipeReceveuse(cacherComposition) {
    this.cacherComposition = cacherComposition
  }

  onCacherCompositionEquipeVisiteuse(cacherComposition) {
    this.cacherCompositionVisiteur = cacherComposition
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.altKey && (event.key === 'g' || event.key === 'G')) {
      if (this.godMode === true)
        this.desactiverGodMode()
      else if (this.godMode === false)
        this.activerGodMode()
    }
  }

  desactiverGodMode() {
    if (this.godMode === true) {
      this.godMode = false
      this.showSuccess("God Mode désactivé !")
    }
  }

  activerGodMode() {
    if (this.godMode === false) {
      this.godMode = true
      this.showWarning("God Mode activé !")
    }
  }

  desactiverGodeMode() {
    this.desactiverGodMode();
  }

  activerGodeMode() {
    this.activerGodMode();
  }
}
