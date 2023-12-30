<script lang="ts" setup>
import { computed, ref } from "vue";

import FormInput from "./FormInput.vue";
import { length, required, validate } from "../validation";
import { NewUser } from "../users";

const emit = defineEmits<{
  (event: "submit", payload: NewUser): void;
}>();

const props = defineProps<{
  error: string;
}>();
const isInvalid = computed(() => {
  return !usernameStatus.value.valid || !passwordStatus.value.valid;
});
const username = ref("");
const usernameStatus = computed(() => {
  const res = validate(username.value, [required, length({ min: 3, max: 6 })]);
  return res;
});
const password = ref("");
const passwordStatus = computed(() => {
  const res = validate(password.value, [required, length({ min: 3, max: 6 })]);
  return res;
});
async function handleSubmit(event: Event) {
  if (isInvalid.value) {
    return;
  }
  const newUser: NewUser = {
    username: username.value,
    password: password.value,
  };

  try {
    emit("submit", newUser);
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <form class="form box" @submit.prevent="handleSubmit">
    <FormInput
      name="Username"
      v-model="username"
      :status="usernameStatus"
      type="text"
    />
    <FormInput
      name="Password"
      v-model="password"
      :status="passwordStatus"
      type="password"
    />
    <div :v-if="error" class="help is-danger">{{ error }}</div>
    <button class="button submit" :disabled="isInvalid">Submit</button>
  </form>
</template>

<style>
.form {
  margin-top: 50px;
}
</style>
