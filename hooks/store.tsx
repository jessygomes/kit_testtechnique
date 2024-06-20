// Utilisation de Zustand pour gérer l'état de l'utilisateur connecté dans l'application : me permet de stocker l'utilisateur connecté dans un store global et de le récupérer dans les composants nécessaires. Cela me permet de ne pas avoir à passer l'utilisateur connecté en props dans les composants.

import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  updateUser(user: any) {
    set({ user });
  },

  deleteUser() {
    set({ user: null });
  },
}));
