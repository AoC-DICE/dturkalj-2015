import * as fs from 'fs';

let file: string = fs.readFileSync('src/day2/input.txt', "utf-8");
let gifts: string[] = file.split("\n");
let totalArea: number = 0;

gifts.forEach((gift, index) => {
    let size: number[] = gift.split("x").map(num => {
        return Number(num)
    });
    let sides: number[] = [];
    sides.push(2 * size[0] * size[1]);
    sides.push(2 * size[1] * size[2]);
    sides.push(2 * size[2] * size[0]);
    let area: number = sides[0] + sides[1] + sides[2] + Math.min(...sides) / 2;
    console.log("Gift %d: %d", index + 1, area);
    totalArea += area;
});

console.log("Total gift wrapping needed: %d\n", totalArea);