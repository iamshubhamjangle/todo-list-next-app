import Link from "next/link";
import db from "./lib/prismadb";
import TodoItem from "./(ui)/new/todoItem";

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
    </main>
  );
}
