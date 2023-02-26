import { Observable } from 'rxjs';
import { Match } from './match';

export class App {
  constructor() {

  }

  match: Match


  public creerNouvelleRencontre(nombreJoueur) {
    this.match = new Match(nombreJoueur)

    const locations = new Observable((observer) => {
      let watchId: number;



      // When the consumer unsubscribes, clean up data ready for next subscription.
      return {
        unsubscribe() {
          navigator.geolocation.clearWatch(watchId);
        }
      };


    });


    const locationsSubscription = locations.subscribe({
      next(position) {
        console.log('Current Position: ', position);
      },
      error(msg) {
        console.log('Error Getting Location: ', msg);
      }
    });


  }



}
