const express = require('express');
const { UserModel, ValidateUser } = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
    /**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get a list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */
    try {
        const users = await UserModel.find();
        res.status(302).send(users);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.get('/:id', async (req, res) => {
    /**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       404:
 *         description: User not found
 */
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) return res.status(404).send('User not found.');
        res.status(302).send(user);
    } catch (err) {
        res.status(404).send(err.message);
    }
});

router.post('/', async (req, res) => {
    /**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       description: user object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       400:
 *         description: Invalid request
 */
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

router.patch('/:id', async (req, res) => {
/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update a user by ID
 *     description: Update the details of a user by providing the user ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the user to be updated.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated user information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful update
 *         content:
 *           application/json:
 *             example:
 *               message: 'User updated successfully'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'User not found'
 */  
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
    /**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Update the details of a user by providing the user ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the User to be updated.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated User information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful update
 *         content:
 *           application/json:
 *             example:
 *               message: 'User updated successfully'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'User not found'
 */
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
    /**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send('User not found.');
        res.status(200).send(user);
    } catch (err) {
        res.status(404).send(err.message);
    }
});

module.exports = router;
