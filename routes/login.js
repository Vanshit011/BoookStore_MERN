const express = require('express');
const router = express.Router();

const User = require('../models/user');
const { jwtAuthMiddleware, generateToken } = require('../jwt');

//login API
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });      
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // generate Token 
        const payload = {
            id: user.id,
            name: user.name
        }
        const token = generateToken(payload);
        console.log("Login successfull")
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
module.exports = router;