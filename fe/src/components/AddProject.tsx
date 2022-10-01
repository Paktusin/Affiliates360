import { Form, Input, ModalProps, Typography } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { t } from "../i18n";
import { Project } from "../models/Project";
import { store } from "../store";
import { Modal } from "./Modal";

export interface AddProjectProps extends Omit<ModalProps, "visible"> {
  project?: Project;
  onFinish: () => void;
}

export const AddProject: React.FC<AddProjectProps> = ({
  project,
  onFinish,
  ...props
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onSave = useCallback(() => {
    setLoading(true);
    axios
      .post("/api/project", { ...project, ...form.getFieldsValue() })
      .then((res) => {
        form.resetFields();
        store.refreshProjects();
        onFinish();
        setLoading(false);
      });
  }, [form, onFinish, project]);

  useEffect(() => {
    if (project) {
      form.setFieldsValue(project);
    }
  }, [form, project]);

  return (
    <Modal
      confirmLoading={loading}
      onCancel={onFinish}
      onOk={onSave}
      visible={!!project}
      {...props}
    >
      <Typography.Title level={4}>{t("createProject")}</Typography.Title>
      <Form layout="vertical" form={form} onFinish={onSave}>
        <Form.Item name="name" label={t("name")}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
