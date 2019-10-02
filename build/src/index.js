"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MatchAggregator_1 = require("./model/MatchAggregator");
var readline_1 = __importDefault(require("readline"));
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
console.log('=================================================\n');
console.log('Welcome to the Jane Technologies Soccer Match Aggregator!\n');
console.log("Type 'exit' at any time to close the program.\n");
console.log('=================================================\n');
rl.question('Enter name of txt file with match data: ', prompt);
function prompt(input) {
    if (input.toLowerCase() === 'exit') {
        rl.close();
        process.stdin.destroy();
        return;
    }
    else {
        try {
            MatchAggregator_1.MatchAggregator.fromTxt(input);
        }
        catch (e) {
            console.log('Invalid file name. Try again.');
        }
    }
    rl.question('Enter name of file with match data: ', prompt);
}
