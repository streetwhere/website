import {
	integer,
	pgEnum,
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

export const role = pgEnum('role', ['user', 'admin'])

const pfps = [
	'carti',
	'carson',
	'destroy',
	'future',
	'lucki',
	'popsmoke',
	'sosa',
	'travis',
	'yachty',
	'yeat',
	'youngboy',
] as const

export const pfp = pgEnum('pfp', pfps)

export const user = createTable('user', {
	id: serial('id').primaryKey(),
	role: role('role').notNull().default('user'),
	pfp: pfp('pfp')
		.notNull()
		.$defaultFn(() => pfps.at(pfps.length * Math.random()) ?? 'lucki'),
	fullname: text('fullname'),
	username: varchar('username', { length: 24 }).notNull().unique(),
	email: varchar('email', { length: 256 }).notNull().unique(),
	password: varchar('password', { length: 128 }).notNull(),
})

export const session = createTable('session', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date',
	}).notNull(),
})

// MAILS

export const shop = createTable('shop', {
	id: serial('id').primaryKey(),
	to: varchar('to', { length: 256 }).unique(),
	name: text('name').notNull(),
	url: text('url').notNull(),
	description: text('desc'),
	added: timestamp('added').defaultNow(),
	location: text('location').notNull(),
})

export const mail = createTable('mail', {
	id: serial('id').primaryKey(),
	shopId: integer('shop_id').references(() => shop.id),
	added: timestamp('added').defaultNow(),
	subject: text('subject'),
	text: text('text'),
	html: text('html'),
})
