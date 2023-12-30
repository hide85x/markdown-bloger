import { defineStore } from "pinia";
import { NewUser } from "../users";

interface UsersState {
  currentUserId?: string;
}
export const useUsers = defineStore("users", {
  state: (): UsersState => ({
    currentUserId: undefined,
  }),
  actions: {
    async createUser(user: NewUser) {
      const body = JSON.stringify(user);

      await window.fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      return this.authenticate();
    },
    async authenticate() {
      try {
        const res = await window.fetch("/api/current-user", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await res.json();
        this.currentUserId = result.id;
      } catch (error) {
        this.currentUserId = undefined;
      }
    },
    async logOut() {
      await window.fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return this.authenticate();
    },
  },
});
