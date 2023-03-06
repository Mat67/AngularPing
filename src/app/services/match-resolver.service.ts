import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { from, Observable } from 'rxjs';
import { Match } from '../model/match';
import { RepositoryService } from './repository.service';

@Injectable({ providedIn: 'root' })
export class MatchResolverService implements Resolve<Match> {

constructor(private repo: RepositoryService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Match> {
    return from(this.repo.getMatch(route.paramMap.get('matchId')))
  }
}
