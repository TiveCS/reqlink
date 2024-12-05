import { InferSelectModel, relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { v7 as uuid7 } from 'uuid';
import { userTable } from './users';

export const teamTable = pgTable('teams', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => uuid7()),
  name: varchar('name').notNull(),
});

export enum ItemStatus {
  TODO = 1,
  IN_PROGRESS = 2,
  TESTING = 3,
  DONE = 4,
}

export const projectTable = pgTable('projects', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => uuid7()),
  teamId: varchar('team_id', { length: 36 })
    .notNull()
    .references(() => teamTable.id),
  name: varchar('name').notNull(),
  description: varchar('description'),
  createdAt: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
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
    .references(() => projectTable.id),
  title: varchar('title').notNull(),
  description: varchar('description'),
  createdAt: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
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
  status: integer('status').$type<ItemStatus>().default(ItemStatus.TODO),
  createdAt: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
});

export const backlogTable = pgTable('backlogs', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => uuid7()),
  projectId: varchar('project_id', { length: 36 })
    .notNull()
    .references(() => projectTable.id),
  title: varchar('title').notNull(),
  description: text('description'),
  status: integer('status').$type<ItemStatus>().default(ItemStatus.TODO),
  createdAt: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
});

export const backlogRelatedSpecItemsTable = pgTable(
  'backlog_related_spec_items',
  {
    backlogId: varchar('backlog_id', { length: 36 }).references(
      () => backlogTable.id
    ),
    specItemId: varchar('spec_item_id', { length: 36 }).references(
      () => documentSpecItemTable.id
    ),
  }
);

export const teamRelation = relations(teamTable, ({ many }) => ({
  projects: many(projectTable),
  members: many(userTable),
}));

export const projectRelation = relations(projectTable, ({ one, many }) => ({
  team: one(teamTable, {
    fields: [projectTable.teamId],
    references: [teamTable.id],
  }),
  specifications: many(documentSpecTable),
}));

export const documentSpecRelation = relations(
  documentSpecTable,
  ({ one, many }) => ({
    project: one(projectTable, {
      fields: [documentSpecTable.projectId],
      references: [projectTable.id],
    }),
    items: many(documentSpecItemTable),
    relatedBacklogs: many(backlogTable),
  })
);

export const documentSpecItemRelation = relations(
  documentSpecItemTable,
  ({ one }) => ({
    spec: one(documentSpecTable, {
      fields: [documentSpecItemTable.documentSpecId],
      references: [documentSpecTable.id],
    }),
  })
);

export const backlogRelation = relations(backlogTable, ({ one, many }) => ({
  project: one(projectTable, {
    fields: [backlogTable.projectId],
    references: [projectTable.id],
  }),
  relatedSpecItems: many(documentSpecTable),
}));

export type Team = InferSelectModel<typeof teamTable>;
export type Project = InferSelectModel<typeof projectTable>;
export type DocumentSpec = InferSelectModel<typeof documentSpecTable>;
export type DocumentSpecItem = InferSelectModel<typeof documentSpecItemTable>;
