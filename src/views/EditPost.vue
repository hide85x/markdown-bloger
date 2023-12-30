<template>
  <p>Edit Post</p>
  <PostWriter :post="post" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { usePosts } from "../stores/posts";

const route = useRoute();
const router = useRouter();

const id = route.params.id as string;

const postStore = usePosts();
const post = postStore.all.get(id);

async function handleSubmit(post: Post) {
  await postStore.updatePost(post);
  router.push("/");
}
if (!post) {
  throw Error(`Post with ${id}  was not found!`);
}
import PostWriter from "../components/PostWriter.vue";
</script>

<style scoped></style>
