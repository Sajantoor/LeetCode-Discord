import { Message } from "discord.js";
import { newUser, User } from "../utilities/user";
import { db } from "../components/firebase";
import { query, collection, where, getDocs, addDoc, updateDoc } from "firebase/firestore";

const USER_COLLECTION = "users";

/**
 * Updates the user's score and solved questions
 * 
 * @param message The message from the user
 * @param updateScore The amount to update the user's score by
 * @param question The question number to update the user's solved questions
 * @returns The user's new score
 */
export async function updateUserScore(message: Message, updateScore: number, question: number): Promise<number> {
    const userId = message.author.id;
    let user = await getUser(userId);

    if (user === null) {
        user = await createUser(userId);
    }

    // Check if the user has already solved the question
    if (user.solved.includes(question))
        return user.score;

    // TODO: Should check if the user has a streak at this point and add a multipler
    // to the score
    const score = user.score + updateScore;
    const solved = user.solved;
    solved.push(question);

    const updatedUser = {
        ...user,
        solved,
        score
    }

    updateUser(userId, updatedUser);
    return score;
}

/**
 * 
 * @param userId The user's discord id
 * @param updatedUser The user with the updated information
 */
export async function updateUser(userId: string, updatedUser: User): Promise<void> {
    const userQuery = query(
        collection(db, USER_COLLECTION),
        where("id", "==", userId)
    );
    const fetchedUsers = await getDocs(userQuery);
    const userRef = fetchedUsers.docs[0].ref;
    await updateDoc(userRef, {
        ...updatedUser,
    });
}

/**
 * 
 * @returns Returns all the users in the database
 */
export async function getUsers(): Promise<User[]> {
    const users: User[] = [];
    const userQuery = query(
        collection(db, USER_COLLECTION),
    );

    const userDocs = await getDocs(userQuery);
    userDocs.forEach(doc => {
        const user = doc.data() as User;
        users.push(user);
    });

    return users;
}

/**
 * 
 * @param userId The user's discord id
 * @returns The user with the given id or null if the user does not exist
 */
export async function createUser(userId: string): Promise<User> {
    const user = newUser(userId);
    const userRef = collection(db, USER_COLLECTION);
    await addDoc(userRef, user);

    return user;
}

/**
 * 
 * @param userId The user's discord id
 * @returns The user with the given id or null if the user does not exist
 */
export async function getUser(userId: string): Promise<User | null> {
    // get the user from the database
    const userQuery = query(
        collection(db, USER_COLLECTION),
        where("id", "==", userId),
    );

    const userDocs = await getDocs(userQuery);
    if (userDocs.empty) {
        return null;
    }

    // there should not be more than one user with the same userId
    const user = userDocs.docs[0].data() as User;
    return user;
}