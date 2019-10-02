import { MatchReader } from '../src/model/MatchReader';

const sampleFile = 'input/sample-input.txt';

test('Can read input file', () => {
  const matchReader = new MatchReader(sampleFile);
  expect(matchReader.raw).not.toBe(undefined);
});
