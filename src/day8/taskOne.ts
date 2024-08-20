import fs from 'fs';

function day8TaskOne() {
    let input = fs.readFileSync('src/day8/input.txt', "utf-8");
    let lines = input.split("\n");
    let stringTotal = 0;
    let memoryTotal = 0;

    lines.forEach((line, index) => {
        stringTotal += line.length;
        line = line.replace(/^"|"$/g, '');
        line = line.replace(/\\["\\]|\\x[0-9A-Fa-f]{2}/g, '.');
        memoryTotal += line.length;
    });

    console.log(`String total: ${stringTotal}, memory total: ${memoryTotal}`);
    console.log(`Result: ${stringTotal - memoryTotal}`);
}

day8TaskOne();