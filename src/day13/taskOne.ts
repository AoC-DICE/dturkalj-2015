// @ts-nocheck
import fs from 'fs';

function day13TaskOne() {
    let input = fs.readFileSync('src/day13/input.txt', "utf-8");
    let lines = input.split("\n");
    let numberOfPeople = 8;
    let maxHappiness = Number.MIN_SAFE_INTEGER;
    let happinessMap: number[][] = [];
    for (let i = 0; i < numberOfPeople; i++) {
        let row = new Array(numberOfPeople).fill(0);
        happinessMap.push(row);
    }

    lines.forEach((line, index) => {
        let matches = line.match(/^(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)\.$/);
        if (matches !== null) {
            let [_, person1, gainLose, units, person2] = matches;
            let firstPerson = Math.floor(index / numberOfPeople);
            let secondPerson = index % numberOfPeople;
            if (firstPerson === secondPerson) happinessMap[firstPerson][secondPerson] = 0
            else happinessMap[firstPerson][secondPerson] = (gainLose === "gain" ? 1 : -1) * Number(units);
        }
    });

    let possibleSittings = generateUniqueValuesWithoutReverses(numberOfPeople);

    possibleSittings.forEach((sitting, index) => {
        let happiness = 0;
        for (let i = 0; i < sitting.length - 1; i++) {
            if (i == 0) {
                happiness += happinessMap[Number(sitting.charAt(i))][Number(sitting.charAt(sitting.length - 1))];
                happiness += happinessMap[Number(sitting.charAt(i))][Number(sitting.charAt(i + 1))];
            } else if (i == sitting.length) {
                happiness += happinessMap[Number(sitting.charAt(i))][Number(sitting.charAt(i - 1))];
                happiness += happinessMap[Number(sitting.charAt(i))][Number(sitting.charAt(0))];
            } else {
                happiness += happinessMap[Number(sitting.charAt(i))][Number(sitting.charAt(i - 1))];
                happiness += happinessMap[Number(sitting.charAt(i))][Number(sitting.charAt(i + 1))];
            }
        }
        if (happiness > maxHappiness) maxHappiness = happiness;
    });

    console.log(`Best happiness: ${maxHappiness}`);

    function generatePermutations(array) {
        if (array.length === 1) return [array];
        let permutations = [];
        for (let i = 0; i < array.length; i++) {
            let remainingDigits = array.slice(0, i).concat(array.slice(i + 1));
            for (let perm of generatePermutations(remainingDigits)) {
                permutations.push([array[i]].concat(perm));
            }
        }
        return permutations;
    }

    function generateUniqueValuesWithoutReverses(num: number): string[] {
        let digits = [];
        for (let i = 0; i < num; i++) {
            digits.push(i.toString());
        }
        let uniqueValuesSet = new Set();
        for (let permutation of generatePermutations(digits)) {
            let permString = permutation.join('');
            if (permString < permutation.slice().reverse().join('')) {
                uniqueValuesSet.add(permString);
            }
        }
        return Array.from(uniqueValuesSet) as string[];
    }
}

day13TaskOne();