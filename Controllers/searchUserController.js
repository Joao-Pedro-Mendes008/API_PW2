const User = require('../Models/userModel');

exports.searchUserController = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOne({
            attributes: ['id', 'username', 'loginUser', 'active'],
            where: { id: id }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        return res.status(200).json(user);

    } catch (error) {
        const logError = 'The request has failed';
        return res.status(424).send(logError + error.message);
    }
};