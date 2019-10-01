import fs from 'fs';

const filename = 'input/sample-input.txt';

const lines = fs
  .readFileSync(filename, {
    encoding: 'utf-8'
  })
  .split('\n');

console.log(lines);
