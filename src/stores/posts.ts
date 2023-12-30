import { ref, readonly } from "vue";
import { defineStore } from "pinia";
import { Post, today, thisMonth, thisWeek, TimeLinePost } from "../posts";
import { Period } from "../constants";
import { DateTime } from "luxon";

interface PostState {
  ids: string[];
  all: Map<string, Post>;
  selectedPeriod: Period;
}

function delay() {
  return new Promise<void>((res, rej) => {
    console.log("fake loading ...");
    setTimeout(res, 1500);
  });
}

export const usePosts = defineStore("posts", {
  state: (): PostState => ({
    ids: [],
    all: new Map(),
    selectedPeriod: "Today",
  }),
  actions: {
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period;
    },
    async fetchPosts() {
      const res = await window.fetch("/api/posts");
      const data = (await res.json()) as Post;

      await delay();
      let ids: string[] = [];
      let all = new Map<string, Post>();
      for (const post of data) {
        ids.push(post.id);
        all.set(post.id, post);
      }

      this.ids = ids;
      this.all = all;
    },
    createPost(post: Post) {
      const body = JSON.stringify(post);

      return window.fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
    },
    updatePost(post: Post) {
      const body = JSON.stringify(post);

      return window.fetch("/api/posts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
    },
  },
  getters: {
    filteredPosts: (state): TimeLinePost[] => {
      return state.ids.reduce((newPosts, id: string) => {
        let post = state.all.get(id);

        if (!post) {
          throw new Error(`Post with id ${id} couldn't be found!!!!`);
        }
        post = {
          ...post,
          created: DateTime.fromISO(post.created),
        };
        switch (state.selectedPeriod) {
          case "Today": {
            return post.created >= DateTime.now().minus({ day: 1 })
              ? [...newPosts, post]
              : newPosts;
          }
          case "This Week": {
            return post.created >= DateTime.now().minus({ week: 1 })
              ? [...newPosts, post]
              : newPosts;
          }
          default:
            return [...newPosts, post];
        }
      }, []);
    },
  },
});
