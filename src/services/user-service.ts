import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export class UserService {
  static async register(name: string, email: string, password: string) {
    // 1. Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      throw new Error("User already exists");
    }

    // 2. Hash password
    const hashedPassword = await Bun.password.hash(password);

    // 3. Insert user
    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        createdAt: users.createdAt,
      });

    return newUser;
  }
}
