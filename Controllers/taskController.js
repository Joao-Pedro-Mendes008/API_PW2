const Task = require('../Models/taskModel');
const User = require('../Models/userModel');

exports.createTask = async (req, res) => {
    const { id } = req.params;

    const { title, description } = req.body;

    try {

        const user = await User.findOne({ where: { id: id } });

        if (!user) {

            return res.status(404).json("Usuário não encontrado");

        }
        const task = await Task.create({ title: title, description: description, userId: id });

        return res.status(201).json(task);

    } catch (error) {

        return res.status(500).json({ message: "Erro ao criar tarefa" });
        
    }
}