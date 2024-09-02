import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import App from "@/components/App";
import MovementsPage from "@movements/pages/MovementsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import NewMovementPage from "@/entities/movements/pages/NewMovementPage";
import { getPath } from "./paths";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<Navigate to="/movimientos" />} index />
      <Route path={getPath("movements")} element={<MovementsPage />} />
      <Route path={getPath("movements", "new")} element={<NewMovementPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

export default router;
