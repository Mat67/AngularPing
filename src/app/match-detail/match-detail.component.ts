import { Component, OnInit } from '@angular/core';
import { App } from '../model/app';
import { RepositoryService } from '../services/repository.service';
import * as _ from 'underscore';
import { Match } from '../model/match';
import { ToastService } from '../services/toast-service';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css'],
})
export class MatchDetailComponent implements OnInit {
  app: App;
  onBlurMethod: any;

  constructor(private repository: RepositoryService, public toastService: ToastService) {
    this.app = new App();
    this.onBlurMethod = _.debounce(() => {
      console.log('sauvegarde');
      this.repository.sauvegarderMath(this.app.match);
    }, 2000);

    this.repository.onMatchUpdate = (match: Match) => {
      this.app.match = match;
    };

  }

  ngOnInit(): void {}

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
		this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
	}

	ngOnDestroy(): void {
		this.toastService.clear();
	}
}
