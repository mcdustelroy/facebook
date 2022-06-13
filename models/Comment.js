const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    parentID: {
        type: mongoose.Schema.Types.ObjectId,
    },
    authorID: {
        type: mongoose.Schema.Types.ObjectId,
    },
    authorName: {
        type: String,
    },
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Array
    }
})

module.exports = mongoose.model('Comment', CommentSchema)