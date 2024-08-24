import fs from 'fs';

function day14TaskOne() {
    type Reindeer = {
        speed: number,
        flyingTime: number,
        restingTime: number,
        flying: boolean,
        counter: number,
        distance: number
    }
    let input = fs.readFileSync('src/day14/input.txt', "utf-8");
    let lines = input.split("\n");
    let reindeer: Reindeer[] = [];
    let raceTime = 2503;

    lines.forEach((line, index) => {
        let matches = line.match(/^(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\.$/);
        if (matches !== null) {
            let [_, who, speed, flyingTime, restingTime] = matches;
            reindeer.push({
                speed: Number(speed),
                flyingTime: Number(flyingTime),
                restingTime: Number(restingTime),
                flying: true,
                counter: 0,
                distance: 0
            });
        }
    });

    for (let i = 1; i <= raceTime; i++) {
        reindeer.forEach((deer, index) => {
            deer.counter++;
            if (deer.flying && deer.counter <= deer.flyingTime) {
                deer.distance += deer.speed;
            }
            if (deer.flying && deer.counter === deer.flyingTime) {
                deer.flying = false;
                deer.counter = 0;
            }
            if (!deer.flying && deer.counter === deer.restingTime) {
                deer.flying = true;
                deer.counter = 0;
            }
        });
    }

    reindeer.forEach((deer, index) => {
        console.log(printReindeer(deer));
    });

    function printReindeer(deer: Reindeer): string {
        return `Reindeer Details:
        Speed: ${deer.speed} km/s
        Flying Time: ${deer.flyingTime} s
        Resting Time: ${deer.restingTime} s
        Is Flying: ${deer.flying}
        Counter: ${deer.counter}
        Distance: ${deer.distance} km`;
    }
}

day14TaskOne();