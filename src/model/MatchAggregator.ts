import { MatchReader } from './MatchReader';

export class MatchAggregator {
  matchReader: MatchReader;
  constructor(public fileName: string) {
    this.matchReader = new MatchReader(fileName);
  }

  get data() {
    return this.matchReader.data;
  }
}

//let mA = new MatchAggregator()
