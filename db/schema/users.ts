import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { v7 as uuid7 } from 'uuid';

import { type InferSelectModel } from 'drizzle-orm';

export const userTable = pgTable('users', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => uuid7()),
  googleId: text('google_id').notNull().unique(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  picture: text('picture').notNull(),
});

export const sessionTable = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
