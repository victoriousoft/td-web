import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
	await prisma.admin.upsert({
		where: { email: process.env.ADMIN_EMAIL },
		update: {},
		create: {
			email: process.env.ADMIN_EMAIL as string
		}
	});

	await prisma.save.create({
		data: {
			title: "Test save",
			userEmail: process.env.ADMIN_EMAIL as string,
			content: JSON.stringify({ foo: "bar" })
		}
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
