"use client";

import { Trash2, Pencil } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, checked: boolean) => void;
  deleteTodo: (id: string) => Promise<void>;
};

const TodoItem = ({
  id,
  title,
  complete,
  toggleTodo,
  deleteTodo,
}: TodoItemProps) => {
  return (
    <li className="flex justify-between py-1">
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
      <div className="flex gap-4">
        <Link href={`/edit/${id}`}>
          <Pencil size={24} className="cursor-pointer" stroke="black" />
        </Link>
        <Trash2
          size={24}
          stroke="red"
          className="cursor-pointer"
          onClick={async () =>
            await deleteTodo(id).catch((e) =>
              toast.error(`Delete Failed. ${e.message}`)
            )
          }
        />
      </div>
    </li>
  );
};

export default TodoItem;
