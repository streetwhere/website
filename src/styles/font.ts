import { Inter, Onest, Unbounded } from 'next/font/google'

const onest = Onest({
	subsets: ['latin'],
	variable: '--font-logo',
})

const unbounded = Unbounded({
	subsets: ['latin'],
	variable: '--font-title',
})

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-sans',
})

export const font: string = `${unbounded.variable} ${inter.variable} ${onest.variable} `
