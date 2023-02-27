export class Manche {
    /**
     * name
     */
    public getResultat(): number {
        var scoreSplite = this.score.split('-');
        if (scoreSplite.length !== 2)
            return 0;

        return parseInt(scoreSplite[0]) - parseInt(scoreSplite[1]);
    }

    public static fabrique(score: string) {
      var manche = new Manche()
      manche.score = score
      return manche
    }

    score:string = '';
}
