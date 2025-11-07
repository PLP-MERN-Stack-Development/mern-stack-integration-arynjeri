// routes/posts.js

const express = require('express');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const Post = require('../models/Post');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// ✅ GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username email')
      .populate('category', 'name')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET single post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate('author', 'username email')
      .populate('category', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // increment view count each time it's viewed
    await post.incrementViewCount();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ CREATE post
router.post(
  '/',
  protect,
  upload.single('featuredImage'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('category').notEmpty().withMessage('Category is required'),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        author: req.user._id,
        excerpt: req.body.excerpt,
        tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [],
        featuredImage: req.file ? `/uploads/${req.file.filename}` : 'default-post.jpg',
        isPublished: req.body.isPublished || false,
      });

      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      console.log("❌ Create post error:", error);
      res.status(500).json({ message: error.message });
    }
  }
);

// ✅ DELETE post by slug
router.delete('/:slug', protect, async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await post.deleteOne();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ ADD comment
router.post('/:slug/comments', protect, [
  body('content').notEmpty().withMessage('Comment content is required'),
], async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await post.addComment(req.user._id, req.body.content);
    res.status(201).json({ message: 'Comment added successfully', post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
