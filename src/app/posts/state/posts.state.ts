import { Post } from "../../models/post.model";

export interface PostsState {
  posts: Post[];
}

export const initialState: PostsState = {
  posts: [
    {
      _id: "1",
      title: "Title 1",
      body: "Description 1",
    },
    {
      _id: "2",
      title: "Title 2",
      body: "Description 2",
    }
  ],
}
