import Link from "next/link";
import db from "@/app/lib/prismadb";

import TodoItem from "@/app/(client)/_components/todoItem";
import { createTodoSamePage } from "@/app/(actions)/todo";

// server action
async function toggleTodo(id: string, complete: boolean) {
  "use server";
  await db.todo.update({ where: { id }, data: { complete } });
}

export default async function Home() {
  const todos = await db.todo.findMany();

  return (
    <main>
      <header className="flex flex-row justify-between">
        <h1 className="mb-2 text-3xl font-medium leading-tight text-primary">
          SIMPLE TODO LIST - Next.js (SSR)
        </h1>
        <Link href="/new">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            New
          </button>
        </Link>
      </header>

      {/* SAME PAGE UPDATES */}
      <div>
        <form
          action={createTodoSamePage}
          className="flex flex-row justify-between"
        >
          <input
            type="text"
            name="title"
            className="my-2 block w-full p-4 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 m-2 rounded"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>

      <div>
        {todos && (
          <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                complete={todo.complete}
                toggleTodo={toggleTodo}
              />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
