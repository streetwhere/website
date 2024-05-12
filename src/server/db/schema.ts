import {
	integer,
	pgTableCreator,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core'

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `streetwhere_${name}`)

export const users = createTable('user', {
	id: serial('id').primaryKey(),
	pfpId: integer('pfp_id').references(() => pfps.id),
	fullname: text('fullname'),
	username: varchar('username', { length: 24 }).notNull().unique(),
	email: varchar('email', { length: 256 }).notNull().unique(),
	password: varchar('password', { length: 128 }).notNull(),
})

export const sessions = createTable('session', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date',
	}).notNull(),
})

export const pfps = createTable('pfps', {
	id: serial('id').primaryKey(),
	changedAt: timestamp('changed_at', {
		mode: 'string',
	}).defaultNow(),
	name: text('name').notNull(),
	url: text('url').notNull(),
})

// MAILS

export const shops = createTable('shops', {
	id: serial('id').primaryKey(),
	to: varchar('to', { length: 256 }).unique(),
	name: text('name').notNull(),
	url: text('url').notNull(),
	description: text('desc'),
	added: timestamp('added').defaultNow(),
	location: text('location').notNull(),
})

export const mails = createTable('mails', {
	id: serial('id').primaryKey(),
	shopId: integer('shop_id').references(() => shops.id),
	added: timestamp('added').defaultNow(),
	subject: text('subject'),
	text: text('text'),
	html: text('html'),
})
