function day9TaskOne() {
    const INF = Number.MAX_SAFE_INTEGER;
    let minDistanceFinal = Number.MAX_SAFE_INTEGER;

    let paths = generateUniqueValuesWithoutReverses(8);

    let distances = [
        [INF, 34, 100, 63, 108, 111, 89, 132],
        [34, INF, 4, 79, 44, 147, 133, 74],
        [100, 4, INF, 105, 95, 48, 88, 7],
        [63, 79, 105, INF, 68, 134, 107, 40],
        [108, 44, 95, 68, INF, 11, 66, 144],
        [111, 147, 48, 134, 11, INF, 115, 135],
        [89, 133, 88, 107, 66, 115, INF, 127],
        [132, 74, 7, 40, 144, 135, 127, INF]
    ];

    paths.forEach((path, index) => {
        let minDistance = 0;
        for (let i = 0; i < path.length - 1; i++) {
            minDistance += distances[path.charAt(i)][path.charAt(i + 1)];
        }
        if (minDistance < minDistanceFinal) minDistanceFinal = minDistance;
    });

    console.log(`Maximum cost is ${minDistanceFinal}`);

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

day9TaskOne();