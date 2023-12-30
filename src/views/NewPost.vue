<template>
  <div>
    NEW POST
  </div>
  <PostWriter :post="post" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import PostWriter from "../components/PostWriter.vue";
import { Post, TimeLinePost } from "../posts";
import { DateTime } from "luxon";
import { useUsers } from "../stores/users";
import { useRouter } from "vue-router";
import { usePosts } from "../stores/posts";
const router = useRouter();

async function handleSubmit(post: Post) {
  await postsStore.createPost(post);
  router.push("/");
}
const postsStore = usePosts();
const usersStore = useUsers();
const currentUserId = usersStore.currentUserId;

if (!currentUserId) {
  throw Error("User coudnt be found!");
}
const post: TimeLinePost = {
  id: "-1",
  authorId: currentUserId,
  title: "Title",
  created: DateTime.now(),
  markdown: "## Title",
  html: "<h2>title</h2>",
};
</script>

<style scoped></style>
