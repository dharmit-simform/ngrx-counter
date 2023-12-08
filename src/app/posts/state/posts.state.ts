import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Post } from "../../models/post.model";

export interface PostsState extends EntityState<Post> { }

export const postsAdapter = createEntityAdapter<Post>({
  selectId: (e) => e._id,
  sortComparer: sortByName,
});

export const initialState: PostsState = postsAdapter.getInitialState();

export function sortByName(a: Post, b: Post): number {
  return a.title.localeCompare(b.title);
}
