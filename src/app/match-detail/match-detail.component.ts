import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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

  constructor(private repository: RepositoryService, public toastService: ToastService, private route: ActivatedRoute) {
    this.app = new App();
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


    this.repository.onError = (error) => {
      console.warn(`Error WS : ${ error }`)
      this.showDanger(this.templateref)
    }

  }

  async ngOnInit() {
    this.route.data.subscribe(
      ({match}) => {
        this.app.match = match

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




	showStandard() {
		this.toastService.show('I am a standard toast');
	}

	showSuccess() {
		this.toastService.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
	}

	showDanger(dangerTpl) {
		this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 5000 });
	}

	ngOnDestroy(): void {
		this.toastService.clear();
	}
}
