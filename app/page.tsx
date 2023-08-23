import db from "@/app/lib/prismadb";

import TodoItem from "@/app/(client)/components/todoItem";
import { toggleTodo, deleteTodo } from "@/app/(server)/(actions)/todo";
import CreateTodoForm from "./(client)/components/createTodoForm";

export default async function Home() {
  const todos = await db.todo.findMany();

  return (
    <main>
      <header className="text-3xl font-bold leading-tight text-primary">
        SIMPLE TODO LIST
      </header>

      {/* SAME PAGE UPDATES */}
      <CreateTodoForm />

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
