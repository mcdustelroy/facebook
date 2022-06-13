const express = require('express');
require("dotenv").config()
const router = express.Router();
const path = require('path')
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const cloudinary = require('cloudinary');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

// removes from temp storage in uploads file
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)    

router.get('/:userID', async (req, res) => {
    try {
        const { userID } = req.params
        const user = await User.findById(userID)
        res.send(user)
    } catch (err) {
        res.status(500).send('Server Error');
    }
})

router.get('/profilePic/:userID', async (req, res) => {
    try {
        const { userID } = req.params
        const user = await User.findById(userID)
        res.send(user.profilePhoto)
    } catch (err) {
        res.status(500).send('Server Error');
    }
})


router.post('/delphoto/:userID', async (req, res) => {
    try {
        const { userID } = req.params
        const { photoID } = req.body
        
        const user = await User.findById(userID)
        const filteredAlbum = user.photoAlbum.filter(photo => photo.public_id !== photoID)
        
        user.photoAlbum = filteredAlbum

        cloudinary.uploader.destroy(photoID, function(result) { console.log(result) });

        user.save()
        console.log(user.photoAlbum)
        res.send('deleted')
    } catch (err) {
        res.status(500).send('Server Error');
    }
})

// Edit photo and add to cloudinary, while removing old photo from cloudinary
router.post('/editpic/:userID', upload.single('file'), async (req, res) => {
    try {
        const photo = await cloudinary.v2.uploader.upload(path.join(__dirname, '..', req.file.path), 
        {folder: 'facebook'},
        function(error, result) {console.log(result, error)});
        
        const { userID } = req.params
        const user = await User.findById(userID)
        
        user.profilePhoto &&
        cloudinary.uploader.destroy(user.profilePhoto.public_id, function(result) { console.log(result) });

        user.profilePhoto = photo
        user.save()

        await unlinkAsync(req.file.path) // removes from temp storage in uploads file

        res.send(user.profilePhoto)
    } catch (err) {
        res.status(500).send('Server Error');
    }
})

// Edit background photo and add to cloudinary, while removing old photo from cloudinary
router.post('/edit/backgroundImage/:userID', upload.single('file'), async (req, res) => {
    try {
        const photo = await cloudinary.v2.uploader.upload(path.join(__dirname, '..', req.file.path), 
        {folder: 'facebook'},
        function(error, result) {console.log(result, error)});
        
        const { userID } = req.params
        const user = await User.findById(userID)
        
        user.backgroundImage &&
        cloudinary.uploader.destroy(user.backgroundImage.public_id, function(result) { console.log(result) });

        user.backgroundImage = photo
        user.save()
        
        res.send(user.backgroundImage)
    } catch (err) {
        res.status(500).send('Server Error');
    }
})

// @route   POST  /api/profile
// @desc    edit profile form
// @access  Public
router.post('/edit/:userID', async (req, res) => {
    try {
        const { userID } = req.params
        const user = await User.findById(userID)
        user.info = {...user.info, ...req.body}
        
        user.save()
        
        const newName = req.body.name
        await Post.updateMany(
            {user},
            {$set: {name: newName }},
         )
        await Comment.updateMany(
            {authorID: userID},
            {$set: {authorName: newName }},  
        )         

        res.send(user.info)
    } catch (err) {
        res.status(500).send('Server Error');
    }
})

// get background image from db
router.get('/backgroundImage/:userID', async (req, res) => {
    try {
        const { userID } = req.params
        const user = await User.findById(userID)
        res.send(user.backgroundImage)
    } catch (err) {
        res.status(500).send('Server Error');
    }
})

// uploud to photo album
router.post('/edit/photos/:userID', upload.single('file'), async (req, res) => {
    try {
        const photo = await cloudinary.v2.uploader.upload(path.join(__dirname, '..', req.file.path), 
        {folder: 'facebook'},
        function(error, result) {console.log(result, error)});
        
        const { userID } = req.params
        const user = await User.findById(userID)

        photo.description = req.body.description
        photo.owner = req.params.userID
        user.photoAlbum.unshift(photo)
        user.save()
        
        res.send(user.backgroundImage)
    } catch (err) {
        res.status(500).send('Server Error');
    }
})

router.get('/photos/:userID', async (req, res) => {
    try {
        const { userID } = req.params
        const user = await User.findById(userID)
        res.send(user.photoAlbum)
    } catch (err) {
        res.status(500).send('Server Error');
    }
})

module.exports = router;

