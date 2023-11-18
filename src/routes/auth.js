const express = require('express');
const router = express.Router();
const userService = require('../services/user')
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.login(email, password);
        console.log(user.email + user.password + "inside try")
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET)
        res.send(`Token: ${token}`)
    } catch (err) {
        res.status(401).send('Invalid Credentials')
    }
})

module.exports = router