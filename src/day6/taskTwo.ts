import * as fs from 'fs';

function parseInstruction(input: string) {
    let regex = /^(toggle|turn on|turn off) (\d+),(\d+) through (\d+),(\d+)$/;
    let match = input.match(regex);
    if (match) {
        let [_, command, x1, y1, x2, y2] = match;
        return {
            command,
            x1,
            y1,
            x2,
            y2
        };
    } else {
        throw new Error("Input string does not match the expected format.");
    }
}

function doAction(action: string, x1: number, y1: number, x2: number, y2: number) {
    for (let i = x1; i <= x2; i++) {
        for (let j = y1; j <= y2; j++) {
            switch (action) {
                case "turn on": {
                    lights[i][j]++;
                    break;
                }
                case "turn off": {
                    if (lights[i][j] > 0)
                        lights[i][j]--;
                    break;
                }
                case "toggle": {
                    lights[i][j] += 2;
                    break;
                }
            }
        }
    }
}

let input: string = fs.readFileSync('src/day6/input.txt', "utf-8");
let commands = input.split("\n");
let lights: number[][] = [];
let size = 1000;
let brightness = 0;

for (let i = 0; i < size; i++) {
    let row = new Array(size).fill(0);
    lights.push(row);
}

commands.forEach((command, index) => {
    let instruction = parseInstruction(command);
    doAction(instruction.command, +instruction.x1, +instruction.y1, +instruction.x2, +instruction.y2);
});

for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        brightness += lights[i][j];
    }
}

console.log(`Total brightness: ${brightness}`);