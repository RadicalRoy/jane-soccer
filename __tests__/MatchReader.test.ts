import { MatchReader, MatchResult } from '../src/model/MatchReader';

/*
  Proper unit testing could dependency inject for the file read.
  Could also refactor class methods to be more independent of each other
  This will do for the scale of our application...
*/

const sampleFile = 'input/sample-input.txt';

describe('MatchReader can read and parse file input', () => {
  const matchReader = new MatchReader(sampleFile);

  it('Can read input file', () => {
    expect(matchReader.raw).not.toEqual([]);
  });

  it('Can parse raw file data from split array', () => {
    expect(matchReader.data).not.toEqual({});
  });

  it('Correctly parsed team', () => {
    expect(matchReader.data).toHaveProperty('San Jose Earthquakes');
  });
});

describe('MatchReader can accurately parse team and score', () => {
  const matchReader = new MatchReader(sampleFile);

  it('Has correct score for given team', () => {
    const SJ = matchReader.data['San Jose Earthquakes'][0];

    expect(SJ.result).toBe(MatchResult['T']);
    expect(SJ.score).toBe(3);
    expect(SJ.opponent).toBe('Santa Cruz Slugs');
  });
});
