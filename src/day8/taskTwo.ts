import fs from 'fs';

function day8TaskTwo() {
    let input = fs.readFileSync('src/day8/input.txt', "utf-8");
    let lines = input.split("\n");
    let stringTotal = 0;
    let memoryTotal = 0;

    lines.forEach((line, index) => {
        stringTotal += line.length;
        line = line.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        line = `"${line}"`;
        memoryTotal += line.length;
    });

    console.log(`String total: ${stringTotal}, memory total: ${memoryTotal}`);
    console.log(`Result: ${memoryTotal - stringTotal}`);
}

day8TaskTwo();