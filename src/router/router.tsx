import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import App from "../components/App";
import MovementsPage from "../pages/MovementsPage/MovementsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<Navigate to="/movimientos" />} index />
      <Route path="movimientos" element={<MovementsPage />} index />
    </Route>
  )
);

export default router;
