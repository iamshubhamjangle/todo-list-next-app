"use client";

type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, checked: boolean) => void;
};

const TodoItem = ({ id, title, complete, toggleTodo }: TodoItemProps) => {
  return (
    <li>
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
    </li>
  );
};

export default TodoItem;
