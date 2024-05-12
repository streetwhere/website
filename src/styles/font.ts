import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Onest } from 'next/font/google'

const geist = GeistSans.variable
const geistMono = GeistMono.variable

const onest = Onest({
	subsets: ['latin'],
	variable: '--font-logo',
})

export const font: string = `${geist} ${geistMono} ${onest.variable} `
