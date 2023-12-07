import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Post } from "../../models/post.model";

export interface PostsState extends EntityState<Post> { }

export const postsAdapter = createEntityAdapter<Post>({
  selectId: (e) => e._id
});

export const initialState: PostsState = postsAdapter.getInitialState();
