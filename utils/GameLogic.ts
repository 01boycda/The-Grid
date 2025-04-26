import { ArrowData, ArrowRotation } from "../constants/types";
import { DIFFICULTY } from "./Settings";

// CONSTANTS
export const cleanGrid: ArrowData[] =
    [{ id: 0, rotation: '0deg', active: true },
    { id: 1, rotation: '0deg', active: true },
    { id: 2, rotation: '0deg', active: true },
    { id: 3, rotation: '0deg', active: true },
    { id: 4, rotation: '0deg', active: true },
    { id: 5, rotation: '0deg', active: true },
    { id: 6, rotation: '0deg', active: true },
    { id: 7, rotation: '0deg', active: true },
    { id: 8, rotation: '0deg', active: true },]


// FUNCTIONS

// Generate a new puzzle
export function createNewGrid(): { newGrid: ArrowData[], newSequence: number[] } {
    let newGrid: ArrowData[];
    let newSequence: number[];

    while (true) {
        // Get clean grid
        newGrid = cleanGrid;

        // Randomize each arrow rotation
        newGrid.map((arrow, i) => {
            arrow.rotation = randomizeRotation(i);
        });

        // Activate random buttons
        newSequence = [];
        while (newSequence.length < DIFFICULTY) {

            let r = Math.floor(Math.random() * 9);
            if (!newSequence.includes(r)) {
                newSequence.push(r);
                newGrid = activateButton(newGrid, r);
            }
        }

        // If grid is NOT all green, break out of the loop
        if (!newGrid.every(arrow => arrow.active)) {
            break;
        }
    }

    // Show sequence for testing
    console.log("Solution", getSolution(newSequence));

    return { newGrid, newSequence };
}

// Returns new Grid with toggled colours
export function activateButton(grid: ArrowData[], index: number): ArrowData[] {
    let newGrid = [...grid];
    newGrid[index].active ? newGrid[index].active = false : newGrid[index].active = true

    switch (grid[index].rotation) {
        case '0deg':
            newGrid[index - 3].active ? newGrid[index - 3].active = false : newGrid[index - 3].active = true
            break
        case '45deg':
            newGrid[index - 2].active ? newGrid[index - 2].active = false : newGrid[index - 2].active = true
            break
        case '90deg':
            newGrid[index + 1].active ? newGrid[index + 1].active = false : newGrid[index + 1].active = true
            break
        case '135deg':
            newGrid[index + 4].active ? newGrid[index + 4].active = false : newGrid[index + 4].active = true
            break
        case '180deg':
            newGrid[index + 3].active ? newGrid[index + 3].active = false : newGrid[index + 3].active = true
            break
        case '225deg':
            newGrid[index + 2].active ? newGrid[index + 2].active = false : newGrid[index + 2].active = true
            break
        case '270deg':
            newGrid[index - 1].active ? newGrid[index - 1].active = false : newGrid[index - 1].active = true
            break
        case '315deg':
            newGrid[index - 4].active ? newGrid[index - 4].active = false : newGrid[index - 4].active = true
            break
        default:
            console.log(`${grid[index].rotation} not accounted for`)
            break
    }

    return newGrid;
}

// Randomize rotation of arrows while preventing any from pointing out of the grid
export function randomizeRotation(index: number): ArrowRotation {
    switch (index) {
        case 0:
            return `${(Math.floor(Math.random() * 3) * 45) + 90}deg` as ArrowRotation; // Top Left
        case 1:
            return `${(Math.floor(Math.random() * 5) * 45) + 90}deg` as ArrowRotation; // Top Middle
        case 2:
            return `${(Math.floor(Math.random() * 3) * 45) + 180}deg` as ArrowRotation; // Top Right
        case 3:
            return `${(Math.floor(Math.random() * 5) * 45)}deg` as ArrowRotation; // Middle Left
        case 4:
            return `${(Math.floor(Math.random() * 8) * 45)}deg` as ArrowRotation; // Middle Middle
        case 5:
            return `${((Math.floor(Math.random() * 5) * 45) + 180) % 360}deg` as ArrowRotation; // Middle Right
        case 6:
            return `${(Math.floor(Math.random() * 3) * 45)}deg` as ArrowRotation; // Bottom Left
        case 7:
            return `${mod(((Math.floor(Math.random() * 5) * 45) - 90), 360)}deg` as ArrowRotation; // Bottom Middle
        case 8:
            return `${mod(((Math.floor(Math.random() * 3) * 45) - 90), 360)}deg` as ArrowRotation; // Bottom Right
        default:
            alert(`Error: Index out of range (${index})`); // Error handling
            return '0deg' as ArrowRotation;
    }
}

// Return solution in readable format
function getSolution(sequence: number[]): string[] {
    let sequenceString: string[] = [];

    sequence.reverse().forEach(buttonIndex => {
        switch (buttonIndex) {
            case 0:
                sequenceString.push('Top Left');
                break;
            case 1:
                sequenceString.push('Top Middle');
                break;
            case 2:
                sequenceString.push('Top Right');
                break;
            case 3:
                sequenceString.push('Middle Left');
                break;
            case 4:
                sequenceString.push('Middle Middle');
                break;
            case 5:
                sequenceString.push('Middle Right');
                break;
            case 6:
                sequenceString.push('Bottom Left');
                break;
            case 7:
                sequenceString.push('Bottom Middle');
                break;
            case 8:
                sequenceString.push('Bottom Right');
                break;
            default:
                console.error(`Error: Button index out of range (${buttonIndex})`);
        }
    });

    return sequenceString;
}

// Custom mod function
const mod = (a: number, n: number): number => {
    return a - (n * Math.floor(a / n));
}