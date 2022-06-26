export interface User {
    id: string;
    score: number;
    solved: number[];
}

export function newUser(userId: string = "", score: number = 0, solved: number[] = []): User {
    return {
        id: userId,
        score: score,
        solved: solved,
    }
}