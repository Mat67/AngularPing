import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  constructor() { }

  public getRandomString() {
    var result           = '';
    var characters       = 'ABCDE FGHIJKLM NOPQRS TUVWXYZa bcdefghijk lmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < this.random(5, 10); i++ ) {
       result += characters.charAt(Math.random() * charactersLength);
    }
    return result;
 }

  public getRandomScore() {
    var randomPoints = 11;
    if (this.random(0, 10) >= 8)
      randomPoints = this.random(11, 20);

    var randomScore = randomPoints + '-' +  (randomPoints > 11 ? randomPoints - 2 : this.random(0, 9));

    if (Math.random() <= 0.5)
      randomScore = randomScore.split('-')[1] + '-' + randomScore.split('-')[0];

    return randomScore;
  }

  public random(min, max) {
    return Math.floor((min + Math.random() * (max - min)));
  }
}
