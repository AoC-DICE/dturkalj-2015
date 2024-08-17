import * as fs from 'fs';

let input: string = fs.readFileSync('src/day5/input.txt', "utf-8");
let words = input.split("\n");
let nice = 0;
let bad = 0;
let regex = new RegExp(/^(?=.*[aeiou].*[aeiou].*[aeiou])(?=.*(.)\1)(?!.*(ab|cd|pq|xy)).*$/);
words.forEach((word, index) => {
    if (regex.test(word)) nice++;
    else bad++;
});

console.log(`Nice: ${nice}, bad: ${bad}`);