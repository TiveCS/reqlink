import { InferSelectModel } from 'drizzle-orm';
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { v7 as uuid7 } from 'uuid';
import { userTable } from './users';

export enum ItemStatus {
  TODO = 1,
  IN_PROGRESS = 2,
  TESTING = 3,
  DONE = 4,
}

export const teamTable = pgTable('teams', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => uuid7()),
  name: varchar('name').notNull(),
  ownedBy: varchar('owned_by', { length: 36 })
    .notNull()
    .references(() => userTable.id),
});

export const teamMemberTable = pgTable('team_members', {
  teamId: varchar('team_id', { length: 36 })
    .notNull()
    .references(() => teamTable.id, { onDelete: 'cascade' }),
  memberId: varchar('member_id', { length: 36 })
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
});

export const projectTable = pgTable('projects', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => uuid7()),
  teamId: varchar('team_id', { length: 36 })
    .notNull()
    .references(() => teamTable.id, { onDelete: 'cascade' }),
  name: varchar('name').notNull(),
  description: varchar('description'),
  createdAt: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  deletedAt: timestamp('deleted_at', {
    mode: 'date',
    withTimezone: true,
  }),
});

export const documentSpecTable = pgTable('document_specs', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => uuid7()),
  projectId: varchar('project_id', { length: 36 })
    .notNull()
    .references(() => projectTable.id, { onDelete: 'cascade' }),
  title: varchar('title').notNull(),
  description: varchar('description'),
  createdAt: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  deletedAt: timestamp('deleted_at', {
    mode: 'date',
    withTimezone: true,
  }),
});

export const documentSpecItemTable = pgTable('document_spec_items', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => uuid7()),
  documentSpecId: varchar('document_spec_id', { length: 36 })
    .notNull()
    .references(() => documentSpecTable.id, { onDelete: 'cascade' }),
  title: varchar('title').notNull(),
  description: text('description'),
  status: integer('status')
    .$type<ItemStatus>()
    .notNull()
    .default(ItemStatus.TODO),
  createdAt: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const backlogTable = pgTable('backlogs', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => uuid7()),
  projectId: varchar('project_id', { length: 36 })
    .notNull()
    .references(() => projectTable.id, { onDelete: 'cascade' }),
  title: varchar('title').notNull(),
  description: text('description'),
  status: integer('status')
    .$type<ItemStatus>()
    .notNull()
    .default(ItemStatus.TODO),
  createdAt: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const backlogRelatedSpecItemTable = pgTable(
  'backlog_related_spec_items',
  {
    backlogId: varchar('backlog_id', { length: 36 })
      .notNull()
      .references(() => backlogTable.id, { onDelete: 'cascade' }),
    documentSpecItemId: varchar('document_spec_item_id', { length: 36 })
      .notNull()
      .references(() => documentSpecItemTable.id, { onDelete: 'cascade' }),
  }
);

export type Team = InferSelectModel<typeof teamTable>;
export type TeamMember = InferSelectModel<typeof teamMemberTable>;
export type Project = InferSelectModel<typeof projectTable>;
export type DocumentSpec = InferSelectModel<typeof documentSpecTable>;
export type DocumentSpecItem = InferSelectModel<typeof documentSpecItemTable>;
