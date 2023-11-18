const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const isAutheticated = require('../middleware/authValidation')

router.post('/', userController.createUser);

router.use(isAutheticated);
router.get('/', userController.getUsers)
router.delete('/:email', userController.deleteUser);



module.exports = router