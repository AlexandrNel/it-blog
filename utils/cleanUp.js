import Post from "../models/post.js";
export async function cleanUpPosts() {
  const posts = await Post.find().populate("comments");
  for (let post of posts) {
    post.comments = post.comments.filter((comment) => comment !== null);
    await post.save();
  }
}
