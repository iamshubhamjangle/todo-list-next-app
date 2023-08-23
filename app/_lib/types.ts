export type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, checked: boolean) => void;
  deleteTodo: (id: string) => Promise<{ success: boolean; message: string }>;
};
