import { relations } from 'drizzle-orm';
import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  // username: varchar('username', { length: 100 }),

  email: varchar('email', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  modifiedAt: timestamp('modified_at').defaultNow().notNull()
});

export const userTokens = pgTable('user_tokens', {
  id: uuid('id').defaultRandom().primaryKey(),
  accessJti: varchar('access_jti', { length: 100 }).notNull(),
  accessJtiExpiresAt: timestamp('access_jti_expires_at').notNull(),
  refreshJti: varchar('refresh_jti', { length: 100 }).notNull(),
  refreshJtiExpiresAt: timestamp('refresh_jti_expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  modifiedAt: timestamp('modified_at').defaultNow().notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id)
});

export const passwords = pgTable('passwords', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 100 }).notNull(),
  description: varchar('description', { length: 150 }),
  url: text('url'),
  username: varchar('username', { length: 100 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  iv: varchar('iv', { length: 255 }).notNull(),
  authTag: varchar('auth_tag', { length: 255 }).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  modifiedAt: timestamp('modified_at').defaultNow().notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  categoryId: uuid('category_id').references(() => categories.id)
});

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 50 }).notNull()
});

export const tags = pgTable('tags', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 50 }).notNull()
});

export const passwordsTags = pgTable(
  'passwords_tags',
  {
    passwordId: uuid('password_id')
      .notNull()
      .references(() => passwords.id),
    tagId: uuid('tag_id')
      .notNull()
      .references(() => tags.id)
  },
  (passwordsTags) => ({
    cpk: primaryKey({
      columns: [passwordsTags.tagId, passwordsTags.passwordId]
    })
  })
);

export const userRelations = relations(users, ({ many }) => ({
  userTokens: many(userTokens),
  passwords: many(passwords)
}));

export const userTokenRelations = relations(userTokens, ({ one }) => ({
  user: one(users, {
    fields: [userTokens.userId],
    references: [users.id]
  })
}));

export const passwordRelations = relations(passwords, ({ one, many }) => ({
  user: one(users, {
    fields: [passwords.userId],
    references: [users.id]
  }),
  category: one(categories, {
    fields: [passwords.categoryId],
    references: [categories.id]
  }),
  passwordsTags: many(passwordsTags)
}));

export const categoryRelations = relations(categories, ({ many }) => ({
  passwords: many(passwords)
}));

export const passwordTagRelations = relations(passwordsTags, ({ one }) => ({
  password: one(passwords, {
    fields: [passwordsTags.passwordId],
    references: [passwords.id]
  }),
  tag: one(tags, {
    fields: [passwordsTags.tagId],
    references: [tags.id]
  })
}));

export const tagRelations = relations(tags, ({ many }) => ({
  passwordsTags: many(passwordsTags)
}));
