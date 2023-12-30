<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-two-thirds">
      <RouterLink
        v-if="isAuthorized"
        class="button is-link is-rounded"
        :to="`/post/${post.id}/edit`"
      >
        Edit Post</RouterLink
      >
      <h1>{{ post.title }}</h1>
      <div v-html="post.html"></div>
    </div>
    <div class="column"></div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { usePosts } from "../stores/posts";
import { useUsers } from "../stores/users";
import { computed } from "vue";
const usersStore = useUsers();

const route = useRoute();
const id = route.params.id as string;
const postStore = usePosts();
const post = postStore.all.get(id);
const currentUserId = usersStore.currentUserId;
const isAuthorized = computed(() => {
  if (!currentUserId) {
    return false;
  }
  if (post.authorId !== currentUserId) {
    return false;
  }
  return true;
});
if (!post) {
  throw Error(`Post with ${id}  was not found!`);
}
</script>

<style scoped></style>
