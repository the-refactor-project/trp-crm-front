import { create } from "zustand";
import { MovementStructure } from "@/entities/movements/schema";

interface AppStore {
  movements: MovementStructure[];
  loadMovements: (movements: MovementStructure[]) => void;
  addMovement: (newMovement: MovementStructure) => void;
  updateMovement: (movement: MovementStructure) => void;
  deleteMovementById: (movementId: MovementStructure["_id"]) => void;
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
}));

export default useAppStore;
