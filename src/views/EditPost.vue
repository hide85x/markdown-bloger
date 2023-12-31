<template>
  <p>Edit Post</p>
  <PostWriter :post="post" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { usePosts } from "../stores/posts";
import { useUsers } from "../stores/users";
import { computed } from "vue";
const route = useRoute();
const router = useRouter();

const id = route.params.id as string;

const postStore = usePosts();
const userStore = useUsers();
const post = postStore.all.get(id);

async function handleSubmit(post: Post) {
  await postStore.updatePost(post);
  router.push("/");
}
function checkAuth() {
  const currentUserId = userStore.currentUserId;
  console.log(currentUserId, post.authorId);
  if (!currentUserId) {
    router.push("/");
  }
  if (post.authorId !== currentUserId) {
    router.push("/");
  }
}

checkAuth();
if (!post) {
  throw Error(`Post with ${id}  was not found!`);
}
import PostWriter from "../components/PostWriter.vue";
import { useUsers } from "../stores/users";
</script>

<style scoped></style>
