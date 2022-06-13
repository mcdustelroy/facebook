const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   GET  api/users
// @desc    get all users
// @access  Public
router.get('/', async (req, res) => {
    try {
        const user = await User.find()
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

// @route   POST  api/users
// @desc    register a user
// @access  Public
router.post('/', [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please included a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength( {min: 6} ),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ msg: 'user already exists' })
        }
        user = new User({
            name, email, password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000  // 3600 is one hour
        }, (err, token) => {
            if(err) throw err;
            res.json( {token} ); 
        })

    } catch (err) {
        res.status(500).send('Server error')
    }
});

module.exports = router;

