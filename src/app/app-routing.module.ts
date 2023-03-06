import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { SignatureMobileComponent } from './signature-mobile/signature-mobile.component';

const routes: Routes = [
  { path: '', component: MatchDetailComponent },
  { path: 'matchs/:matchId', component: MatchDetailComponent },
  { path: 'matchs/:matchId/equipes/:equipeId/signature', component: SignatureMobileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
