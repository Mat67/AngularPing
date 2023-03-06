import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { SignatureMobileComponent } from './signature-mobile/signature-mobile.component';

const routes: Routes = [
  { path: 'matchs/:matchId/equipes/:equipeId/signature', component: SignatureMobileComponent },
  { path: 'matchs/:matchId', component: MatchDetailComponent },
  { path: '', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
