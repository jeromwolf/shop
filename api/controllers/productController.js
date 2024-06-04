import pool from '../db.js';


export const getAllProducts = async (req, res) => {
    try {
        console.log('getAllProducts')
        const [rows] = await pool.query(
            `SELECT 
                p.id AS id,
                p.name AS name,
                p.description AS product_description,
                p.new_price  AS new_price,
                p.old_price AS old_price,
                p.created_at AS product_created_at,
                p.updated_at AS product_updated_at,
                i.id AS image_id,
                i.url AS image,
                i.created_at AS image_created_at,
                i.updated_at AS image_updated_at,
                c.name as category
            FROM 
                products p
            LEFT JOIN 
                images i ON p.id = i.product_id
            INNER JOIN 
                categories c ON p.category_id = c.id
        `);

        res.status(200).json({ rows: rows });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const getCategoriesProducts = async (req, res) => {
    try {
        const { catename } = req.params;
        console.log('catename : ', catename)
        const [rows] = await pool.query(
            `SELECT 
                p.id AS id,
                p.name AS name,
                p.description AS product_description,
                p.new_price  AS new_price,
                p.old_price AS old_price,
                p.created_at AS product_created_at,
                p.updated_at AS product_updated_at,
                i.id AS image_id,
                i.url AS image,
                i.created_at AS image_created_at,
                i.updated_at AS image_updated_at,
                c.name as category
            FROM 
                products p
            LEFT JOIN 
                images i ON p.id = i.product_id
            INNER JOIN 
                categories c ON p.category_id = c.id
            WHERE 
                c.name = ? `, [catename]);

        res.status(200).json({ rows: rows });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getIDProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(
            `SELECT 
                p.id AS id,
                p.name AS name,
                p.description AS product_description,
                p.new_price  AS new_price,
                p.old_price AS old_price,
                p.created_at AS product_created_at,
                p.updated_at AS product_updated_at,
                i.id AS image_id,
                i.url AS image,
                i.created_at AS image_created_at,
                i.updated_at AS image_updated_at,
                c.name as category
            FROM 
                products p
            LEFT JOIN 
                images i ON p.id = i.product_id
            INNER JOIN 
                categories c ON p.category_id = c.id
            WHERE 
                p.id = ? `, [id]);

        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const createProduct = async (req, res) => {
    const { name, price, description, category_id } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO products (name, price, description, category_id) VALUES (?, ?, ?, ?)', [name, price, description, category_id]);
        res.status(201).json({ id: result.insertId, name, price, description, category_id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, category_id } = req.body;
    try {
        const [result] = await pool.query('UPDATE products SET name = ?, price = ?, description = ? , category_id = ? WHERE id = ?', [name, price, description, category_id, id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ id, name, price, description });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
