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
        const task = await Task.create({ title: title, descTask: description, userId: id });

        const taskToken = jwt.sign({ id: task.id, UserId: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        return res.status(201).json(`Tarefa criada com sucesso! Token de acesso: ${taskToken}`);

    } catch (error) {
        console.log();
        console.log(error);
        return res.status(500).json({ message: 'Tarefa não criada' });

    }
};

exports.listTask = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findOne({ where: { id: id } });
        const task = await Task.findAll({
            where: { userId: user.id }
        })
        if (task) {
            return res.status(200).json(task)
        }
        return res.status(404).json({ message: 'Tarefa não encontrada' })
    } catch (error) {
        return res.status(500).json({ message: "Erro ao conectar com o servidor" })
    }
}

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { taskTitle, newTitle, newDescription, status } = req.body;
    const task = await Task.findOne({ where: { userId: id, title: taskTitle } });
    try {
                if (task) {
                    task.title = newTitle;
                    task.descTask = newDescription;
                    task.completed = status;
                    await task.save();
                    return res.status(200).json({ message: "Titulo e descrição alterados com sucesso", task})
                } else {
                    return res.status(404).send("Tarefa não encontrada")
                }
            } catch (error) {
        return res.status(500).send(error.message)
    }
}

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const task = await Task.findOne({ where: { userId: id, title: title } });
        if (!task){
            return res.status(404).json({ message: "Tarefa não encontrada" });
        }
        await task.destroy();
        return res.status(200).json({ message: "Tarefa deletada com sucesso" });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao conectar com o servidor" })
    }
}
