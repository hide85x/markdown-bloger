<template>
  <RouterLink
    :to="`/post/${post.id}`"
    class="post panel-block is-flex is-flex-direction-column is-align-items-flex-start"
  >
    <p>
      {{ post.title }}
    </p>
    <div>{{ post.created.toFormat("d MMM") }}</div>
  </RouterLink>
</template>

<script setup lang="ts">
import { TimeLinePost } from "../posts";

defineProps<{ post: TimeLinePost }>();
</script>

<style scoped></style>
