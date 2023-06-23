'use server';

import prisma from "@/lib/prisma";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function updateDone(id: number, done: boolean) {
    await delay(500);
    await prisma.todo.update({
        where: { id },
        data: { done },
    });
}
