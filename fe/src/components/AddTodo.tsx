import { Form, Input, Modal, ModalProps, Typography } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Project } from "../models/Project";
import { store } from "../store";

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
  }, []);

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
      <Typography>create project</Typography>
      <Form form={form} onFinish={onSave}>
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
