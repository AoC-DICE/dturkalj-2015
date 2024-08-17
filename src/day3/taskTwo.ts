import * as fs from 'fs';

let directions: string = fs.readFileSync('src/day3/input.txt', "utf-8");
let santaX: number = 0;
let santaY: number = 0;
let robotX: number = 0;
let robotY: number = 0;

let houses = new Set<string>;
houses.add(`${santaX}, ${santaY}`);

for (let i = 0; i < directions.length; i++) {
    if (i % 2 == 0) {
        switch (directions[i]) {
            case ">": {
                santaX++;
                break;
            }
            case "<": {
                santaX--;
                break;
            }
            case "^": {
                santaY++;
                break;
            }
            case "v": {
                santaY--;
                break;
            }
            default:
                throw new Error("Invalid direction");
        }
        houses.add(`${santaX}, ${santaY}`);
    } else {
        switch (directions[i]) {
            case ">": {
                robotX++;
                break;
            }
            case "<": {
                robotX--;
                break;
            }
            case "^": {
                robotY++;
                break;
            }
            case "v": {
                robotY--;
                break;
            }
            default:
                throw new Error("Invalid direction");
        }
        houses.add(`${robotX}, ${robotY}`);
    }
}

console.log(houses.size);