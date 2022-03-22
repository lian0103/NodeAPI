const Post = require('../models/Post');

exports.getAllPosts = async (req, res, next) => {
  try {
    const [posts] = await Post.findAll();

    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createNewPost = async (req, res, next) => {
  try {
    let { title, body } = req.body;
    const post = new Post(title, body);

    let result = await post.save();
    res.status(201).json({ massage: 'the post is created' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    let postId = req.params.id;
    const [post] = await Post.findById(postId);

    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
