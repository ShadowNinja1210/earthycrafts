import { create } from "zustand";

type ModalTypes = "GalleryForm" | "ProductsForm";

type ModalStore = {
  modal: ModalTypes | null;
  isOpen: boolean;
  setModal: (modal: ModalTypes) => void;
  onClose: () => void;
};

const useModalStore = create<ModalStore>((set) => ({
  modal: null,
  isOpen: false,
  setModal: (modal) => set({ modal, isOpen: true }),
  onClose: () => set({ modal: null, isOpen: false }),
}));

export { useModalStore };
