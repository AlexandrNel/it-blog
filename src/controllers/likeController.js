import PostSchema from "../models/post.js";
import LikeSchema from "../models/like.js";
export const checkIsLiked = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;
    const like = await LikeSchema.findOne({ userId: userId, postId: postId });
    if (like) {
      res.json({ isLiked: true });
    } else {
      res.json({ isLiked: false });
    }
  } catch (error) {
    console.log(error);
  }
};
export const addLike = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;

    const like = await LikeSchema.findOne({ userId: userId, postId: postId });
    if (like) {
      return res.status(404).json({ message: "Лайк уже поставлен" });
    }
    const post = await PostSchema.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Пост не найден" });
    }
    const doc = await LikeSchema.create({ userId, postId });
    await doc.save();
    post.likesCount += 1;
    await post.save();

    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Не удалось поставить лайк" });
  }
};
export const removeLike = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;
    const result = await LikeSchema.findOneAndDelete({ userId: userId });
    if (!result) {
      return res.status(404).json({ message: "Лайк уже удален" });
    }
    const post = await PostSchema.findById(postId);
    if (post.likesCount > 0) {
      post.likesCount -= 1;
    }
    await post.save();
    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Не удалось убрать лайк" });
  }
};
