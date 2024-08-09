const bcrypt = require('bcrypt');
const db = require('../../common/models');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize'); // Import Sequelize operators

const User = db.users;
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const data = {
            username,
            email,
            password: bcrypt.hashSync(password, 10)
        };
        const user = await User.create(data);

        if (user) {
            let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                expiresIn: 86400
            });
            // res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);
            res.status(201).json({ token, user });
        } else{
            return res.status(409).json({ message: "Credentials are invalid" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { username: email }
                ]
            }
        });
        if (user) {
            const isSame = bcrypt.compareSync(password, user.password);
            if (isSame) {
                let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                    expiresIn: 86400
                });
                // res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                console.log("user", JSON.stringify(user, null, 2));
                console.log(token);
                return res.status(201).json({token, user});
            }else {
                return res.status(401).json({ message: "Credentials are invalid" });
            }
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    signup,
    login
};
