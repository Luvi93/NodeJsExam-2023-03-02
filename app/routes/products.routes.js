const express = require('express');

const productsRouter = new express.Router();

const productsController = require('../controllers/products.controller');

productsRouter.post('/api/v1/products', productsController.create);

productsRouter.get('/api/v1/products',productsController.getAll);

productsRouter.get('/api/v1/products/:id',productsController.getById);

productsRouter.patch('/api/v1/products/:id', productsController.update);

productsRouter.delete('/api/v1/products/:id', productsController.delete);

module.exports = productsRouter;