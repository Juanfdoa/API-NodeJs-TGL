const Joi = require('joi');
const userService = require('../services/user')

const getUsers= async (req, res) => {
    try {
        const users = await userService.getUsers()
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { email, password} = req.body;
        const user = await userService.insertUser(email, password)
        if (!user) {
            res.status(404).json({ error: 'Bad request' });
        }
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required()
        });

        const { error } = schema.validate({ email: req.params.email });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const email = req.params.email;
        console.log("correo"+ email)
        const userDeleted = await userService.deleteUser(email)

        if (!userDeleted) {
            return res.status(404).json({ error: 'User was not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getUsers,
    createUser,
    deleteUser
}