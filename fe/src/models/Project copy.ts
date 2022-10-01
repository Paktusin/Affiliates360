export interface Todo {
  id?: number;
  description: string;
  done: boolean;
  viewed: number;
  project_id: number;
  user_id: number;
}
