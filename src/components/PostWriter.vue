<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post title</div>
        <input type="field text" v-model="title" class="input" />
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <div
        contenteditable
        class="field text"
        ref="contentEditable"
        @input="handleInput"
      />
    </div>
    <div class="column">
      <div class="label ">Preview</div>
      <div v-html="html" class="field text" />
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <button class="button is-primary is-pulled-right" @click="handleClick">
        Save Post
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Post, TimeLinePost } from "../posts";
import { ref, onMounted, watch, watchEffect } from "vue";
import { marked } from "marked";
import highlighsjs from "highlight.js";
import debounce from "lodash/debounce";
import { useUsers } from "../stores/users";
onMounted(() => {
  contentEditable.value.innerText = content.value;
  handleInput();
});

const props = defineProps<{
  post: TimeLinePost | Post;
}>();

const emit = defineEmits<{
  (event: "submit", post: Post): void;
}>();

const usersStore = useUsers();

const title = ref(props.post.title);
const contentEditable = ref<HTMLDivElement>("");
const content = ref(props.post.markdown);
const html = ref("title");
const parseToHtml = function(content: string) {
  return marked.parse(
    content,
    {
      gfm: true,
      breaks: true,
      highlight: (code) => {
        return highlighsjs.highlightAuto(code).value;
      },
    },
    (err, parseResult) => {
      return parseResult;
    }
  );
};
watch(
  content,
  () => {
    handleInput();
  },
  {
    immeditae: true,
  }
);
const handleClick = async function() {
  const currentUserId = usersStore.currentUserId;

  if (!currentUserId) {
    throw Error("User coudnt be found!");
  }
  const newPost: Post = {
    ...props.post,
    created:
      typeof props.post.created === "string"
        ? props.post.created
        : props.post.created.toISO(),
    title: title.value,
    markdown: content.value,
    html: html.value,
    authorId: currentUserId,
  };
  emit("submit", newPost);
};
const handleInput = debounce(() => {
  {
    if (contentEditable.value == undefined) {
      throw new Error("contentEditable dont exist");
    }
    html.value = parseToHtml(contentEditable.value.innerText);
  }
}, 700);
</script>

<style scoped></style>
