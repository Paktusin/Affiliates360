import { useMemo } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import { Login } from "../components/Login/Login";
import { MainPage } from "../components/MainPage/MainPage";
import {
  ProjectList,
  projectParam,
} from "../components/ProjectList/ProjectList";
import { TodoList } from "../components/ToddoList.tsx/TodoList";
import { store } from "../store";

const loginPath = "login";
export const projectPath = "projects";

const protectedRoutes = [
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        path: projectPath,
        element: <ProjectList />,
        children: [{ path: `:${projectParam}/todo`, element: <TodoList /> }],
      },
      { path: "", element: <Navigate to={`/${projectPath}`} /> },
    ],
  },
  { path: "", element: <Navigate to={`/`} /> },
];

export function useAppRoutes() {
  const routes = useMemo(() => {
    const res: RouteObject[] = [{ path: `/${loginPath}`, element: <Login /> }];
    if (store.token) {
      res.push(...protectedRoutes);
    } else {
      res.push({ path: "", element: <Navigate to={loginPath} /> });
    }
    return res;
  }, [store.token]);
  return useRoutes(routes);
}
