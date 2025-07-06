import { defineStore } from "pinia";
import type { User } from "@/stores/User";

export const useLoggedUserStore = defineStore("loggedUser", {
  state: () => ({
    user: {
      name: "",
      hasAdminPermissions: false,
      isLogged: false,
    },
  }),
  actions: {
    setUser(user: User) {
      this.user.name = user.name;
      this.user.hasAdminPermissions = user.hasAdminPermissions;
      this.user.isLogged = user.isLogged;
    },
    clearUser() {
      this.user.name = "";
      this.user.hasAdminPermissions = false;
      this.user.isLogged = false;
    }
  },
  getters: {
    name: (state) => {
      return state.user.name;
    },
    hasAdminPermissions: (state) => {
      return state.user.hasAdminPermissions;
    },
    isLogged: (state) => {
      return state.user.isLogged;
    }
  },
});
