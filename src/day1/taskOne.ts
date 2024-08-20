import data from './input.json';

function day1TaskOne() {
    let input = data.input;
    let floor = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i] == "(") floor++;
        else floor--;
    }

    console.log(floor);
}

day1TaskOne();