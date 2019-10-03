import { MatchAggregator } from '../src/model/MatchAggregator';

const sampleFile = 'input/sample-input.txt';

describe('MatchAggregator produces correct aggregates for given file', () => {
  const matchAgg = new MatchAggregator(sampleFile);

  it('Pulls the correct number of days', () => {
    expect(matchAgg.days).toBe(4);
  });

  it('Produces scores for team', () => {
    expect(matchAgg.matchAggs).toHaveProperty('Felton Lumberjacks');
  });

  it('Correctly sums wins for team over league period', () => {
    expect(matchAgg.matchAggs['Felton Lumberjacks'][3]).toBe(7);
  });
});

describe('', () => {});
