import pool from '../db.js';

export const getUserCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const [cart] = await pool.query('SELECT * FROM carts WHERE user_id = ?', [userId]);
        if (cart.length > 0) {
            const [cartItems] = await pool.query('SELECT * FROM cart_items WHERE cart_id = ?', [cart[0].id]);
            res.status(200).json({ cart: cart[0], items: cartItems });
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const createUserCartItems = async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    try {
        const [cart] = await pool.query('SELECT * FROM carts WHERE user_id = ?', [userId]);
        let cartId;
        if (cart.length > 0) {
            cartId = cart[0].id;
        } else {
            const [result] = await pool.query('INSERT INTO carts (user_id) VALUES (?)', [userId]);
            cartId = result.insertId;
        }
        const [result] = await pool.query('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)', [cartId, productId, quantity]);
        res.status(201).json({ id: result.insertId, cart_id: cartId, product_id: productId, quantity });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateUserCartItems = async (req, res) => {
    const { userId, itemId } = req.params;
    const { quantity } = req.body;
    try {
        const [cart] = await pool.query('SELECT * FROM carts WHERE user_id = ?', [userId]);
        if (cart.length > 0) {
            const cartId = cart[0].id;
            const [result] = await pool.query('UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND id = ?', [quantity, cartId, itemId]);
            if (result.affectedRows > 0) {
                res.status(200).json({ id: itemId, cart_id: cartId, quantity });
            } else {
                res.status(404).json({ error: 'Item not found' });
            }
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteUserCartItems = async (req, res) => {
    const { userId, itemId } = req.params;
    try {
        const [cart] = await pool.query('SELECT * FROM carts WHERE user_id = ?', [userId]);
        if (cart.length > 0) {
            const cartId = cart[0].id;
            const [result] = await pool.query('DELETE FROM cart_items WHERE cart_id = ? AND id = ?', [cartId, itemId]);
            if (result.affectedRows > 0) {
                res.status(204).json();
            } else {
                res.status(404).json({ error: 'Item not found' });
            }
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};