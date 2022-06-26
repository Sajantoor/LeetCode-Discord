export interface User {
    id: string;
    score: number;
    solved: number[];
}

/**
 * 
 * @param userId The user's discord id
 * @param score The user's score
 * @param solved The user's solved questions
 * @returns A new user object
 */
export function newUser(userId: string = "", score: number = 0, solved: number[] = []): User {
    return {
        id: userId,
        score: score,
        solved: solved,
    }
}