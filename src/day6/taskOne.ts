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
                    lights[i][j] = true;
                    break;
                }
                case "turn off": {
                    lights[i][j] = false;
                    break;
                }
                case "toggle": {
                    lights[i][j] = !lights[i][j];
                    break;
                }
            }
        }
    }
}

let input: string = fs.readFileSync('src/day6/input.txt', "utf-8");
let commands = input.split("\n");
let lights: boolean[][] = [];
let size = 1000;
let turnedOn = 0;

for (let i = 0; i < size; i++) {
    let row = new Array(size).fill(false);
    lights.push(row);
}

commands.forEach((command, index) => {
    let instruction = parseInstruction(command);
    doAction(instruction.command, +instruction.x1, +instruction.y1, +instruction.x2, +instruction.y2);
});

for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        if (lights[i][j]) turnedOn++;
    }
}

console.log(`Turned on: ${turnedOn}`);