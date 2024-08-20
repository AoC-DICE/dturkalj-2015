function day10TaskTwo() {
    const input = "3113322113";
    const repetitions = 50;
    let result = input;

    for (let i = 0; i < repetitions; i++) {
        let groups = result.match(/(\d)\1*/g);
        result = "";
        groups.forEach((group, index) => {
            result += `${group.length}${group[0]}`;
        });
    }
    console.log(`Length: ${result.length}`);
}

day10TaskTwo();