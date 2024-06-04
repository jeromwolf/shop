import jwt from 'jsonwebtoken';
import pool from '../db.js';
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(`register: ${username}, ${email}, ${password}`);
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
        res.status(200).json({ success: true, message: "User has been created." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, username, email, password FROM users WHERE email = ?', [req.body.email]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = rows[0];
        console.log(user);

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        console.log(isMatch);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT, {
            expiresIn: '1h'
        });

        const { password, isAdmin, ...otherDetails } = user;
        res
            .cookie("access_token", token, {
                httpOnly: true,
                sameSite: 'strict',
                path: '/'
            })
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: '/',
        sameSite: 'strict',
    }).status(200)
        .json({ message: "Logged out successfully" });
};
