"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import db from "@/app/_lib/prismadb";
import { createTodoSchema } from "@/app/_lib/zodSchema";

export async function toggleTodo(id: string, complete: boolean) {
  await db.todo.update({ where: { id }, data: { complete } });
}

// export async function createTodoRedirect(data: FormData) {
//   const title = data.get("title")?.valueOf();

//   if (typeof title !== "string" || !title) {
//     console.error("Invalid title: ", title);
//     return;
//   }

//   createTodoSchema.parse({ title });

//   await db.todo.create({
//     data: {
//       title,
//       complete: false,
//     },
//   });

//   redirect("/");
// }

export async function createTodoSamePage(data: FormData) {
  try {
    const title = data.get("title")?.valueOf() as string;

    const { error: zodError }: any = createTodoSchema.safeParse({ title });
    if (zodError) {
      return { success: false, message: zodError.format() };
    }

    await db.todo.create({
      data: {
        title,
        complete: false,
      },
    });

    revalidatePath("/");
    return { success: true, message: "" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteTodo(id: string) {
  try {
    if (!id) {
      throw new Error("Id is required property");
    }

    await db.todo.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");
    return { success: true, message: "" };
  } catch (error: any) {
    return { success: false, message: error.message || "" };
  }
}

export async function updateTodo(data: FormData) {
  const id = data.get("id")?.valueOf();
  const title = data.get("title")?.valueOf();

  if (!id || typeof id !== "string") {
    console.error("Id is required property");
    return;
  }

  if (!title || typeof title !== "string") {
    console.error("title is required property");
    return;
  }

  await db.todo.update({
    where: {
      id,
    },
    data: {
      title,
    },
  });

  redirect("/");
}
