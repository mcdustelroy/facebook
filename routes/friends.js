const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const { findByIdAndUpdate } = require('../models/User');

// GET api/friends
// get all user's friend
router.get('/:userID', async (req, res) => {
    const {userID} = req.params
    try {
        const user = await User.findById(userID).populate('friends')       
        res.send(user.friends)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});

// GET api/friends
// get all user's pending friend
router.get('/pending/:userID', async (req, res) => {
    const {userID} = req.params
    try {
        const user = await User.findById(userID).populate('pendingFriends')       
        res.send(user.pendingFriends)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});

// POST api/friends
// Add a pending friend to a user
router.post('/pending/:userID/:friendID', async (req, res) => {
    const { userID, friendID } = req.params 
    try {
        await User.findByIdAndUpdate(friendID,
            {$addToSet: { pendingFriends: userID } }
            );
        res.send("friend pending")
    } catch (error) {
        console.log(error);
    }
});

// GET api/friends
// Get all pending friends for a user
router.get('/reqSubmitted/:userID', async (req, res) => {
    const { userID } = req.params
    try {
        const user = await User.findById(userID);
        res.send(user.friendReqSubmitted)
    } catch (error) {
        console.log(error);
    }
});

// POST api/friends
// Add a friendRequest to a user
router.post('/submitted/:userID/:friendID', async (req, res) => {
    const { userID, friendID } = req.params
    try {
        const user = await User.findByIdAndUpdate(userID,
            {$addToSet: { friendReqSubmitted: friendID }}, { new: true}
            );
        res.send(user.friendReqSubmitted)
    } catch (error) {
        console.log(error);
    }
});

// DELETE api/friends
// Delete a friendRequest to a user
router.delete('/submitted/:userID/:friendID', async (req, res) => {
    const { userID, friendID } = req.params
    try {
        await User.findByIdAndUpdate(friendID, {$pull: { friendReqSubmitted: userID}})
        res.send('removed')
    } catch (error) {
        console.log(error);
    }
});

// DELETE api/friends
// Delete a pending friend request from a user
router.delete('/pending/:userID/:idToDelete', async (req, res) => {
    const { userID, idToDelete } = req.params
    try {
        await User.findByIdAndUpdate(userID, {$pull: { pendingFriends: idToDelete}})
        res.send('friend removed from pending')
    } catch (error) {
        console.log(error);
    }
});

// POST api/friends
// Add to friends
router.post('/:userID/:friendID', async (req, res) => {
    const { userID, friendID } = req.params
    try {
        await User.findByIdAndUpdate(userID,
            {$addToSet: { friends: friendID } }
            );
        res.send("successfully added friend")
    } catch (error) {
        console.log(error);
    }
});

// Delete a friend
router.delete('/:userID/:idToDelete', async (req, res) => {
    const { userID, idToDelete } = req.params
    try {
        await User.findByIdAndUpdate(userID, {$pull: { friends: idToDelete}})
        res.send('friend deleted')
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;