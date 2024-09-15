import { create } from "zustand";
import { LeadStructure } from "../entities/leads/schema";
import { MovementStructure } from "../entities/movements/schema";
import { ProviderStructure } from "../entities/providers/schema";
import { ExpenseStructure } from "../entities/expenses/schema";

interface AppStore {
  movements: MovementStructure[];
  loadMovements: (movements: MovementStructure[]) => void;
  addMovement: (newMovement: MovementStructure) => void;
  updateMovement: (movement: MovementStructure) => void;
  deleteMovementById: (movementId: MovementStructure["_id"]) => void;
  leads: LeadStructure[];
  loadLeads: (leads: LeadStructure[]) => void;
  addLead: (newLead: LeadStructure) => void;
  updateLead: (lead: LeadStructure) => void;
  deleteLeadById: (leadId: LeadStructure["_id"]) => void;
  providers: ProviderStructure[];
  loadProviders: (providers: ProviderStructure[]) => void;
  addProvider: (newProvider: ProviderStructure) => void;
  updateProvider: (provider: ProviderStructure) => void;
  deleteProviderById: (providerId: ProviderStructure["_id"]) => void;
  expenses: ExpenseStructure[];
  loadExpenses: (expenses: ExpenseStructure[]) => void;
  addExpense: (newExpense: ExpenseStructure) => void;
  deleteExpenseById: (expenseId: ExpenseStructure["_id"]) => void;
}

const useAppStore = create<AppStore>((set) => ({
  movements: [],
  loadMovements: (movements: MovementStructure[]) => set({ movements }),
  addMovement: (newMovement: MovementStructure) =>
    set((state) => ({
      ...state,
      movements: [...state.movements, newMovement],
    })),
  updateMovement: (movementToUpdate: MovementStructure) =>
    set((state) => ({
      ...state,
      movements: state.movements.map((movement) =>
        movement._id === movementToUpdate._id ? movementToUpdate : movement,
      ),
    })),
  deleteMovementById: (movementId: MovementStructure["_id"]) =>
    set((state) => ({
      ...state,
      movements: state.movements.filter(
        (movement) => movement._id !== movementId,
      ),
    })),
  leads: [],
  loadLeads: (leads: LeadStructure[]) => set({ leads }),
  addLead: (newLead: LeadStructure) =>
    set((state) => ({
      ...state,
      leads: [...state.leads, newLead],
    })),
  updateLead: (leadToUpdate: LeadStructure) =>
    set((state) => ({
      ...state,
      leads: state.leads.map((lead) =>
        lead._id === leadToUpdate._id ? leadToUpdate : lead,
      ),
    })),
  deleteLeadById: (leadId: LeadStructure["_id"]) =>
    set((state) => ({
      ...state,
      leads: state.leads.filter((lead) => lead._id !== leadId),
    })),
  providers: [],
  loadProviders: (providers: ProviderStructure[]) => set({ providers }),
  addProvider: (newProvider: ProviderStructure) =>
    set((state) => ({
      ...state,
      providers: [...state.providers, newProvider],
    })),
  updateProvider: (providerToUpdate: ProviderStructure) =>
    set((state) => ({
      ...state,
      providers: state.providers.map((provider) =>
        provider._id === providerToUpdate._id ? providerToUpdate : provider,
      ),
    })),
  deleteProviderById: (providerId: ProviderStructure["_id"]) =>
    set((state) => ({
      ...state,
      providers: state.providers.filter(
        (provider) => provider._id !== providerId,
      ),
    })),
  expenses: [],
  loadExpenses: (expenses: ExpenseStructure[]) => set({ expenses }),
  addExpense: (newExpense: ExpenseStructure) =>
    set((state) => ({
      ...state,
      expenses: [...state.expenses, newExpense],
    })),
  deleteExpenseById: (expenseId: ExpenseStructure["_id"]) =>
    set((state) => ({
      ...state,
      expenses: state.expenses.filter((expense) => expense._id !== expenseId),
    })),
}));

export default useAppStore;
