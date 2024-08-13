import data from './input.json';

let input: string = data.input;
let floor: number = 0;
let base: number = 0;

for (let i: number = 0; i < input.length; i++) {
    if (input[i] == "(") floor++;
    else floor--;
    if (floor <= -1) {
        base = i;
        break;
    }
}

console.log(base);