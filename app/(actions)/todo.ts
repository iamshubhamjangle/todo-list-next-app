import { redirect } from "next/navigation";

import db from "@/app/lib/prismadb";
import { revalidatePath } from "next/cache";

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
