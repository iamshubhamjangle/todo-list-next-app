import Link from "next/link";
import db from "./lib/prismadb";

export default async function Home() {
  const todos = await db.todo.findMany();

  return (
    <main className="m-5">
      <h1>TODO LIST</h1>
      <Link href="/new">
        <button className="p-2 bg-slate-600">New</button>
      </Link>
      {todos && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="cursor-pointer">
              <input type="checkbox" id={todo.id} className="peer" />
              <label
                htmlFor={todo.id}
                className="peer-checked:line-through peer-checked:text-slate-500"
              >
                {todo.title}
              </label>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
