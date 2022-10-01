import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import { Project } from "./models/Project";
import { Todo } from "./models/Todo";
import { User } from "./models/User";

export class Store {
  token?: string;
  user?: User;
  projects = observable.array<Project>([]);
  todos = observable.array<Todo>([]);

  constructor() {
    this.setToken(localStorage.getItem("key") || undefined);
    makeObservable(this, {
      token: observable,
      user: observable,
      projects: observable,
    });
    axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response.status === 401) {
          this.setToken();
        }
      }
    );
  }

  setToken(token?: string) {
    this.token = token;
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.token}`,
    };
    if (this.token) {
      localStorage.setItem("key", this.token);
      axios.get("/api/user").then((res) => (this.user = res.data));
    } else {
      localStorage.removeItem("key");
    }
  }

  refreshProjects() {
    axios.get("/api/project").then(
      action((res) => {
        this.projects.replace(res.data);
      })
    );
  }

  refreshTodos(project_id?: string) {
    axios.get("/api/todo", { params: { project_id } }).then(
      action((res) => {
        this.todos.replace(res.data);
      })
    );
  }
}

export const store = new Store();
