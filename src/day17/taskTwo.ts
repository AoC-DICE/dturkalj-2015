import fs from 'fs';
import {isNumberObject} from 'node:util/types';
import {start} from 'node:repl';

function day17TaskTwo() {
    let input = fs.readFileSync('src/day17/input.txt', "utf-8");
    let lines = input.split("\n");
    let allContainers: number[] = [];
    let allCombinations: number[][] = [];
    let totalCapacity = 150;
    let minimumNumberOfContainers = Number.MAX_SAFE_INTEGER;
    let numberOfMinimumCombination = 0;

    lines.forEach((line, index) => {
        allContainers.push(Number(line));
    });

    function findCombinations(containers: number[], target: number, start: number = 0, currentCombination: number[] = [], allCombinations: number[][] = []) {
        if (target === 0) {
            allCombinations.push([...currentCombination]);
            return;
        }
        for (let i = start; i < allContainers.length; i++) {
            if (allContainers[i] > target) {
                continue;
            }
            currentCombination.push(allContainers[i]);
            findCombinations(allContainers, target - allContainers[i], i + 1, currentCombination, allCombinations);
            currentCombination.pop();
        }
    }

    findCombinations(allContainers, totalCapacity, 0, [], allCombinations);

    allCombinations.forEach((combination) => {
        if (combination.length < minimumNumberOfContainers) minimumNumberOfContainers = combination.length;
    });

    allCombinations.forEach((combination) => {
        if (combination.length == minimumNumberOfContainers) numberOfMinimumCombination++;
    });

    console.log(`Number of combinations: ${numberOfMinimumCombination}`);
}

day17TaskTwo();