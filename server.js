const express = require("express");
const employeeRoutes = require('./app/routes/employee.routes.js');
const productsRoutes = require('./app/routes/products.routes.js');
const shippersRoutes = require('./app/routes/shippers.routes.js');

const app = express();

app.use(express.json());

app.use(employeeRoutes);
app.use(productsRoutes);
app.use(shippersRoutes);

app.get("/version", (req, res) => {
  res.json({ version: "v0.1.0" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
