const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const auth = require('../middleware/auth')

// Get all comments
router.get('/', async (req, res) => {
    try {
        const allComments = await Comment.find({}).sort({date:-1})
        res.send(allComments)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

// Get all current User's comments
router.get('/:userID', auth, async (req, res) => {
    const { userID } = req.params
    try {
        const allComments = await Comment.find({authorID: userID})
        res.send(allComments)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

// get specific comment
router.get('/comment/:commentID', async (req, res) => {
    const {commentID} = req.params
    const comment = await Comment.findById(commentID)
    
    res.send(comment)
});

// edit a specific comment
router.put('/edit/:commentID', auth, async (req, res) => {
    const { commentID } = req.params

    try {
        await Comment.findByIdAndUpdate(commentID, req.body)
        res.send('updated')
    } catch (error) {
        res.status(500).send(error.message)
    }
});

// @route   POST api/posts
// @desc    get all posts
router.get('/', async (req, res) => {
    try {
        const allComments = await Comment.find({})
        res.send(allComments)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

// add nested comment like
router.post('/addlike/:commentID/:userID', auth, async (req, res) => {
    const { commentID, userID } = req.params
    try {
        const comment = await Comment.findById(commentID)
        !comment.likes.includes(userID) && comment.likes.unshift(userID)
        comment.save()
        res.json(comment.likes)
    } catch (error) {
        res.status(500).send(error.message)
    }
});
// remove nested comment like
router.post('/removelike/:commentID/:userID', auth, async (req, res) => {
    const { commentID, userID } = req.params
    try {
        const comment = await Comment.findById(commentID)
        const filtered = comment.likes.filter(like => like !== userID) 
        comment.likes = filtered
        comment.save()
        res.json(comment.likes)
    } catch (error) {
        res.status(500).send(error.message)
    }
});


// @route   POST api/posts
// @desc    add a comment
// @access  Private
router.post('/:userID', async (req, res) => {
    const { userID } = req.params
    try {
        const newComment = new Comment({...req.body})
        newComment.save()
        res.send(newComment)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

router.post('/nestedcomments/:userID', async (req, res) => {
    const { userID } = req.params
    try {
        const newComment = new Comment({...req.body})
        newComment.save()
        
        const comment = await Comment.findById(req.body.parentID)
        comment.comments.push(newComment._id)
        comment.save()

        res.send(newComment)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

router.delete('/delete/:commentID', async (req, res) => {
    const {commentID} = req.params
    try {
        const headComment = await Comment.findById(commentID)
        
        // find and delete the reference in Post model
        const post = await Post.findById(headComment.parentID)
        if (post) {
            const updatedComments = post.comments.filter(c => c.toString() !== commentID)
            post.comments = updatedComments
            post.save()
        }

        const parentComment = await Comment.findById(headComment.parentID)
        if (parentComment) {
            const updatedComments = parentComment.comments.filter(c => c.toString() !== commentID)
            parentComment.comments = updatedComments
            parentComment.save()
        }
        
        // recursively delete comment and all subcomments
        await Comment.findByIdAndRemove(headComment)
        await headComment.comments.map((c) => {
            const recur = async (c) => {
                let com = await Comment.findById(c) 
                await Comment.findByIdAndRemove(c)
                if(!com.comments.length){
                    return
                }
                com.comments.map(comm => {
                    recur(comm)
                })       
            }
            recur(c)
        })

        res.send('removed comment')   
    } catch (err) {
        res.status(500).send(error.message)
    }
})


module.exports = router;