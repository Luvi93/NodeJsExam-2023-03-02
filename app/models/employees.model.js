const mysql = require('mysql2/promise');
const mysqlConfig = require('../config/db.config');

const Employee = function(employee) {
    this.employee_id = employee.employee_id;
    this.last_name = employee.last_name;
    this.first_name = employee.first_name;
    this.title = employee.title;
    this.title_of_courtesy = employee.title_of_courtesy;
    this.birth_date = employee.birth_date;
    this.hire_date = employee.hire_date;
    this.address = employee.address;
    this.city = employee.city;
}

Employee.create = async (newEmployee) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const query = 'INSERT INTO employees SET ?';

    const [results] = await con.execute(query, [newEmployee]);

    console.log('Created employee', { id: results.insertId, ...newEmployee });

    await con.end();

    return { id: results.insertId, ...newEmployee };
  } catch (err) {
    console.error('Error in Employee.create:', err);
    throw err;
  }
}

Employee.getAll = async () => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const query = 'SELECT * FROM employees';
    const [rows] = await con.execute(query);
    await con.end();

    return rows;
  } catch (err) {
    console.error('Error in Employee.getAll:', err);
    throw err;
  }
}

Employee.getById = async (id) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const query = `
      SELECT * 
      FROM employees
      WHERE employee_id = ?
    `;
    const [rows] = await con.execute(query, [id]);
    const employee = rows[0];
    
    if (!employee) {
      throw { message: 'Employee not found' };
    }

    await con.end();
    return employee;
  } catch (err) {
    console.error(`Error in Employee.getById(${id}):`, err);
    throw err;
  }
}

Employee.update = async (id, newData) => {
  try {
    const connection = await mysql.createConnection(mysqlConfig);

    // Check if the employee exists
    const query = 'SELECT * FROM employees WHERE employee_id = ?';
    const [results] = await connection.execute(query, [id]);

    if (results.length === 0) {
      throw { message: 'Employee not found' };
    }

    // Build the update query
    const fieldsToUpdate = ['last_name', 'first_name', 'title', 'title_of_courtesy', 'address', 'city'];
    const setClauses = fieldsToUpdate.map(field => `${field} = COALESCE(?, ${field})`).join(', ');
    const updateQuery = `UPDATE employees SET ${setClauses} WHERE employee_id = ?`;
    const updateParams = fieldsToUpdate.map(field => newData[field] || null);
    updateParams.push(id);

    // Update the employee
    const [updateResult] = await connection.execute(updateQuery, updateParams);
    console.log(`${updateResult.affectedRows} record(s) updated`);

    await connection.end();
  } catch (err) {
    console.error('Error in updateEmployee:', err);
    throw err;
  }
};


Employee.delete = async (id) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const query = 'DELETE FROM employees WHERE employee_id = ?';

    const [result] = await con.execute(query, [id]);

    if (result.affectedRows === 0) {
      throw { message: 'not_found' };
    }

    await con.end();
  } catch (err) {
    console.log(err);
    throw err;
  }
}
module.exports = Employee;