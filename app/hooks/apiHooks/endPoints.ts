export const API_URL = "https://stoploss-api.onrender.com/api";
export const API_DEV = "http://localhost:6969/api";

export const API_USERS_ROUTE = "/users";
export const API_POSTS_ROUTE = "/posts";
export const API_IPO_ROUTE = "/ipo";

export const API_POSTS_UPCOMING_IPO_LIST_ROUTE = "/posts/upcomingIPO";

export const API_USERS_ENDPOINTS = {
  login: "/login",
  signup: "/signup",
  delete: "/deleteUser",
  update: "/updateUser",
};

export const API_POSTS_ENDPOINTS = {
  //create post
  createPost: "/createPost",
  // get post
  getAllPosts: "/get/all",
  getPostById: "/get/id",
  getPostByType: "/get/type",
  getPostByTypeOlder: "/get/type/pagination",
  getLatestPosts: "/get/latest",
  getPostByUser: "/get/user",
  // delete post
  deletePostById: "/delete",
  // for pagination routes
  countPosts: "/count/all",
  countPostsByType: "/count/type",
  countPostsByUser: "/count/user",
  // tags related routes
  getTagForPost: "/tags/",
  getPostsOfTags: "/tags/posts",
};

export const API_POSTS_UPCOMING_IPO_LIST_ENDPOINTS = {
  // create (POST)
  createEntry: "/create",
  // get (GET & POST)
  getAllEntries: "/get",
  getEntryByName: "/get/name",
  getEntryByID: "/get/id",
  // update (PUT)
  updateEntryName: "/update/name",
  updateEntryClose: "/update/close",
  updateEntryOpen: "/update/open",
  updateLinkedPostsAddOne: "/update/linkedPosts/addOne",
  // delete (DELETE)
  deleteEntry: "/delete",
  deleteOneLinkedPost: "/delete/linkedPosts/removeOne",
};

export const API_IPO_ENDPOINTS = {
  // create (POST)
  createIPO: "/create",
  // get (GET & POST)
  getAllIPO: "/get",
  getIPOById: "/get/id",
  getIPOByName: "/get/name",
  getIPOByUserId: "/get/user/id",
  getIPOByUserName: "/get/user/name",
  // update (PUT)
  updateIPO: "/update",
  updateAddPostId: "/update/add/postId",
  updateRemovePostId: "/update/remove/postId",
  // delete (DELETE)
  deleteIPO: "/delete",
};
