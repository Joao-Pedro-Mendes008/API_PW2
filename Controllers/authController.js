const User = require('../Models/userModel');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.login = async (req, res) => {
    try {
        console.log('Body:', req.body);
        const { loginUser, password } = req.body
        const user = await User.findOne({
            where: { loginUser, active: true }
        });
        if (user && user.password) {
            const token = jwt.sign(
                { id: user.id, username: user.username, loginUser: user.loginUser },
                process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }
            )
            return res.status(200).json({ message: `Bem-Vindo: ${user.username}`, token })
        } else {
            return res.status(404).json({ message: 'Usuário ou senha incorretos' })
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
};

exports.register = async (req, res) => {
    try {
        const { loginUser, username, password } = req.body

        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword);

        const user = await User.create(
            { username, loginUser, password: hashPassword, active: true }
        );

        console.log(username, loginUser, password);
        console.log("TESTE")

        res.status(201).json({ message: 'Usuário criado com sucesso', user })
    } catch (error) {
        return res.status(500).send(error.message)
    }
} 
