import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import App from "../components/App";
import MovementsPage from "@movements/pages/MovementsPage";
import NotFoundPage from "@/pages/NotFoundPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<Navigate to="/movimientos" />} index />
      <Route path="movimientos" element={<MovementsPage />} index />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

export default router;
