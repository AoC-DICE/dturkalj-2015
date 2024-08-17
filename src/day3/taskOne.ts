import * as fs from 'fs';

let directions: string = fs.readFileSync('src/day3/input.txt', "utf-8");
let locationX: number = 0;
let locationY: number = 0;

let houses = new Set<string>;
houses.add(`${locationX}, ${locationY}`);

for (let i = 0; i < directions.length; i++) {
    switch (directions[i]) {
        case ">": {
            locationX++;
            break;
        }
        case "<": {
            locationX--;
            break;
        }
        case "^": {
            locationY++;
            break;
        }
        case "v": {
            locationY--;
            break;
        }
        default:
            throw new Error("Invalid direction");
    }
    houses.add(`${locationX}, ${locationY}`);
}

console.log(houses.size);