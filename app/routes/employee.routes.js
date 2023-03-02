const express = require('express');

const employeeRouter = express.Router();

const employeeController = require('../controllers/employees.controller');

employeeRouter.post('/api/v1/employees',employeeController.create);

employeeRouter.get('/api/v1/employees',employeeController.getAll);

employeeRouter.get('/api/v1/employees/:id',employeeController.getById);

employeeRouter.patch('/api/v1/employees/:id', employeeController.update);

employeeRouter.delete('/api/v1/employees/:id', employeeController.delete);

module.exports = employeeRouter;