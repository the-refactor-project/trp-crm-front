import { create } from "zustand";
import { LeadStructure } from "../entities/leads/schema";
import { MovementStructure } from "../entities/movements/schema";

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
}));

export default useAppStore;
