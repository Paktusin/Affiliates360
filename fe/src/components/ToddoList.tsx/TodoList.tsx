import { Card, Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import { store } from "../../store";

export const TodoList = observer(() => {
  const todos = store.todos;
  return (
    <Row gutter={[16, 16]}>
      {todos.map((todo) => (
        <Col span={4}>
          <Card>{todo.description.slice(0, 10) + "..."}</Card>
        </Col>
      ))}
    </Row>
  );
});
