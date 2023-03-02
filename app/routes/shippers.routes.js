const express = require('express');

const shippersRouter = new express.Router();

const shippersController = require('../controllers/shippers.controller');

shippersRouter.post('/api/v1/shippers', shippersController.create);

shippersRouter.get('/api/v1/shippers', shippersController.getAll);

shippersRouter.get('/api/v1/shippers/:id', shippersController.getById);

shippersRouter.patch('/api/v1/shippers/:id', shippersController.update);

shippersRouter.delete('/api/v1/shippers/:id', shippersController.delete);

module.exports = shippersRouter;