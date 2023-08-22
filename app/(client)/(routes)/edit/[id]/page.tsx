import Link from "next/link";

import { updateTodo } from "@/app/(actions)/todo";
import db from "@/app/lib/prismadb";

const CreateNewTodo = async ({ params }: { params: { id: string } }) => {
  const todo = await db.todo.findFirst({ where: { id: params.id } });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-medium leading-tight text-primary">
        EDIT TODO
      </h1>
      <form action={updateTodo}>
        <input type="text" name="id" defaultValue={todo?.id} hidden />
        <input
          type="text"
          name="title"
          className="my-4 p-2 block w-full border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          defaultValue={todo?.title}
        />
        <div className="flex justify-between">
          <Link
            href=".."
            className="bg-slate-500 hover:bg-blue-700 text-white font-bold p-2 mr-2 rounded"
          >
            Cancel
          </Link>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 mr-2 rounded"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewTodo;
