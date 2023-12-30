<template>
  <UserForm @submit="handleSignin" :error="error" />
</template>

<script setup lang="ts">
import UserForm from "./UserForm.vue";
import { ref } from "vue";
import { NewUser } from "../users";
import { useUsers } from "../stores/users";
import { useModal } from "../composables/modal";

const userStore = useUsers();
const modal = useModal();

const error = ref("");
async function handleSignin(newUser: NewUser) {
  try {
    const body = JSON.stringify(newUser);

    const res = await window.fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    if ([401, 404].includes(res.status)) {
      error.value = "Usernam or password are incorect";
    } else {
      userStore.authenticate();
      modal.hideModal();
    }
  } catch (err) {
    console.log(err);
  }
}
</script>

<style scoped></style>
