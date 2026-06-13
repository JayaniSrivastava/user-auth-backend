const Post = require("../models/Post");


const getMyPosts = async(req, res) =>{
  try{
    const posts = await Post.find({user : req.user._id}).populate("user" , "name");

    res.json(posts);
  }catch(error){
    res.status(500).json({message : error.message})
  }
}


// ✅ Create Post
const createPosts = async (req, res) => {
  try {
    const { content } = req.body;

    const post = await Post.create({
      user: req.user._id,
      content,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Post
const deletePosts = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.deleteOne();

    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Posts (FIXED ⭐)
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name")
      .populate("comments.user", "name") 
      .sort({ createdAt: -1 });

    res.json(posts); // ✅ only once
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Like Post
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user._id.toString();

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    res.json(post);
  } catch (error) {
    console.log("LIKE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Add Comment
const addComments = async (req, res) => {
  try {
    const { text } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = {
      user: req.user._id,
      text,
    };

    post.comments.push(comment);

    await post.save();

    //  populate before sending
    await post.populate("comments.user", "name");

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = post.comments.find(
      (c) => c._id.toString() === commentId
    );

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const commentUserId = comment.user._id
      ? comment.user._id.toString()
      : comment.user.toString();

    if (commentUserId !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    post.comments = post.comments.filter(
      (c) => c._id.toString() !== commentId
    );

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const editPost = async(req, res) =>{
  try{
    const{content} = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if(post.user.toString() !== req.user._id.toString()){
      return res.status(401).json({message: "Not authorized"});
    }

    post.content = content || post.content;

    await post.save();

    res.json(post);
  }catch(error){
    res.status(500).json({message: error.message})
  }
};

module.exports = {
  createPosts,
  getPosts,
  likePost,
  deletePosts,
  addComments,
  editPost,
  deleteComment,
  getMyPosts,
};