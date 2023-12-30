<script lang="ts" setup>
import { useRouter } from "vue-router";

import { useModal } from "../composables/modal";
import { useUsers } from "../stores/users";
const modal = useModal();
const usersStore = useUsers();
const router = useRouter();

async function logout() {
  await usersStore.logOut();
  router.push({ path: "/" });
}
</script>
<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons" v-if="usersStore.currentUserId">
        <RouterLink to="/posts/new" class="button">New Post</RouterLink>
        <button class="button is-info" @click="logout">
          Log out
        </button>
      </div>
      <div class="buttons" v-else>
        <button class="button is-info" @click="modal.showModal('signUp')">
          Sign Up
        </button>
        <button class="button is-info" @click="modal.showModal('signIn')">
          Sign In
        </button>
      </div>
    </div>
  </div>
  <Teleport to="#modal">
    <component :is="modal.component.value" />
  </Teleport>
</template>
