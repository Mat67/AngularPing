export class Manche {
  /**
   * name
   */
  public getResultat(): number {
    try {
      if (!this.score)
      return 0

    var scoreSplite = this.score.split("-");
    if (scoreSplite.length !== 2) return 0;

    return parseInt(scoreSplite[0]) - parseInt(scoreSplite[1]);
    } catch (error) {
      var a = ''
    }

  }

  public static fabrique(score: string) {
    var manche = new Manche();
    manche.score = score;
    return manche;
  }

  score: string = "";
}
