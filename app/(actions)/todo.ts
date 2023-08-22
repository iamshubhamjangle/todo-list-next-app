import { redirect } from "next/navigation";

import db from "@/app/lib/prismadb";
import { revalidatePath } from "next/cache";

export async function toggleTodo(id: string, complete: boolean) {
  "use server";
  await db.todo.update({ where: { id }, data: { complete } });
}

export async function createTodoRedirect(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();

  if (typeof title !== "string" || !title) {
    console.error("Invalid title: ", title);
    return;
  }

  await db.todo.create({
    data: {
      title,
      complete: false,
    },
  });

  redirect("/");
}

export async function createTodoSamePage(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();

  if (typeof title !== "string" || !title) {
    console.error("Invalid title: ", title);
    return;
  }

  await db.todo.create({
    data: {
      title,
      complete: false,
    },
  });

  revalidatePath("/");
}

export async function deleteTodo(id: string) {
  "use server";

  if (!id) {
    console.error("id is required property!");
    return;
  }

  await db.todo.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
}
