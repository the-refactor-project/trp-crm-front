import { create } from "zustand";
import { MovementStructure } from "@/entities/movements/schema";

interface AppStore {
  movements: MovementStructure[];
  loadMovements: (movements: MovementStructure[]) => void;
  addMovement: (newMovement: MovementStructure) => void;
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
  deleteMovementById: (movementId: MovementStructure["_id"]) =>
    set((state) => ({
      ...state,
      movements: state.movements.filter(
        (movement) => movement._id !== movementId,
      ),
    })),
}));

export default useAppStore;
