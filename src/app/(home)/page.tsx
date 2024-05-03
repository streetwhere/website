import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
	const hello = await api.test.hello({ text: "from tRPC" });
	const session = await getServerAuthSession();

	return <main className="">{hello.greeting}</main>;
}
