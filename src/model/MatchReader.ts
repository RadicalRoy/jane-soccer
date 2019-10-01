import fs from 'fs';

export enum MatchResult {
  'W' = 3,
  'L' = 0,
  'T' = 1
}

// Single team's data for a given match
export type TeamMatchData = {
  score: number;
  result: MatchResult;
  opponent: string;
};

export class MatchReader {
  // Track data by team using an array to represent sequential days of data
  // simple rolling aggregate later
  raw: string[] = [];
  data: { [teamName: string]: TeamMatchData[] } = {};

  constructor(public fileName: string) {
    this.parseFile(fileName);
  }

  // can probably be broken up further
  parseFile = (fileName: string): void => {
    // Read file and split by newline
    const lines = fs
      .readFileSync(fileName, {
        encoding: 'utf-8'
      })
      .split('\n')
      .filter(line => line != ''); // empty lines

    // save raw
    this.raw = lines;

    // Read each line (match) into data object
    lines.forEach(line => {
      const [team1, team2] = line.split(', ');

      console.log(team1);
      // parse name and score
      const team1Score = this.getTeamScore(team1);
      const team2Score = this.getTeamScore(team2);

      // create match data
      const team1Data: TeamMatchData = {
        score: team1Score.score,
        result: this.compareScores(team1Score.score, team2Score.score),
        opponent: team2Score.name
      };

      const team2Data: TeamMatchData = {
        score: team2Score.score,
        result: this.compareScores(team2Score.score, team1Score.score),
        opponent: team1Score.name
      };

      // add to data record
      if (this.data[team1Score.name]) {
        this.data[team1Score.name].push(team1Data);
      } else {
        this.data[team1Score.name] = [team1Data];
      }

      if (this.data[team2Score.name]) {
        this.data[team2Score.name].push(team2Data);
      } else {
        this.data[team2Score.name] = [team2Data];
      }
    });
  };

  private getTeamScore = (team: string): { name: string; score: number } => {
    const teamArr = team.split(' ');
    const score = parseInt(teamArr[teamArr.length - 1]); // score is last entry
    teamArr.pop(); // remove score
    const name = teamArr.join(' '); // join for full name

    return { name, score };
  };

  // returns the result of the first team
  private compareScores = (t1Score: number, t2Score: number): MatchResult => {
    const result = t1Score > t2Score ? 'W' : t1Score === t2Score ? 'T' : 'L';
    return MatchResult[result];
  };
}
