<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        href="#"
        class="period"
        @click="postStore.setSelectedPeriod(period)"
        v-for="period of periods"
        :key="period"
        :class="{ 'is-active': period === postStore.selectedPeriod }"
      >
        {{ period }}
      </a>
    </span>
    <TimeLineItem
      class="panel-block"
      v-for="post in postStore.filteredPosts"
      :key="post.id"
      :post="post"
    />
  </nav>
</template>
<script setup lang="ts">
import TimeLineItem from "./TimeLineItem.vue";
import { usePosts } from "../stores/posts";
import { periods } from "../constants";

const postStore = usePosts();
await postStore.fetchPosts();
</script>

<style></style>
