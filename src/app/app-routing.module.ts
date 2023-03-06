import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { Match } from './model/match';
import { MatchResolverService } from './services/match-resolver.service';
import { RepositoryService } from './services/repository.service';
import { SignatureMobileComponent } from './signature-mobile/signature-mobile.component';






const routes: Routes = [
  { path: 'matchs/:matchId/equipes/:equipeId/signature', component: SignatureMobileComponent },
  { path: 'matchs/:matchId', component: MatchDetailComponent, resolve: { match: MatchResolverService}, },
  { path: '', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
