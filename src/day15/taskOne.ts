import fs from 'fs';

function day15TaskOne() {
    type Ingredient = {
        name: string,
        capacity: number,
        durability: number,
        flavor: number,
        texture: number,
        calories: number
    }
    let input = fs.readFileSync('src/day15/input.txt', "utf-8");
    let lines = input.split("\n");
    let ingredients: Ingredient[] = [];
    let numberOfTablespoons = 100;
    let bestCombination: number[] = Array(lines.length).fill(0);
    let bestResult = Number.MIN_SAFE_INTEGER;

    lines.forEach((line, index) => {
        let matches = line.match(/^(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)$/);
        if (matches !== null) {
            let [_, name, capacity, durability, flavor, texture, calories] = matches;
            ingredients.push({
                name: name,
                capacity: Number(capacity),
                durability: Number(durability),
                flavor: Number(flavor),
                texture: Number(texture),
                calories: Number(calories)
            });
        }
    });

    for (let x = 0; x <= numberOfTablespoons; x++) {
        for (let y = 0; y <= numberOfTablespoons - x; y++) {
            for (let z = 0; z <= numberOfTablespoons - x - y; z++) {
                let w = numberOfTablespoons - x - y - z;

                let capacity = ingredients[0].capacity * x + ingredients[1].capacity * y + ingredients[2].capacity * z + ingredients[3].capacity * w;
                let durability = ingredients[0].durability * x + ingredients[1].durability * y + ingredients[2].durability * z + ingredients[3].durability * w;
                let flavor = ingredients[0].flavor * x + ingredients[1].flavor * y + ingredients[2].flavor * z + ingredients[3].flavor * w;
                let texture = ingredients[0].texture * x + ingredients[1].texture * y + ingredients[2].texture * z + ingredients[3].texture * w;

                capacity = capacity < 0 ? 0 : capacity;
                durability = durability < 0 ? 0 : durability;
                flavor = flavor < 0 ? 0 : flavor;
                texture = texture < 0 ? 0 : texture;

                let result = capacity * durability * flavor * texture;

                if (result > bestResult) {
                    bestResult = result;
                    bestCombination = [x, y, z, w];
                }
            }
        }
    }
    console.log(`Best result: ${bestResult}, combination: ${bestCombination}`);
}

day15TaskOne();