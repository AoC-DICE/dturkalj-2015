function day10TaskOne() {
    const input: string = "3113322113";
    const repetitions: number = 40;
    let result: string = input;

    for (let i = 0; i < repetitions; i++) {
        let groups: RegExpMatchArray | null = result.match(/(\d)\1*/g);
        result = "";
        if (groups !== null) {
            groups.forEach((group, index) => {
                result += `${group.length}${group[0]}`;
            });
        }
    }
    console.log(`Length: ${result.length}`);
}

day10TaskOne();