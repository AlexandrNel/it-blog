import PostSchema from "../models/post.js";
import CommentSchema from "../models/comments.js";
export const createComment = async (req, res) => {
  try {
    const post = await PostSchema.findById({ _id: req.body.post }).exec();
    const doc = new CommentSchema({
      post: req.body.post,
      autor: req.userId,
      content: req.body.content,
      parentComment: req.body.parentComment,
    });
    const comment = await doc.save();
    post.comments.push(comment._id);
    post.save();

    const populatedComment = await CommentSchema.findById(comment._id)
      .populate("autor", "fullName avatarUrl")
      .exec();
    res.json(populatedComment);
  } catch (error) {
    console.log(error);
    res.json({
      message: "Не удалось создать комментарий",
    });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    await CommentSchema.findByIdAndDelete(commentId);
    await PostSchema.updateMany(
      { comments: commentId },
      { $pull: { comments: commentId } }
    );
    res.json({ message: "success" });
  } catch (error) {
    console.log(error);

    res.status(401).json({ message: "Не удалось удалить комментарий" });
  }
};
export const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    if (!req.body.content) {
      return res.status("401").json({ message: "Пустой текст" });
    }
    await CommentSchema.updateOne(
      { _id: commentId },
      {
        content: req.body.content,
      }
    );
    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Не удалось обновить комментарий" });
  }
};
