import {
  FileAddOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Space, Typography } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { observer } from "mobx-react-lite";
import React, { useCallback, useMemo, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { projectPath } from "../../hooks/useAppRoutes";
import { t } from "../../i18n";
import { Project } from "../../models/Project";
import { store } from "../../store";
import { AddProject } from "../AddProject";
import { projectParam } from "../ProjectList/ProjectList";

export const TopNav = observer(() => {
  const navigate = useNavigate();
  const logout = useCallback(() => {
    store.setToken();
    navigate("/login");
  }, [navigate]);
  const [editProject, setProject] = useState<Project | undefined>();
  const el = useRoutes([
    {
      path: `/${projectPath}/:${projectParam}/todo`,
      element: (
        <Space>
          <PlusCircleOutlined />
          {t("addTodo")}
        </Space>
      ),
    },
  ]);
  const menuItems = useMemo(() => {
    const res: ItemType[] = [
      {
        children: [
          {
            key: "logout",
            label: t("logout"),
            onClick: logout,
          },
        ],
        key: "user",
        label: (
          <Space size={8}>
            <UserOutlined />
            {store.user?.name}
          </Space>
        ),
      },
      {
        onClick: () => setProject({ name: "new project" }),
        label: (
          <Space size={8}>
            <FileAddOutlined />
            {t("addProject")}
          </Space>
        ),
        key: "add_project",
      },
    ];
    if (el) {
      res.push({ label: el, key: "add_todo" });
    }
    return res;
  }, [el, store.user]);
  return (
    <>
      <Menu
        selectedKeys={[]}
        mode="horizontal"
        theme="dark"
        items={menuItems}
      ></Menu>
      <AddProject
        onFinish={() => setProject(undefined)}
        project={editProject}
      />
    </>
  );
});
