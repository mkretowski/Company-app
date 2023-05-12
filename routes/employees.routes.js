const express = require('express');
const router = express.Router();
const EmployeesController = require('../controllers/employees.controller');

router.get('/employees', EmployeesController.getAll);
router.get('/employees/random', EmployeesController.getRandom);
router.get('/employees/:id', EmployeesController.getOne);
router.post('/employees', EmployeesController.postNew);
router.put('/employees/:id', EmployeesController.update);
router.delete('/employees/:id', EmployeesController.delete);

module.exports = router;
