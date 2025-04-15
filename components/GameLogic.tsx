export const randomizeRotation = (index: number): string => {
    switch (index) {
        case 0:
            return `${(Math.floor(Math.random() * 3) * 45) + 90}deg`; // Top Left
        case 1:
            return `${(Math.floor(Math.random() * 5) * 45) + 90}deg`; // Top Middle
        case 2:
            return `${(Math.floor(Math.random() * 3) * 45) + 180}deg`; // Top Right
        case 3:
            return `${(Math.floor(Math.random() * 5) * 45)}deg`; // Middle Left
        case 4:
            return `${(Math.floor(Math.random() * 8) * 45)}deg`; // Middle Middle
        case 5:
            return `${((Math.floor(Math.random() * 5) * 45) + 180) % 360}deg`; // Middle Right
        case 6:
            return `${(Math.floor(Math.random() * 3) * 45)}deg`; // Bottom Left
        case 7:
            return `${mod(((Math.floor(Math.random() * 5) * 45) - 90), 360)}deg`; // Bottom Middle
        case 8:
            return `${mod(((Math.floor(Math.random() * 3) * 45) - 90), 360)}deg`; // Bottom Right
        default:
            alert(`Error: Index out of range (${index})`); // Error handling
            return '0deg';
    }
}

const mod = (a: number, n: number): number => {
    return a - (n * Math.floor(a/n));
}