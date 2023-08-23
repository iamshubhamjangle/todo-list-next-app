"use client";

import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

import { createTodoSamePage } from "@/app/(server)/(actions)/todo";

const CreateTodoForm = () => {
  const [validationError, setValidationError] = useState<any>(null);
  const ref = useRef<HTMLFormElement>(null);

  // client action
  async function action(data: FormData) {
    const result = await createTodoSamePage(data);

    if (result?.message) {
      setValidationError(result.message);
      return;
    }

    setValidationError(null);
    ref?.current?.reset();
    toast.success("Todo added.");
  }

  return (
    <form
      action={action}
      className="flex flex-row gap-2 justify-between py-4"
      ref={ref}
    >
      <input
        type="text"
        name="title"
        className="px-2 block w-full border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
      />
      {validationError?.title && (
        <p className="text-sm text-red-400">
          {validationError.title._errors.join(", ")}
        </p>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
        type="submit"
      >
        Create
      </button>
    </form>
  );
};

export default CreateTodoForm;
