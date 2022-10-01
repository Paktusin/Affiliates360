import { PlusCircleOutlined } from "@ant-design/icons";
import { Form, Input, Select, Space, Typography } from "antd";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { t } from "../i18n";
import { store } from "../store";
import { Modal } from "./Modal";
import { projectParam } from "./ProjectList/ProjectList";

export interface AddTodoProps {}

export const AddTodo: React.FC<AddTodoProps> = () => {
  const [visible, setVisible] = useState(false);
  const { [projectParam]: projectId } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onSave = useCallback(() => {
    setLoading(true);
    axios
      .post("/api/todo", { ...form.getFieldsValue(), user_id: store.user!.id })
      .then((res) => {
        form.resetFields();
        store.refreshTodos(projectId);
        setLoading(false);
        setVisible(false);
      });
  }, [form, projectId]);
  const addTodo = useCallback(() => {
    form.setFieldsValue({
      description: "",
      project_id: parseInt(projectId!, 10),
    });
    setVisible(true);
  }, [form, projectId]);

  return (
    <>
      <Space onClick={addTodo}>
        <PlusCircleOutlined />
        {t("addTodo")}
      </Space>
      <Modal
        confirmLoading={loading}
        onCancel={() => setVisible(false)}
        onOk={onSave}
        visible={visible}
      >
        <Typography.Title level={4}>{t("createTodo")}</Typography.Title>
        <Form form={form} onFinish={onSave} layout="vertical">
          <Form.Item label={t("user")}>
            <Input readOnly value={store.user?.name} />
          </Form.Item>
          <Form.Item name="project_id" label={t("project")}>
            <Select
              options={store.projects.map((project) => ({
                value: project.id,
                label: project.name,
              }))}
            />
          </Form.Item>
          <Form.Item name="description" label={t("description")}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
