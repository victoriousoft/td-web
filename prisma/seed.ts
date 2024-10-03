import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
	await prisma.Admin.upsert({
		where: { email: process.env.ADMIN_EMAIL },
		update: {},
		create: {
			email: process.env.ADMIN_EMAIL
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
