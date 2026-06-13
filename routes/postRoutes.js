const express = require("express");
const router = express.Router();

const { getPosts, createPosts, likePost , deletePosts, addComments, editPost, deleteComment } = require("../controllers/postController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createPosts); 
router.get("/", protect, getPosts);
router.put("/:id/like", protect, likePost);
router.delete("/:id", protect, deletePosts);
router.post("/:id/comment", protect, addComments);
router.put("/:id", protect, editPost);
router.delete("/:postId/comment/:commentId", protect, deleteComment);

module.exports = router;

