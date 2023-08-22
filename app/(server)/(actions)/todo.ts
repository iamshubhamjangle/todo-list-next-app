"use server";

import { redirect } from "next/navigation";

import db from "@/app/lib/prismadb";
import { revalidatePath } from "next/cache";

export async function toggleTodo(id: string, complete: boolean) {
  await db.todo.update({ where: { id }, data: { complete } });
}

export async function createTodoRedirect(data: FormData) {
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
  if (!id) {
    console.error("id is required property!");
    return;
  }

  throw new Error("Intentional Error");

  await db.todo.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
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
