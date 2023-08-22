import db from "@/app/lib/prismadb";

import TodoItem from "@/app/(client)/components/todoItem";
import {
  createTodoSamePage,
  toggleTodo,
  deleteTodo,
} from "@/app/(server)/(actions)/todo";

export default async function Home() {
  const todos = await db.todo.findMany();

  return (
    <main>
      <header className="text-3xl font-bold leading-tight text-primary">
        SIMPLE TODO LIST
      </header>

      {/* SAME PAGE UPDATES */}
      <div>
        <form
          action={createTodoSamePage}
          className="flex flex-row gap-2 justify-between py-4"
        >
          <input
            type="text"
            name="title"
            className="px-2 block w-full border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>

      <div>
        {todos && (
          <ul className="text-gray-500 list-inside dark:text-gray-400 divide-y divide-gray-200 ">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                complete={todo.complete}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
