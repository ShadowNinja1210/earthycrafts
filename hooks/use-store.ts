import { create } from "zustand";

// Type for the change store
type ChangeStore = {
  change: boolean;
  setChange: (change: boolean) => void;
};

//  --------------------
//  Change Store
//  --------------------
const useChangeStore = create<ChangeStore>((set) => ({
  change: false,
  setChange: (change) => set({ change }),
}));

export { useChangeStore };
