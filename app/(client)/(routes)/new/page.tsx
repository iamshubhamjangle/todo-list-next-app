import Link from "next/link";

import { createTodoRedirect } from "@/app/(actions)/todo";

const CreateNewTodo = () => {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-medium leading-tight text-primary">
        NEW TODO
      </h1>
      <form action={createTodoRedirect}>
        <input
          type="text"
          name="title"
          className="my-2 block w-full p-4 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        />
        <div>
          <Link href="..">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 mr-2 rounded">
              Cancel
            </button>
          </Link>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 mr-2 rounded"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewTodo;
