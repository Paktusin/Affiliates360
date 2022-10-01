import { observer } from "mobx-react-lite";
import { useAppRoutes } from "../hooks/useAppRoutes";

export const App = observer(() => {
  const outlet = useAppRoutes();
  return outlet;
});
