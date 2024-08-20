import * as fs from 'fs';

function day3TaskTwo() {
    let directions: string = fs.readFileSync('src/day3/input.txt', "utf-8");
    let santaX: number = 0;
    let santaY: number = 0;
    let robotX: number = 0;
    let robotY: number = 0;

    function move(person: string, index: number): void {
        switch (directions[index]) {
            case ">": {
                if (person == "santa") santaX++;
                else robotX++;
                break;
            }
            case "<": {
                if (person == "santa") santaX--;
                else robotX--;
                break;
            }
            case "^": {
                if (person == "santa") santaY++;
                else robotY++;
                break;
            }
            case "v": {
                if (person == "santa") santaY--;
                else robotY--;
                break;
            }
            default:
                throw new Error("Invalid direction");
        }
    }

    let houses = new Set<string>;
    houses.add(`${santaX}, ${santaY}`);
    for (let i = 0; i < directions.length; i++) {
        if (i % 2 == 0) {
            move("santa", i);
            houses.add(`${santaX}, ${santaY}`);
        } else {
            move("robot", i);
            houses.add(`${robotX}, ${robotY}`);
        }
    }

    console.log(houses.size);
}

day3TaskTwo();