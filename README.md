# jane-soccer

Jane Technologies take home assignment

# Setup

You will need globally installed versions of `node`, `typescript`, `ts-node`, `jest` to run the npm scripts

Node
<https://nodejs.org/en/download/>

Then use the following command(s) to globally install typescript:

`npm install -g typescript`

`npm install -g ts-node`

`npm install -g jest`

Depending on your environment configuration, you may need to symlink or update the PATH to use these globally.

fork/clone this repo locally if you haven't already.

`npm install` from the project directory

# Scripts

If using `ts-node`, you can skip manual compilation and run with:

`npm run start:ts`

Compile the code for usage in Node:

`npm run build`

Run the compiled code:

`npm run start`

Automated tests:

`npm run test`

# How to use

The app runs in the terminal and accepts input from stdin.

You can specify `exit` to exit to the program.

You can enter a file name with `.txt` extension to be processed by the program.

A valid file will log rankings by match day for a soccer league to the terminal.

Absolute file path will work. Though you may also drop your text file in the input folder from the root directory and specify the relative path (e.g. `input\sample-input.txt`).
