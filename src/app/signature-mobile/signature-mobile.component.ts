import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { RepositoryService } from '../services/repository.service';

@Component({
  selector: 'app-signature-mobile',
  templateUrl: './signature-mobile.component.html',
  styleUrls: ['./signature-mobile.component.css'],
})
export class SignatureMobileComponent {
  matchId: string;
  equipeId: string;

  constructor(private route: ActivatedRoute, private repository: RepositoryService,) {


    // _activatedRoute.paramMap.pipe(
    //   switchMap((params) => {
    //     this.matchId = params.get('matchId')
    //     return this.matchId
    //   })
    // );

    // _activatedRoute.paramMap.pipe(
    //   switchMap((params) => {
    //     this.equipeId = params.get('equipeId')
    //     return this.equipeId
    //   })
    // );
  }

  ngOnInit() {
    this.matchId = this.route.snapshot.paramMap.get('matchId');
    this.equipeId = this.route.snapshot.paramMap.get('equipeId');
  }

  sauvegardeSignature(base64data) {
    this.repository.ModifierSignature(this.matchId, this.equipeId, base64data)
  }

  signature:string

}