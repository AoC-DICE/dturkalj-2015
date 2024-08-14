import * as fs from 'fs';

let file: string = fs.readFileSync('src/day2/input.txt', "utf-8");
let gifts: string[] = file.split("\n");
let totalRibbon: number = 0;

gifts.forEach((gift, index) => {
    let size: number[] = gift.split("x").map(num => {
        return Number(num)
    });
    let volume = size[0] * size[1] * size[2];
    let max = size.indexOf(Math.max(...size));
    let ribbon: number = 2 * size[0] + 2 * size[1] + 2 * size[2] + volume - 2 * size[max];
    console.log("Gift %d: %d", index + 1, ribbon);
    totalRibbon += ribbon;
});

console.log("Total gift wrapping needed: %d\n", totalRibbon);