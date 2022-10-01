import {
  FileAddOutlined,
  GlobalOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Space } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import i18next from "i18next";
import { observer } from "mobx-react-lite";
import React, { useCallback, useMemo, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { projectPath } from "../../hooks/useAppRoutes";
import { supportedLanguages, t } from "../../i18n";
import { Project } from "../../models/Project";
import { store } from "../../store";
import { AddProject } from "../AddProject";
import { AddTodo } from "../AddTodo";
import { projectParam } from "../ProjectList/ProjectList";

export const TopNav = observer(() => {
  const navigate = useNavigate();
  const changeLang = useCallback((lang: string) => {
    localStorage.setItem("lang", lang);
    window.location.reload();
  }, []);
  const logout = useCallback(() => {
    store.setToken();
    navigate("/login");
  }, [navigate]);
  const [editProject, setProject] = useState<Project | undefined>();
  const el = useRoutes([
    {
      path: `/${projectPath}/:${projectParam}/todo`,
      element: <AddTodo />,
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
        children: Array.from(supportedLanguages.values()).map((lang) => ({
          key: "lang_" + lang,
          label: lang,
          onClick: () => changeLang(lang),
        })),
        key: "lang",
        label: (
          <Space size={8}>
            <GlobalOutlined />
            {i18next.language}
          </Space>
        ),
      },
      {
        onClick: () => setProject({ name: t("newProject") }),
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
  }, [changeLang, el, logout, store.user]);
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
