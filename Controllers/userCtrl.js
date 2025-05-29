const User = require('../Models/userModel');
const bcrypt = require('bcrypt');

exports.listUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'loginUser', 'active']
        });
        if (users.length === 0) {
            return res.status(404).json({ message: 'Users not found' });
        }
        return res.status(200).json(users)
    } catch (error) {
        const logError = 'The request has failed'
        return res.status(424).send(logError + error.message)
    }
};

// exports.listUser = async (req, res) => {
//     try {
//         const user = await User.findOne({

//         })
//     }
// }

exports.activateUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findOne({
            where: { id: id }
        })
        if (user) {
            user.active = true;
            await user.save();
            return res.status(200).json({ message: `Usuário: ${user.username} ativado com êxito.` })
        } else {
            return res.status(404).send("Usuário não encontrado")
        }

    } catch (error) {
        return res.status(500).send(error.message)
    }
};

exports.deactivateUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await Users.findOne({
            where: { id: id }
        })
        if (user) {
            user.active = false;
            await user.save();
            return res.status(200).json({ message: `Usuário: ${user.username} desativado com êxito.` })
        } else {
            return res.status(404).send("Usuário não encontrado")
        }

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findOne({ where: { id: id } })
        if (user) {
            user.password = hashedPassword;
            await user.save();
            return res.status(200).json({ message: "Senha alterada com sucesso" })
        } else {
            return res.status(404).send("Usuário não encontrado")
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

exports.updateUser = async (req, res) => {
    try {
        {
            try {
                const { id } = req.params;
                const { username, loginUser } = req.body;
                const user = await User.findOne({ where: { id: id } })
                if (user) {
                    user.username = username;
                    user.loginUser = loginUser;
                    await user.save();
                    return res.status(200).json({ message: "Nome e email alterados com sucesso ", user })
                } else {
                    return res.status(404).send("Usuário não encontrado")
                }
            } catch (error) {
                return res.status(500).send(error.message)
            }
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
