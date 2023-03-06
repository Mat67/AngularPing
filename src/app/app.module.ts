import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
import { ChampSignatureComponent } from './champ-signature/champ-signature.component';
import { QRCodeModule } from 'angularx-qrcode';
import { SignatureMobileComponent } from './signature-mobile/signature-mobile.component';

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
    ScoreValidationDirective,
    ChampSignatureComponent,
    SignatureMobileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ToastsContainer,
    ReactiveFormsModule,
    AngularSignaturePadModule,
    QRCodeModule
    //SignaturePadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
