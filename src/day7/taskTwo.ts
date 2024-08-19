import fs from 'fs';

type Operation = {
    operation: string;
    input1: string | number | null;
    input2: string | number | null;
};

function parseValue(value: string): string | number {
    return isNaN(Number(value)) ? value : Number(value);
}

function parseInstruction(instruction: string) {
    let parts = instruction.split(" ");

    if (parts.length === 3) {
        wires[parts[2]] = {operation: "ASSIGN", input1: parseValue(parts[0]), input2: null};
    } else if (parts.length === 4) {
        wires[parts[3]] = {operation: "NOT", input1: parseValue(parts[1]), input2: null};
    } else if (parts.length === 5) {
        wires[parts[4]] = {operation: parts[1], input1: parseValue(parts[0]), input2: parseValue(parts[2])};
    }
}

function evaluateWire(wire: string): number {
    if (typeof wires[wire] === 'number') {
        return wires[wire] as number;
    }

    let operation = wires[wire] as Operation;
    let value: number;

    let input1: number = typeof operation.input1 === 'number' ? operation.input1 : evaluateWire(operation.input1 as string);
    let input2: number = 0;
    if (operation.input2 !== null) {
        input2 = typeof operation.input2 === 'number' ? operation.input2 : evaluateWire(operation.input2 as string);
    }
    switch (operation.operation) {
        case "ASSIGN":
            value = input1 & 0xFFFF;
            break;
        case "NOT":
            value = ~(input1) & 0xFFFF;
            break;
        case "AND":
            value = input1 & input2 & 0xFFFF;
            break;
        case "OR":
            value = input1 | input2 & 0xFFFF;
            break;
        case "LSHIFT":
            value = input1 << input2 & 0xFFFF;
            break;
        case "RSHIFT":
            value = input1 >> input2 & 0xFFFF;

            break;
        default:
            throw new Error(`Unknown operation: ${operation.operation}`);
    }

    wires[wire] = value;
    console.log(`Wire ${wire} evaluated to ${value} with operation ${operation.operation}: ${operation.input1}, ${operation.input2}`);
    return value;
}

let input = fs.readFileSync('src/day7/input2.txt', "utf-8");
let instructions = input.split("\n");
let wires: Record<string, Operation | number> = {};

instructions.forEach(parseInstruction);
let valueOnWireA = evaluateWire("a");

console.log(`Value on wire 'a': ${valueOnWireA}`);
