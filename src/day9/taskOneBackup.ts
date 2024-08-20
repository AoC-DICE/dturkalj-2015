function day9TaskOneBackup() {
    class MyNode {
        path: any[];
        reducedMatrix: any[][];
        cost: number;
        vertex: number;
        level: number;

        constructor() {
            this.path = [];
            this.reducedMatrix = Array.from({length: N}, () => Array(N).fill(0));
            this.cost = 0;
            this.vertex = 0;
            this.level = 0;
        }
    }

    let INF = Number.MAX_SAFE_INTEGER;
    let N = 9;

    function newNode(parentMatrix, path, level, i, j) {
        const node = new MyNode();
        node.path = [...path];

        if (level !== 0) {
            node.path.push([i, j]);
        }

        for (let r = 0; r < N; r++) {
            node.reducedMatrix[r] = parentMatrix[r].slice();
        }

        if (level !== 0) {
            for (let k = 0; k < N; k++) {
                node.reducedMatrix[i][k] = INF;
                node.reducedMatrix[k][j] = INF;
            }
            node.reducedMatrix[j][0] = INF;
        }

        node.level = level;
        node.vertex = j;

        return node;
    }

    function rowReduction(reducedMatrix, row) {
        row.fill(INF);

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (reducedMatrix[i][j] < row[i]) {
                    row[i] = reducedMatrix[i][j];
                }
            }
        }

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (reducedMatrix[i][j] !== INF && row[i] !== INF) {
                    reducedMatrix[i][j] -= row[i];
                }
            }
        }

        return 0;
    }

    function columnReduction(reducedMatrix, col) {
        col.fill(INF);

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (reducedMatrix[i][j] < col[j]) {
                    col[j] = reducedMatrix[i][j];
                }
            }
        }

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (reducedMatrix[i][j] !== INF && col[j] !== INF) {
                    reducedMatrix[i][j] -= col[j];
                }
            }
        }

        return 0;
    }

    function calculateCost(reducedMatrix) {
        let cost = 0;
        const row = Array(N).fill(0);
        const col = Array(N).fill(0);

        rowReduction(reducedMatrix, row);
        columnReduction(reducedMatrix, col);

        for (let i = 0; i < N; i++) {
            cost += row[i] !== INF ? row[i] : 0;
            cost += col[i] !== INF ? col[i] : 0;
        }

        return cost;
    }

    function printPath(list) {
        for (const path of list) {
            console.log(`${path[0] + 1} -> ${path[1] + 1}`);
        }
    }

    function solve(CostGraphMatrix) {
        const pq = new PriorityQueue((a, b) => a.cost - b.cost);
        const v = [];

        const root = newNode(CostGraphMatrix, v, 0, -1, 0);
        root.cost = calculateCost(root.reducedMatrix);

        pq.enqueue(root);

        while (!pq.isEmpty()) {
            const min = pq.dequeue();
            const i = min.vertex;

            if (min.level === N - 1) {
                min.path.push([i, 0]);
                printPath(min.path);
                return min.cost;
            }

            for (let j = 0; j < N; j++) {
                if (min.reducedMatrix[i][j] !== INF) {
                    const child = newNode(min.reducedMatrix, min.path, min.level + 1, i, j);
                    child.cost = min.cost + min.reducedMatrix[i][j] + calculateCost(child.reducedMatrix);
                    pq.enqueue(child);
                }
            }
        }

        return 0;
    }

    class PriorityQueue {
        heap: any[];
        comparator: (a, b) => number;

        constructor(comparator) {
            this.heap = [];
            this.comparator = comparator || ((a, b) => a - b);
        }

        enqueue(element) {
            this.heap.push(element);
            this.bubbleUp();
        }

        dequeue() {
            const min = this.heap[0];
            const last = this.heap.pop();

            if (this.heap.length > 0) {
                this.heap[0] = last;
                this.bubbleDown();
            }

            return min;
        }

        isEmpty() {
            return this.heap.length === 0;
        }

        bubbleUp() {
            let index = this.heap.length - 1;

            while (index > 0) {
                const parentIndex = Math.floor((index - 1) / 2);

                if (this.comparator(this.heap[index], this.heap[parentIndex]) >= 0) {
                    break;
                }

                [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
                index = parentIndex;
            }
        }

        bubbleDown() {
            let index = 0;

            while (index < this.heap.length) {
                const left = 2 * index + 1;
                const right = 2 * index + 2;
                let smallest = index;

                if (left < this.heap.length && this.comparator(this.heap[left], this.heap[smallest]) < 0) {
                    smallest = left;
                }

                if (right < this.heap.length && this.comparator(this.heap[right], this.heap[smallest]) < 0) {
                    smallest = right;
                }

                if (smallest === index) {
                    break;
                }

                [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
                index = smallest;
            }
        }
    }

    let CostGraphMatrix = [
        [INF, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, INF, 34, 100, 63, 108, 111, 89, 132],
        [0, 34, INF, 4, 79, 44, 147, 133, 74],
        [0, 100, 4, INF, 105, 95, 48, 88, 7],
        [0, 63, 79, 105, INF, 68, 134, 107, 40],
        [0, 108, 44, 95, 68, INF, 11, 66, 144],
        [0, 111, 147, 48, 134, 11, INF, 115, 135],
        [0, 89, 133, 88, 107, 66, 115, INF, 127],
        [0, 132, 74, 7, 40, 144, 135, 127, INF]
    ];

    console.log("Total cost is " + solve(CostGraphMatrix));
}

day9TaskOneBackup();