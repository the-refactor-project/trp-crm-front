import { create } from "zustand";
import { MovementStructure } from "@/entities/movements/schema";

interface AppStore {
  movements: MovementStructure[];
  loadMovements: (movements: MovementStructure[]) => void;
  addMovement: (newMovement: MovementStructure) => void;
}

const useAppStore = create<AppStore>((set) => ({
  movements: [],
  loadMovements: (movements: MovementStructure[]) => set({ movements }),
  addMovement: (newMovement: MovementStructure) =>
    set((state) => ({
      ...state,
      movements: [...state.movements, newMovement],
    })),
}));

export default useAppStore;
