const Task = require('../Models/taskModel');
const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.createTask = async (req, res) => {
    const { id } = req.params;

    const { title, description } = req.body;

    try {

        const user = await User.findOne({ where: { id: id } });

        if (!user) {

            return res.status(404).json("Usuário não encontrado");

        }
        const task = await Task.create({ title: title, description: description, userId: id });

        const taskToken = jwt.sign({ id: task.id, UserId: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        return res.status(201).json(taskToken);

    } catch (error) {
        console.log();
        console.log(error);
        return res.status(500).json({ message: 'Tarefa não criada' });

    }
}