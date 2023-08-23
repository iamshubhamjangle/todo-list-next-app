import db from "@/app/_lib/prismadb";

import CreateTodoForm from "@/app/(client)/_components/createTodoForm";
import TodoItem from "@/app/(client)/_components/todoItem";
import About from "@/app/(client)/_components/about";

import { toggleTodo, deleteTodo } from "@/app/(server)/(actions)/todo";

export default async function Home() {
  const todos = await db.todo.findMany();

  return (
    <main>
      {/* HEADER */}
      <header className="text-3xl font-bold leading-tight text-primary">
        SIMPLE TODO LIST
      </header>

      {/* SAME PAGE UPDATES */}
      <CreateTodoForm />

      {/* TODO LIST */}
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

      {/* ABOUT */}
      <About />
    </main>
  );
}
