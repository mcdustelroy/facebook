const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');

// @route   GET api/posts
// @desc    get all posts
// @access  Private
router.get('/allPosts', async (req, res) => {
    try {
        const allPosts = await Post.find({}).sort({date:-1})
        res.send(allPosts)
    } catch (error) {
        console.log(error);
    }
});

// @route   POST api/posts
// @desc    // add to post db
// @access  Private
router.post('/allPosts/:userID', async (req, res) => {
    const { userID } = req.params
    try {
        const addedPost = new Post({
            ...req.body,
            user: userID
        })
        await addedPost.save()
        const allPosts = await Post.find({}).sort({ date: -1 })

        res.json(allPosts)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

// Add like to a post
router.post('/addLike/:postID/:userID', async (req, res) => {
    const { postID, userID } = req.params
    try {
        const post = await Post.findById(postID)
        !post.likes.includes(userID) && post.likes.unshift(userID)
        post.save()

        const allPosts = await Post.find({}).sort({ date: -1 })
        res.json(allPosts)
    } catch (error) {
        res.status(500).send(error.message)
    }
});
// Remove like from a post
router.put('/removeLike/:postID/:userID', async (req, res) => {
    const { postID, userID } = req.params
    try {
        const post = await Post.findById(postID)
        post.likes = post.likes.filter(like => like !== userID)
        post.save()
        const allPosts = await Post.find({}).sort({ date: -1 })
        res.json(allPosts)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

// Add like to a post
router.post('/addLike/:postID/:userID', async (req, res) => {
    const { postID, userID } = req.params
    try {
        const post = await Post.findById(postID)
        !post.likes.includes(userID) && post.likes.unshift(userID)
        post.save()

        const allPosts = await Post.find({}).sort({ date: -1 })
        res.json(allPosts)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

// @route   GET api/posts
// @desc    get comments
// @access  Private
router.get('/:userID', async (req, res) => {
    const { userID } = req.params
    try {
        const user = await User.findById(userID);
        res.send(user.posts)
    } catch (error) {
        res.status(500).send(error.message)
    }
});


// @route   POST api/posts
// @desc    add a posts to a user
// @access  Private
router.post('/:userID', async (req, res) => {
    const { userID } = req.params
    // add to user db
    try {
        const user = await User.findById(userID);
        user.posts.unshift(req.body)
        await user.save()
        res.send('new comment added')
    } catch (error) {
        res.status(500).send(error.message)
    }
});


// @route   DEL api/posts
// @desc    delete a post by a user
// @access  Private
router.delete('/:userID/:idToDelete', async (req, res) => {
    const { userID, idToDelete } = req.params
    try {
        const user = await User.findById(userID)
        const filteredPosts = user.posts.filter(post => post._id.toString() !== idToDelete)
        user.posts = filteredPosts
        await user.save()
        res.send('delete comment')
    } catch (error) {
        res.status(500).send(error.message)
    }
});

// POST a comment onto the Post
router.post('/comments/:userID', async (req, res) => {
    const { userID } = req.params
    
    try {
        const post = await Post.findById(req.body.parentID)
        post.comments.push(req.body._id)
        post.save()
    
        res.json('comment added to post')
    } catch (error) {
        res.status(500).send(error.message)
    }
});

router.delete('/delete/:userID/:postID', async (req, res) => {
    const { userID, postID } = req.params
    try {
        const post = await Post.findById(postID)
        await Post.findByIdAndRemove(postID)
        
        res.send(post.comments)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

// @route   POST api/posts
// @desc    get specific post
// @access  Private
router.get('/post/:postID', async (req, res) => {
    try {
        const {postID} = req.params
        const post = await Post.findById(postID)
        
        res.send(post)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

router.put('/edit/:postID', async (req, res) => {
    const { postID } = req.params
    try {
        await Post.findByIdAndUpdate(postID, req.body)
        res.send('updated')
    } catch (error) {
        res.status(500).send(error.message)
    }
});


module.exports = router;