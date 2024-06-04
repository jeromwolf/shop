import pool from '../db.js';

export const getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, username, email FROM users');
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT id, username, email FROM users WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    try {
        const [result] = await pool.query('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ id, username, email });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
