import { Layout, Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { store } from "../../store";

export const projectParam = "project_id";

export const ProjectList: React.FC = observer(() => {
  const navigate = useNavigate();
  useEffect(() => store.refreshProjects(), []);
  const { [projectParam]: projectId } = useParams();
  const menu: ItemType[] = store.projects.slice().map((project) => ({
    key: project.id!,
    label: project.name,
    onClick: () => navigate(`${project.id}/todo`),
  }));

  return (
    <Layout style={{ flexDirection: "row" }}>
      <Sider>
        <Menu
          style={{ height: "100%" }}
          activeKey={projectId}
          items={menu}
        ></Menu>
      </Sider>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
});
