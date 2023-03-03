import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { ChargerRencontreComponent } from './charger-rencontre/charger-rencontre.component';
import { ChoixAccueilComponent } from './choix-accueil/choix-accueil.component';
import { EnteteComponent } from './entete/entete.component';
import { EquipeComponent } from './equipe/equipe.component';
import { HomeComponent } from './home/home.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { ModalComponent } from './modal/modal.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NouvelleRencontreComponent } from './nouvelle-rencontre/nouvelle-rencontre.component';
import { PrintPageComponent } from './print-page/print-page.component';
import { RencontresComponent } from './rencontres/rencontres.component';
import { ToastsContainer } from './toasts-container/toasts-container.component';
import { ScoreValidationDirective } from './score-validation.directive';

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
    NavigationComponent,
    NouvelleRencontreComponent,
    ChargerRencontreComponent,
    ScoreValidationDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ToastsContainer
    //SignaturePadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
