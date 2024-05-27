'use client'

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/app/_components/ui/navigation-menu'
import Link from 'next/link'

export default function NavMenu() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Shops</NavigationMenuTrigger>
					<NavigationMenuContent>
						<Link href={'shopd'}>
							<NavigationMenuLink
								className={navigationMenuTriggerStyle()}
							>
								Link
							</NavigationMenuLink>
						</Link>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}
