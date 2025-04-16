const Bacsi = require("../models/bacsi.model");
module.exports = {
  getAll: (req, res) => {
    Bacsi.getAll((result) => {
      res.send(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    Bacsi.getById(id, (result) => {
      res.send(result);
    });
  },
  insert: (req, res) => {
    const bacsi = req.body;
    Bacsi.insert(bacsi, (result) => {
      res.send(result);
    });
  },
  update: (req, res) => {
    const bacsi = req.body;
    const id = req.params.id;
    Bacsi.update(bacsi, id, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    const id = req.params.id;
    Bacsi.delete(id, (result) => {
      res.send(result);
    });
  },
};
