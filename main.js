class GreedGame {

    constructor (name) {
        this.name = name;
        this.score = 0;
    }

    play () {
        const diceRoll = this.rollDice();
        const rollResult = this.getRollResult(diceRoll);
        this.getScore(rollResult);
        return `${this.name} rolled ${diceRoll}. This dice roll is worth ${this.score} points.`;
    }

    rollDice () {
        const result = [];
        while (result.length < 5) {
            result.push(Math.ceil(Math.random() * 6));  
        }
        return result;
    }

    getRollResult (diceRoll) {
        //declare roll object
        const rollResult = {};
        //iterate thru dice and build dice count obj
        for (let die of diceRoll) {
            //assign k/v pair (key is die number, value is die number in string format -- concat each instance)
            let single = `${die}`;
            if (!rollResult[single]) {
                rollResult[single] = 0;
            }
            rollResult[single]++;
            if (rollResult[single] == 3) {   
            let triple = `${die}${die}${die}`;
                rollResult[triple] = 1;
                rollResult[single] = 0;
            }
        }
        return rollResult;
    }

    getScore (rollResult) {
        //create scoring table
        const scoringTable = [ 
           ['111', 1000], ['666', 600], ['555', 500],
           ['444',  400], ['333', 300], ['222', 200],
           [  '1',  100], [  '5',  50] ];
        //scoring object reference
        const points = Object.fromEntries(scoringTable);
        //determine score
        for (let die in rollResult) {
            if(points[die]) {
                this.score += points[die] * rollResult[die]; 
            }
        }
    }
}


let a = new GreedGame('Kris');
let b = new GreedGame('Kevin');
let c = new GreedGame('Vu');
console.log(a.play());
console.log(b.play());
console.log(c.play());