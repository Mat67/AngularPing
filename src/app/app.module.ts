import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { EquipeComponent } from './equipe/equipe.component';
import { RencontresComponent } from './rencontres/rencontres.component';

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MatchDetailComponent,
    EquipeComponent,
    RencontresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
