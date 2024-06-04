import pool from '../db.js';

export const createPayment = async (req, res) => {
    const { orderId, amount, paymentMethod } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO payments (order_id, amount, payment_method, status) VALUES (?, ?, ?, ?)', [orderId, amount, paymentMethod, 'pending']);
        res.status(201).json({ paymentId: result.insertId, orderId, amount, paymentMethod, status: 'pending' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getPayment = async (req, res) => {
    const { paymentId } = req.params;
    try {
        const [payments] = await pool.query('SELECT * FROM payments WHERE id = ?', [paymentId]);
        if (payments.length > 0) {
            res.status(200).json(payments[0]);
        } else {
            res.status(404).json({ error: 'Payment not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


