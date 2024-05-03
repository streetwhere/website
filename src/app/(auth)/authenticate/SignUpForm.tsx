"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import { Button } from "@/_components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const FORM_SCHEMA = z.object({
	username: z
		.string({ required_error: "Username is required!" })
		.min(1, "Username is required!")
		.min(3, "Username must be atleast 3 charachters long!")
		.max(24, "Username must be atmost 24 charachters long!"),
	email: z
		.string({ required_error: "Email is required!" })
		.min(1, "Email is required!")
		.email("Invalid email!")
		.readonly(),
	password: z
		.string({ required_error: "Password is required!" })
		.min(1, "Password is required!")
		.min(8, "Password must be atleast 8 charachters long!")
		.max(32, "Password must be less than 32 charachters!"),
});

export default function SignUpForm() {
	const form = useForm<z.infer<typeof FORM_SCHEMA>>({
		resolver: zodResolver(FORM_SCHEMA),
	});

	function onSubmit(values: z.infer<typeof FORM_SCHEMA>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="streetwhere" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mail</FormLabel>
							<FormControl>
								<Input
									placeholder="john.doe@mail.com"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder="********"
									type="password"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="w-full" type="submit">
					Continue
				</Button>
			</form>
		</Form>
	);
}
