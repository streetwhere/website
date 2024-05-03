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
	mail: z.string().email(),
	password: z.string().min(8),
});

export default function LoginForm() {
	const form = useForm<z.infer<typeof FORM_SCHEMA>>({
		resolver: zodResolver(FORM_SCHEMA),
		defaultValues: {
			mail: "",
			password: "",
		},
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
					name="mail"
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
								<Input placeholder="********" {...field} />
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
