const Product = require('../models/products.model');

class ProductController {

  async create(req, res) {
    try {
      const {
        product_name,
        supplier_id,
        category_id,
        quantity_per_unit,
        unit_price,
      } = req.body;

      if (!req.body) {
        return res.status(400).send({
          message: 'Content can not be empty!',
        });
      }

      const requiredFields = [
        'product_name',
        'supplier_id',
        'category_id',
        'quantity_per_unit',
        'unit_price',
      ];

      for (const field of requiredFields) {
        if (!req.body[field]) {
          return res
            .status(400)
            .send({ message: `${field} is a required field!` });
        }
      }

      const product = new Product({
        product_name,
        supplier_id,
        category_id,
        quantity_per_unit,
        unit_price,
      });

      await Product.create(product);

      res.status(201).send({
        message: 'Product added!',
        product,
      });
    } catch (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the product.',
      });
    }
  }

  async getAll(req, res) {
    try {
      const products = await Product.getAll({});

      res.status(200).send(products);
    } catch (err) {
      console.error('Error in getAll:', err);
      res.status(500).send({
        message: 'An error occurred while retrieving products',
        error: err.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const product = await Product.getById(id);

      if (!product) {
        return res.status(404).send({ message: 'Product not found.' });
      }

      res.status(200).send(product);
    } catch (err) {
      console.error('Error in getById:', err);
      res.status(500).send({ message: 'Error retrieving product with id.' });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const newData = req.body;

      if (!newData) {
        return res.status(400).send({ message: 'Content can not be empty!' });
      }

      const product = await Product.getById(id, newData, {
        new: true,
      });

      if (!product) {
        return res.status(404).send({ message: 'Product not found.' });
      }

      res.status(200).send({
        message: `Product updated!`,
        product,
      });
    } catch (err) {
      console.error('Error in update:', err);
      res.status(500).send({ message: 'Error updating product with id.' });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;

      const product = await Product.delete(id);

      if (!product) {
        return res.status(404).send({ message: 'Product not found.' });
      }

      res.send({
        message: 'Product deleted successfully!',
      }).status(204);
    } catch (err) {
      console.error('Error in delete:', err);
      res.status(500).send({ message: 'Error deleting product with id.' });
    }
  }
}

module.exports = new ProductController();