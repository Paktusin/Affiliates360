import { t } from "../i18n";

export interface Todo {
  id?: number;
  description: string;
  done: boolean;
  viewed: number;
  project_id: number;
  user_id: number;
}

export function getStatus(done: boolean) {
  return t("status_" + !!done);
}
