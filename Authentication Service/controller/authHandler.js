const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = require('../models/users');
const secretKey = process.env.JWT_SECRET_KEY || "secret";

const loginController = async (req, res) => {
    const { username, password } = req.body;

    try {

        const user = await users.findOne({ username: username });
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                console.log("authenticted");
                const token = jwt.sign({ username }, secretKey, { expiresIn: '24h' });
                res.cookie('token', token,
                    {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000, // 1 day
                        secure: false, // Use `secure: true` in production
                        sameSite: 'Lax',  // Allow cross-origin
                    }
                );
                res.json({ token: token, username : username , success: true, message: "Logged in successfully" });
            }
            else
                res.send("Incorrect Password");
        }

        else res.json({ success: false, message: "User does not exist" });

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }

}

const registerController = async (req, res) => {
    const { name, username, password } = req.body;
    try {
        const user = await users.findOne({ username: username });
        if (!user) {
            const encryptedPassword = await bcrypt.hash(password, 10);

            const newUser = new users({ name, username, password: encryptedPassword });
            await newUser.save();

            console.log("New user created.");

            res.json({ success: true, message: "Registered successfully" });
        }
        else {
            res.json({ success: false, message: "Username already in use" });
        }

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }

}

const validateToken = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        console.log('Expired Token');
        res.status(401).json({ message: "Token Expired!" });
    }
    else {
        jwt.verify(token, secretKey, (err) => {
            if (err) {
                console.log('Invalid Token; Code submission request rejected');
                res.clearCookie('token', {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                });
                res.status(401).json({ message: "Unauthorized access!" });
            }
            else {
                res.status(200).json({ success: true, message: "Token valid" });
            }
        })

    }
}

module.exports = { loginController, registerController, validateToken };