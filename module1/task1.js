import readline from 'readline';
import { stringReverse } from './utils.mjs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    console.log(stringReverse(input));
});