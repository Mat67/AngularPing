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

    score:string = '';
}
