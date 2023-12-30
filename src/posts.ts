import { DateTime } from "luxon";

export interface Post {
  id: string;
  title: string;
  created: string;
  markdown: string;
  html: string;
  authorId: string;
}
export interface TimeLinePost extends Omit<Post, "created"> {
  created: DateTime;
}
export const today: Post = {
  id: "1",
  title: "Today post",
  created: DateTime.now().toISO(),
  markdown: "",
  authorId: "-1",
  html: "",
};
export const thisWeek: Post = {
  id: "2",
  title: "Weekly post",
  created: DateTime.now()
    .minus({ days: 5 })
    .toISO(),
  markdown: "",
  authorId: "-1",
  html: "",
};
export const thisMonth: Post = {
  id: "3",
  title: "Monthly post",
  created: DateTime.now()
    .minus({ week: 3 })
    .toISO(),
  authorId: "-1",
  markdown: "",
  html: "",
};
