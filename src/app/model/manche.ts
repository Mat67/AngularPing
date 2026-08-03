export class Manche {
  /**
   * name
   */
  public getResultat(): number {
    try {
      if (!this.score) return 0;

      var scoreSplite = this.score.split("-");
      if (scoreSplite.length !== 2) return 0;

      const p1 = parseInt(scoreSplite[0], 10);
      const p2 = parseInt(scoreSplite[1], 10);

      if (isNaN(p1) || isNaN(p2)) return 0;

      return p1 - p2;
    } catch (error) {
      return 0;
    }
  }

  public static fabrique(score: string) {
    var manche = new Manche();
    manche.score = score;
    return manche;
  }

  score: string = "";
}
