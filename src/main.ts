import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";

import { useUsers } from "./stores/users";
import { usePosts } from "./stores/posts";

import App from "./App.vue";
const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
const usersStore = useUsers();
const postsStore = usePosts();

Promise.all([postsStore.fetchPosts(), usersStore.authenticate()]).then(() => {
  app.use(router);
  app.mount("#app");
});
