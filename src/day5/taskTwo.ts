import * as fs from 'fs';

function day5TaskTwo() {
    let input: string = fs.readFileSync('src/day5/input.txt', "utf-8");
    let words = input.split("\n");
    let nice = 0;
    let bad = 0;
    let regex = new RegExp(/(?=.*([a-z]{2}).*\1)(?=.*([a-z]).\2)/);
    words.forEach((word, index) => {
        if (regex.test(word)) nice++;
        else bad++;
    });

    console.log(`Nice: ${nice}, bad: ${bad}`);
}

day5TaskTwo();