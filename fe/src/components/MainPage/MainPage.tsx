import { Layout } from "antd";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import { TopNav } from "./TopNav";

export const MainPage = observer(() => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Header>
        <TopNav />
      </Layout.Header>
      <Outlet />
    </Layout>
  );
});
