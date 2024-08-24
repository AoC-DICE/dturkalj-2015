import fs from 'fs';

function day16TaskOne() {
    let input = fs.readFileSync('src/day16/input.txt', "utf-8");
    let lines = input.split("\n");
    let aunts: Record<string, number>[] = [];
    let misteryAunt: Record<string, number> = {
        children: 3,
        cats: 7,
        samoyeds: 2,
        pomeranians: 3,
        akitas: 0,
        vizslas: 0,
        goldfish: 5,
        trees: 3,
        cars: 2,
        perfumes: 1
    }
    let lineRegex = /^Sue (\d+): (.+)$/;
    let attributeRegex = /(\w+): (\d+)/g;

    lines.forEach((line, index) => {
        let matches = line.match(lineRegex);
        if (matches !== null) {
            let aunt: Record<string, number> = {};
            aunt["name"] = Number(matches[1]);
            let attributesMatches;
            while ((attributesMatches = attributeRegex.exec(matches[2])) !== null) {
                aunt[attributesMatches[1]] = Number(attributesMatches[2]);
            }
            aunts.push(aunt);
        }
    });

    aunts.forEach((aunt) => {
        let isFound = true;
        for (let [key, value] of Object.entries(misteryAunt)) {
            if (aunt[key] !== undefined && aunt[key] !== value) {
                isFound = false;
                break;
            }
        }
        if (isFound) {
            console.log(`Mistery aunt is: Sue ${aunt["name"]}`);
        }
    });
}

day16TaskOne();