const express = require('express');
const router = express.Router();

const User = require('../models/user');
const { jwtAuthMiddleware, generateToken } = require('../jwt');


//API route to add User Data
//Registration
router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const newUserData = new User(data);
        const response = await newUserData.save();
        console.log("Registration successfully");

        // JWT token apply
        const payload = {
            id: response.id,
            name: response.name,
        }

        const token = generateToken(payload);

        res.status(200).json({ response: response, token: token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = router;
