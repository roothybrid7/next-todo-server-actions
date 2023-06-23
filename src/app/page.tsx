import prisma from "@/lib/prisma"
import assert from "assert";
import { revalidateTag } from "next/cache";
import DoneCheckbox from "./DoneCheckbox";

// Data fetching in server components
async function getTodoList() {
  const todoList = await prisma.todo.findMany();
  return todoList;
}

// Server action
async function createTodo(data: FormData) {
  'use server';
  const title = data.get('title');
  assert(title, 'title is required');
  await prisma.todo.create({
    data: {
      title: title as string,
    }
  })
  revalidateTag('todo');
}

export default async function Home() {
  const todoList = await getTodoList();

  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="font-bold text-2xl">Todo</h1>
      <form action={createTodo} className="flex mt-8 items-center">
        <label htmlFor="title" className="pr-2">Todoを追加</label>
        <input type="text" name="title" id="title" className="border border-gray-300 rounded-md p-2" />
        <button type="submit" className="bg-blue-500 text-white rounded-md p-2 ml-2">追加</button>
      </form>
      <table className="table-auto mt-8 text-left hover:table-fixed">
        <thead className="text-gray-700 bg-gray-50">
          <tr>
            <th className="px-6 py-3">タイトル</th>
            <th className="px-6 py-3">完了</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((todo) => (
            <tr className="bg-white border-b" key={todo.id}>
              <td className="px-6 py-4 text-gray=900">{todo.title}</td>
              <td className="px-6 py-4"><DoneCheckbox id={todo.id} done={todo.done} /></td>
            </tr>
          ))}
          </tbody>
        </table>
    </main>
  )
}
