import { MatchReader, TeamScore } from './MatchReader';

// aggregate match points indexed by day
// idx 0 is match day 1, idx 1 is match day 2, etc
export type MatchAggs = {
  [team: string]: number[];
};

export class MatchAggregator {
  static fromTxt(fileName: string): MatchAggregator {
    return new MatchAggregator(fileName);
  }

  matchReader: MatchReader;
  matchAggs: MatchAggs = {};
  days: number = 0;

  constructor(public fileName: string) {
    this.matchReader = new MatchReader(fileName);
    this.calcDaySums();
    console.log(this.reportRanks());
  }

  get data() {
    return this.matchReader.data;
  }

  calcDaySums = (): void => {
    for (const team in this.data) {
      const runTotals: number[] = [];

      this.data[team].reduce((acc, ele) => {
        const daySum = ele.result + acc;

        runTotals.push(daySum);
        return daySum;
      }, 0);

      this.matchAggs[team] = runTotals;

      this.days = runTotals.length; // somewhat out of place
    }
  };

  // might make more sense in its own Reporter class
  reportRanks = (): string => {
    let report = '';

    for (let i = 0; i < this.days; i++) {
      const dayRanks = this.dayRank(i);

      report += `Matchday ${i + 1} \n`;

      for (let j = 0; j < 3; j++) {
        report += `${dayRanks[j].name}, ${dayRanks[j].score} pts \n`;
      }

      report += '\n';
    }

    return report;
  };

  // get rankings for the day and return array of top 3 teams
  dayRank = (day: number): TeamScore[] => {
    const dayArr: TeamScore[] = [];

    for (let team in this.matchAggs) {
      dayArr.push({ score: this.matchAggs[team][day], name: team });
    }

    dayArr.sort((team1, team2) => {
      if (team1.score > team2.score) {
        return -1;
      } else if (team1.score < team2.score) {
        return 1;
      } else {
        return team1.name > team2.name ? 1 : -1;
      }
    });

    return dayArr.slice(0, 3);
  };
}
