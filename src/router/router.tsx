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
import { getDynamicPath, getPath } from "./paths";
import EditMovementPage from "../entities/movements/pages/EditMovementPage";
import LeadsPage from "../entities/leads/pages/LeadsPage";
import NewLeadPage from "../entities/leads/pages/NewLeadPage";
import EditLeadPage from "../entities/leads/pages/EditLeadPage";
import ProvidersPage from "../entities/providers/pages/ProvidersPage";
import NewProviderPage from "../entities/providers/pages/NewProviderPage";
import EditProviderPage from "../entities/providers/pages/EditProviderPage";
import NewExpensePage from "../entities/expenses/pages/NewExpensePage";
import ExpensesPage from "../entities/expenses/pages/ExpensesPage";
import LeadEventsPage from "../entities/leadEvents/pages/LeadEventsPage";
import ImportLeadsPage from "../entities/leads/pages/ImportLeadsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<Navigate to="/movimientos" />} index />
      <Route path={getPath("movements")} element={<MovementsPage />} />
      <Route path={getPath("movements", "new")} element={<NewMovementPage />} />
      <Route
        path={getDynamicPath("movements", "edit", "movementId")}
        element={<EditMovementPage />}
      />
      <Route path={getPath("leads")} element={<LeadsPage />} />
      <Route path={getPath("leads", "new")} element={<NewLeadPage />} />
      <Route
        path={getDynamicPath("leads", "edit", "leadId")}
        element={<EditLeadPage />}
      />
      <Route
        path={getDynamicPath("leads", "events", "leadId")}
        element={<LeadEventsPage />}
      />
      <Route path={getPath("leads", "import")} element={<ImportLeadsPage />} />
      <Route path={getPath("providers")} element={<ProvidersPage />} />
      <Route path={getPath("providers", "new")} element={<NewProviderPage />} />
      <Route
        path={getDynamicPath("providers", "edit", "providerId")}
        element={<EditProviderPage />}
      />
      <Route path={getPath("expenses")} element={<ExpensesPage />} />
      <Route path={getPath("expenses", "new")} element={<NewExpensePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

export default router;
