import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(2, { message: "Title is required" }),
});
