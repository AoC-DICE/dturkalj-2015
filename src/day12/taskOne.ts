import fs from 'fs';

function day12TaskOne() {
    let input: string = fs.readFileSync('src/day12/input.txt', "utf-8");
    let numbers = input.match(/-?\d+/g);
    let sum = 0;

    if (numbers !== null) {
        numbers.forEach((num) => {
            sum += Number(num);
        });
    }

    console.log(`Total sum: ${sum}`);
}

day12TaskOne();