import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const todoData: Prisma.TodoCreateInput[] = [
    {
        title: "Buy milk",
    },
    {
        title: "Buy eggs",
    },
    {
        title: "Read a book",
    }
];

async function main() {
    console.log(`Start seeding ...`);
    for (const t of todoData) {
        const todo = await prisma.todo.create({
            data: t,
        });
        console.log(`Created todo with id: ${todo.id}`);
    }
    console.log(`Seeding finished.`);
}

main().then(async () => await prisma.$disconnect()).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});