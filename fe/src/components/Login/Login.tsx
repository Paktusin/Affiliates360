import { Form, Input, Button } from "antd";
import { useCallback } from "react";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { store } from "../../store";

export const Login = () => {
  const navigate = useNavigate();
  const onSubmit = useCallback(
    (values: any) => {
      axios.post("/api/login", values).then((res) => {
        store.setToken(res.data.token);
        localStorage.setItem("key", store.token!);
        navigate("/");
      });
    },
    [navigate]
  );

  return (
    <div className={styles.login}>
      <Form onFinish={onSubmit}>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Login</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
