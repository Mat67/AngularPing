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
export class MatchDetailComponent implements OnInit {
  app: App;
  onBlurMethod: any;
  @ViewChild('dangerTpl') public templateref: TemplateRef<any>;
  matchId: any;
  joueurs: Joueur[]
  equipes: string[]
  godeMode: boolean

  constructor(private repository: RepositoryService, public toastService: ToastService, private route: ActivatedRoute) {
    this.app = new App();
    this.godeMode = false
    this.onBlurMethod = _.debounce(() => {
      console.log('sauvegarde');
      this.repository.sauvegarderMath(this.app.match);
    }, 2000);


    this.repository.onMatchUpdate = (match: Match) => {
      if (this.app.match.id == match.id)
        this.app.match = match;
    };

    this.repository.onSignatureUpdate = (data) => {
      if (this.app.match.id === data.matchId) {
        if (data.equipeId === '0')
          this.app.match.signatureEquipeReceveuse = data.signature
        else if (data.equipeId === '1')
          this.app.match.signatureEquipeVisiteuse = data.signature
      }
    }

    this.repository.getAllJoueurs().then(j => {
      this.joueurs = j
    })

    this.repository.getAllEquipes().then(e => {
      this.equipes = e
    })



    this.repository.onError = (error) => {
      console.warn(`Error WS : ${ error }`)
      this.showDanger(this.templateref)
    }

  }

  async ngOnInit() {
    this.route.data.subscribe(
      ({match}) => {
        this.app.match = match
        this.desactiverGodeMode()

        this.repository.GetSignatures(this.app.match.id).then((s) => {
          this.app.match.signatureEquipeReceveuse = s.signatureEquipeReceveuse
          this.app.match.signatureEquipeVisiteuse = s.signatureEquipeVisiteuse
        })
      });

    // this.matchId = this.route.snapshot.paramMap.get('matchId');

    // this.app.match = await this.repository.getMatch(this.matchId)
  }

  afficher() {
    return this.app.match;
  }


  estEnLectureSeule() {
    return (this.app.match.matchEstTermine() && (this.app.match.signatureEquipeReceveuse !== undefined || this.app.match.signatureEquipeVisiteuse !== undefined)) && !this.godeMode
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
	}

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    // Vérifiez si les touches Ctrl, Alt et V sont enfoncées en même temps
    if (event.ctrlKey && event.altKey && event.key === 'l') {
      if (this.godeMode === true)
        this.desactiverGodeMode()
      else if (this.godeMode === false)
        this.activerGodeMode()
    }
  }


  desactiverGodeMode() {
    if (this.godeMode === true) {
      this.godeMode = false
      this.showSuccess("Gode Mode désactivé !")
    }
  }

  activerGodeMode() {
    if (this.godeMode === false) {
      this.godeMode = true
      this.showWarning("Gode Mode activé !")
    }
  }
}
