const Users = require('../Models/userModel');

exports.showUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
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