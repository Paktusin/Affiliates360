import {
  CheckCircleFilled,
  CheckCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Popover, Row, Space } from "antd";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { projectPath } from "../../hooks/useAppRoutes";
import { t } from "../../i18n";
import { getStatus, Todo } from "../../models/Todo";
import { store } from "../../store";
import { Modal } from "../Modal";
import { projectParam } from "../ProjectList/ProjectList";
import styles from "./TodoList.module.scss";

export const todoParam = "todo_id";

export const TodoList = observer(() => {
  const navigate = useNavigate();
  const { [projectParam]: projectId, [todoParam]: todoId } = useParams();
  useEffect(() => {
    if (todoId) {
      axios.get(`/api/todo/${todoId}`).then((res) => {
        setViewTodo(res.data);
        axios.get(`/api/todo/${todoId}/view`).then((res) => {
          const found = store.todos.find(
            (todo) => todo.id?.toString() === todoId
          );
          if (found) {
            found.viewed = res.data.viewed;
          }
        });
      });
    } else {
      setViewTodo(null);
    }
  }, [todoId]);
  const onDelete = useCallback((todo: Todo) => {
    setLoading(true);
    axios.delete(`/api/todo/${todo.id}`).then((res) => {
      store.refreshTodos(projectId);
      setLoading(false);
      setDeleteTodo(null);
    });
  }, []);
  const done = useCallback((todo: Todo) => {
    axios
      .get(`/api/todo/${todo.id}/done`, { params: { done: !todo.done } })
      .then((res) => {
        todo.done = res.data.done;
      });
  }, []);
  const [deleteTodo, setDeleteTodo] = useState<Todo | null>(null);
  const [viewTodo, setViewTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    store.refreshTodos(projectId);
  }, [projectId]);
  const todos = store.todos;
  return (
    <div className={styles.todoList}>
      <Row style={{ width: "100%" }}>
        {todos.map((todo, key) => (
          <Col span={24} md={12} lg={8} xl={6} style={{ padding: 8 }}>
            <Card
              className={styles.card}
              key={key}
              title={
                <div className={styles.header}>
                  <Space size={8}>
                    <EyeOutlined /> {todo.viewed}
                  </Space>
                  <div style={{ marginLeft: "auto" }}>
                    <Popover content={getStatus(todo.done)}>
                      <Button
                        onClick={() => done(todo)}
                        type="text"
                        icon={
                          todo.done ? (
                            <CheckCircleFilled style={{ color: "green" }} />
                          ) : (
                            <CheckCircleOutlined />
                          )
                        }
                      />
                    </Popover>
                    <Button
                      onClick={() => setDeleteTodo(todo)}
                      type="text"
                      icon={<DeleteOutlined />}
                    />
                  </div>
                </div>
              }
            >
              <div
                onClick={() => navigate(todo.id!.toString())}
                className={styles.content}
              >
                {todo.description.slice(0, 100) + "..."}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        confirmLoading={loading}
        onOk={() => onDelete(deleteTodo!)}
        visible={!!deleteTodo}
        onCancel={() => setDeleteTodo(null)}
      >
        {t("deleteWarning")}
      </Modal>
      <Modal
        title={
          <Space size={8}>
            <UserOutlined />
            {viewTodo?.userName}
          </Space>
        }
        footer={null}
        visible={!!viewTodo}
        onCancel={() => navigate(`/${projectPath}/${projectId}/todo`)}
      >
        {viewTodo?.description}
      </Modal>
    </div>
  );
});
