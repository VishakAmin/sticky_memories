import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User Doesn't Exist" })
        }
        const isPassword = await bcrypt.compare(password, existingUser.password)

        if (!isPassword) {
            return res.status(404).json({ message: "Invalid Password" })
        }

        const token = jwt.sign({
            email: existingUser.eamil,
            id: existingUser._id
        },
            'goldfish',
            { expiresIn: "1h" }
        )
        return res.status(200).json({ result: existingUser, token })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const signup = async (req, res) => {
    const { email, password, firstName, lastName, confirmPassword } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" })
        }

        if (password !== confirmPassword) {
            return res.status(404).json({ message: "Password doesn't Match" })
        }

        const hashedpassword = await bcrypt.hash(password, 12);

        const result = await User.create({
            email,
            password: hashedpassword,
            name: `${firstName} ${lastName}`
        });

        const token = jwt.sign({
            email: result.eamil,
            id: result._id
        },
            'goldfish',
            { expiresIn: "1h" }
        )
        return res.status(200).json({ result: result, token })
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}