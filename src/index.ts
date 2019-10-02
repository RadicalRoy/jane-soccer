import { MatchAggregator } from './model/MatchAggregator';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

console.log('=================================================\n');
console.log('Welcome to the Jane Technologies Soccer Match Aggregator!\n');
console.log(`Type 'exit' at any time to close the program.\n`);
console.log('=================================================\n');
rl.question('Enter name of txt file with match data: ', prompt);

function prompt(input: string): void {
  if (input.toLowerCase() === 'exit') {
    rl.close();
    process.stdin.destroy();
    return;
  } else {
    try {
      MatchAggregator.fromTxt(input);
    } catch (e) {
      console.log('Invalid file name. Try again.');
    }
  }
  rl.question('Enter name of file with match data: ', prompt);
}
