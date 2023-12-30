import express, { Request, Response } from "express";
// import cors from "cors";
import { today, thisMonth, thisWeek, Post } from "./src/posts";
import { NewUser, User } from "./src/users";
import bodyParser from "body-parser";
import jsonwebtoken from "jsonwebtoken";
import cookieParser from "cookie-parser";
const port = 3000;
const app = express();

const allPosts = [today, thisWeek, thisMonth];
const allUsers: User[] = [];
app.use(cookieParser());
// app.use(cors());
app.use(bodyParser.json());
const SECRET = "my-secret";
const COOKIE = "vuejs-jwt";
app.get("/posts", (_req, res) => {
  res.json(allPosts);
});

app.get("/current-user", (req, res) => {
  console.log(JSON.stringify(allUsers));
  try {
    const token = req.cookies[COOKIE];
    const result = jsonwebtoken.verify(token, SECRET) as { id: string };

    res.json({ id: result.id });
  } catch (error) {
    console.log(error);
    res.status(404).end();
  }
});
app.post("/logout", (_req: Request, res: Response) => {
  res.cookie(COOKIE, "", { httpOnly: true });
  res.status(200).end();
});
app.post<{}, {}, Post>("/posts", (req: Request, res: Response) => {
  const post = {
    ...req.body,
    id: (Math.random() * 10000).toFixed(),
  };
  allPosts.push(post);
  res.json(post);
});
app.put<{}, {}, Post>("/posts", (req: Request, res: Response) => {
  const postIndex = allPosts.findIndex((x) => x.id === req.body.id);
  if (postIndex === -1) {
    throw Error(`Post with id: ${req.body.id} doest not exist!`);
  }
  const existingPost = allPosts[postIndex];
  allPosts[postIndex] = { ...existingPost, ...req.body };
  res.json(allPosts[postIndex]);
});

app.get("/users", (_req, res) => {
  res.json(allUsers);
});

app.post<{}, {}, NewUser>("/users", (req: Request, res: Response) => {
  const user: User = {
    ...req.body,
    id: (Math.random() * 10000).toFixed(),
  };
  allUsers.push(user);
  const { password, ...rest } = user; // without password
  authenticate(user.id, req, res);
  res.json(rest);
});
app.post<{}, {}, User>("/login", (req: Request, res: Response) => {
  const user: User = req.body;
  const targetUser = allUsers.find((el) => el.username === user.username);
  if (!targetUser || targetUser.password !== user.password) {
    res.status(404).end();
  } else {
    authenticate(targetUser.id, req, res);
    res.status(200).end();
  }
});

function authenticate(id: string, _req: Request, res: Response) {
  const token = jsonwebtoken.sign({ id }, SECRET, {
    issuer: "vuejs-ts",
    expiresIn: "30 days",
  });
  res.cookie(COOKIE, token, { httpOnly: true });
}
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
