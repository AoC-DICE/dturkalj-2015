import * as data from './input.json'
import fs from 'fs';

function day12TaskTwo() {
    type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
    type JSONObject = { [key: string]: JSONValue };
    type JSONArray = JSONValue[];

    let input: string = fs.readFileSync('src/day12/input.txt', "utf-8");
    let json = JSON.parse(input);
    let reducedJson = removeRed(json);
    let numbers = JSON.stringify(reducedJson).match(/-?\d+/g);
    let sum = 0;

    if (numbers !== null) {
        numbers.forEach((num) => {
            sum += Number(num);
        });
    }

    console.log(`Total sum: ${sum}`);

    function removeRed(obj: JSONValue): JSONValue | null {
        if (Array.isArray(obj)) {
            return obj.map(removeRed).filter((item): item is JSONValue => item !== null);
        } else if (typeof obj === 'object' && obj !== null) {
            for (let value of Object.values(obj)) {
                if (value === "red") {
                    return null;
                }
            }
            let newObj: JSONObject = {};
            for (let [key, value] of Object.entries(obj)) {
                let result = removeRed(value);
                if (result !== null) {
                    newObj[key] = result;
                }
            }
            return Object.keys(newObj).length > 0 ? newObj : null;
        } else {
            return obj;
        }
    }
}

day12TaskTwo();