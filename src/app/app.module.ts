import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import { RencontresComponent } from './rencontres/rencontres.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { EquipeComponent } from './equipe/equipe.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { EnteteComponent } from './entete/entete.component';
import { SignaturePadModule } from '@ng-plus/signature-pad';
import { ModalComponent } from './modal/modal.component';
import { PrintPageComponent } from './print-page/print-page.component';
import { ChoixAccueilComponent } from './choix-accueil/choix-accueil.component';
import { NavigationComponent } from './navigation/navigation.component';

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RencontresComponent,
    MatchDetailComponent,
    EquipeComponent,
    BottomBarComponent,
    EnteteComponent,
    ModalComponent,
    PrintPageComponent,
    ChoixAccueilComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    SignaturePadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
