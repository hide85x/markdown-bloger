<script lang="ts" setup>
import Navbar from "./components/Navbar.vue";

import { useModal } from "./composables/modal";
import { computed } from "vue";

const modal = useModal();
const modalStyle = computed(() => {
  return {
    display: modal.show.value ? "block" : "none",
  };
});
</script>
<template>
  <div class="modal" style="color:white" :style="modalStyle">
    <div class="modal-background">
      <div class="modal-content">
        <div id="modal"></div>
      </div>
    </div>
    <button class="modal-close is-large" @click="modal.hideModal()"></button>
  </div>
  <div class="section">
    <div class="container">
      <Navbar />
      <RouterView />
    </div>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
@import "highlight.js/styles/tokyo-night-light.css";

ul {
  list-style: revert !important;
  list-style-position: inside !important;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: revert !important;
  margin: 10px 0 !important;
  font-weight: 700;
  color: darkslategrey;
}
pre {
  margin: 10px 0 !important;
}
p {
  margin: 10px 0 !important;
}
</style>
