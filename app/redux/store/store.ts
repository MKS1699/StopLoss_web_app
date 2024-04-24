import { configureStore } from "@reduxjs/toolkit";
// import appSlice from "../slice/appSlice";
import {
  adminPanelSlice,
  appSlice,
  loginSlice,
  postSlice,
  sessionSlice,
  signUpSlice,
  upcomingIPOEntriesSlice,
} from "../slice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    login: loginSlice,
    session: sessionSlice,
    post: postSlice,
    signUp: signUpSlice,
    adminPanel: adminPanelSlice,
    upcomingIPO: upcomingIPOEntriesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
