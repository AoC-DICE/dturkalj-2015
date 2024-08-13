import data from './input.json';

let input = data.input;
let floor = 0;

for (let i = 0; i < input.length; i++) {
    if (input[i] == "(") floor++;
    else floor--;
}

console.log(floor);