const express = require('express');
const { UserModel, ValidateUser } = require('../models/user');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = ValidateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        user = await user.save();
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send(err.message);
    }  
});

router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(302).send(users);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) return res.status(404).send('User not found.');
        res.status(302).send(user);
    } catch (err) {
        res.status(404).send(err.message);
    }
});

router.patch('/:id', async (req, res) => {
    const userId = req.params.id;
    const updateFields = req.body;

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.status(200).send(updatedUser);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.put('/:id', async (req, res) => {
    const { error } = ValidateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const userId = req.params.id;
    const updateFields = req.body;

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.status(200).send(updatedUser);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send('User not found.');
        res.status(200).send(user);
    } catch (err) {
        res.status(404).send(err.message);
    }
});

module.exports = router;
