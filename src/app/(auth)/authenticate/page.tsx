"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/_components/ui/tabs";
import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default function Authenticate({ children }: PropsWithChildren) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [req, setReq] = useState(searchParams.get("req") ?? "login");

	function appendQueryParam(value: string) {
		setReq(value);

		const params = new URLSearchParams(searchParams.toString());
		params.set("req", value);

		router.push(`${pathname}?${params.toString()}`);
	}
	useEffect(() => {
		if (!searchParams.get("req")) appendQueryParam(req);
	});

	return (
		<div className="grow flex flex-col gap-10 justify-center items-center">
			<div className="flex flex-col text-center gap-3">
				<span className="font-medium text-4xl">Welcome Back</span>
				<span className="opacity-50">
					Please enter your details to sign up or login accordingly.
				</span>
			</div>

			<Tabs
				value={req}
				className="w-full max-w-[500px] flex flex-col gap-5"
			>
				<TabsList className="flex">
					<TabsTrigger
						className="grow"
						onClick={() => appendQueryParam("login")}
						value="login"
					>
						Login
					</TabsTrigger>
					<TabsTrigger
						className="grow"
						onClick={() => appendQueryParam("signup")}
						value="signup"
					>
						Sign up
					</TabsTrigger>
				</TabsList>
				<TabsContent className="" value="login">
					<LoginForm />
				</TabsContent>
				<TabsContent value="signup">
					<SignUpForm />
				</TabsContent>
			</Tabs>
		</div>
	);
}
