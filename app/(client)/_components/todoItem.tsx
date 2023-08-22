"use client";

import { Trash2 } from "lucide-react";

type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, checked: boolean) => void;
  deleteTodo: (id: string) => void;
};

const TodoItem = ({
  id,
  title,
  complete,
  toggleTodo,
  deleteTodo,
}: TodoItemProps) => {
  return (
    <li className="flex justify-between">
      <div>
        <input
          type="checkbox"
          id={id}
          className="cursor-pointer peer h-4 w-4 mr-2"
          defaultChecked={complete}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        <label
          htmlFor={id}
          className="cursor-pointer text-slate-950 peer-checked:line-through peer-checked:text-slate-500 text-xl"
        >
          {title}
        </label>
      </div>
      <Trash2
        size={24}
        stroke="red"
        className="cursor-pointer"
        onClick={() => deleteTodo(id)}
      />
    </li>
  );
};

export default TodoItem;
