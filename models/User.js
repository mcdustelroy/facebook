const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        // required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    posts: [
        {
            name: String,
            title: String,
            body: String,
            date: String
        }
    ],
    info: {
        type: Object,
    },
    profilePhoto: {
        type: Object,
    },
    backgroundImage: {
        type: Object,
    },
    photoAlbum: {
        type: Array,
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    pendingFriends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    friendReqSubmitted: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
})

module.exports = mongoose.model('User', UserSchema)