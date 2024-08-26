import * as fs from 'fs';
import {log} from 'node:util';

function day18TaskOne() {

    let input: string = fs.readFileSync('src/day18/input.txt', "utf-8");
    let lines = input.split("\n");
    let lights: number[][] = [];
    let size = 102;
    let numberOfTurns = 100;

    lights.push(new Array(size).fill(0));
    lines.forEach((line) => {
        let row = new Array(size).fill(0);
        for (let i = 0; i < line.length; i++) {
            if (line[i] == "#") row[i + 1] = 1;
        }
        lights.push(row);
    });
    lights.push(new Array(size).fill(0));

    for (let k = 0; k < numberOfTurns; k++) {
        let newLights: number[][] = [];
        newLights.push(new Array(size).fill(0));
        for (let i = 1; i < size - 1; i++) {
            let newRow = new Array(size).fill(0);
            for (let j = 1; j < size - 1; j++) {
                if ((i === 1 || i === size - 2) && (j === 1 || j === size - 2)) {
                    newRow[j] = 1;
                } else {
                    let onNeighbours = checkNeighbours(i, j);
                    if (lights[i][j] === 0) {
                        if (onNeighbours === 3) newRow[j] = 1;
                    }
                    if (lights[i][j] === 1) {
                        if (onNeighbours === 2 || onNeighbours === 3) newRow[j] = 1;
                        else newRow[j] = 0;
                    }
                }
            }
            newLights.push(newRow);
        }
        newLights.push(new Array(size).fill(0));
        lights = [];
        lights.push(...newLights);
        //printLights();
        console.log(countTurnedOnAll());
    }

    function checkNeighbours(x: number, y: number) {
        let onNeighbours = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (lights[x + i][y + j] === 1) onNeighbours++;
            }
        }
        return lights[x][y] === 1 ? onNeighbours - 1 : onNeighbours;
    }

    function countTurnedOnAll() {
        let turnedOn = 0;
        for (let i = 1; i < size - 1; i++) {
            for (let j = 1; j < size - 1; j++) {
                if (lights[i][j] === 1) turnedOn++;
            }
        }
        return turnedOn;
    }

    function printLights() {
        for (let i = 0; i < size; i++) {
            let print = "";
            for (let j = 0; j < size; j++) {
                if (lights[i][j] === 1) print += "#";
                else print += "."
            }
            console.log(`${print}`);
        }
    }
}

day18TaskOne();