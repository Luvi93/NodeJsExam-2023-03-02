const Shipper = require('../models/shippers.model');

class ShipperController {
  async create(req, res) {
    try {
      const { company_name, phone } = req.body;

      if (!company_name || !phone) {
        return res.status(400).send({
          message: "Company name and phone are required fields!"
        });
      }

      const shipper = new Shipper({
        shipper_id: req.body.id,
        company_name,
        phone,
      });

      await Shipper.create(shipper);

      res.status(201).send({
        message: "Shipper created!",
        shipper,
      });
    } catch (err) {
      console.error('Error in ShipperController.create:', err);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    }
  }

  async getAll(req, res) {
    try {
      const shippers = await Shipper.getAll();

      res.status(200).send(shippers);
    } catch (err) {
      console.error('Error in ShipperController.getAll:', err);
      res.status(500).send({
        message: 'An error occurred while retrieving Shippers',
        error: err.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const shipper = await Shipper.getById(id);

      if (!shipper) {
        return res.status(404).send({ message: 'Not found Shipper with id.'});
      }

      res.status(200).send(shipper);
    } catch (err) {
      console.error('Error in ShipperController.getById:', err);
      res.status(500).send({ message: 'Error retrieving Shipper with id '});
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const newData = req.body;

      if (!newData) {
        return res.status(400).send({ message: "Content can not be empty!" });
      }

      await Shipper.update(id, newData);

      res.status(200).send({
        message: `Shipper updated!`
      });

    } catch (err) {
      console.error('Error in ShipperController.update:', err);
      res.status(500).send({ message: 'Error retrieving Shipper with id '});
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;

      await Shipper.delete(id);

      res.send({
        message: "Shipper deleted successfully!"
      }).status(204);
    } catch (err) {
      console.error('Error in ShipperController.delete:', err);
      res.status(500).send({ message: 'Error retrieving Shipper with id '});
    }
  }
}

module.exports = new ShipperController();
