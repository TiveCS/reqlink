import { eq, InferInsertModel } from 'drizzle-orm';
import { userTable } from '../schema';
import { db } from '..';

export async function createUser(data: InferInsertModel<typeof userTable>) {
  const result = await db
    .insert(userTable)
    .values(data)
    .returning({ id: userTable.id });
  return result[0];
}

export async function findUserByEmail(email: string) {
  return db.select().from(userTable).where(eq(userTable.email, email));
}

export async function findUserByGoogleId(googleId: string) {
  return db.query.userTable.findFirst({
    where: (userTable, { eq }) => eq(userTable.googleId, googleId),
  });
}
