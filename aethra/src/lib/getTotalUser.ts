import { db } from "./db";

export async function getTotalUser() {
    const count = await db.user.count();
    return count;
}