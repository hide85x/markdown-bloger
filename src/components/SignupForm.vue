<template>
  <UserForm @submit="handleSignup" />
</template>

<script setup lang="ts">
import UserForm from "./UserForm.vue";
import { NewUser } from "../users";
import { useUsers } from "../stores/users";
import { useModal } from "../composables/modal";

const userStore = useUsers();
const modal = useModal();

async function handleSignup(newUser: NewUser) {
  try {
    await userStore.createUser(newUser);
    modal.hideModal();
  } catch (err) {
    console.log(err);
  }
}
</script>

<style scoped></style>
