const Benhnhan = require("../models/benhnhan.model");
module.exports = {
  getAll: (req, res) => {
    Benhnhan.getAll((result) => {
      res.send(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    Benhnhan.getById(id, (result) => {
      res.send(result);
    });
  },
  insert: (req, res) => {
    const benhnhan = req.body;
    Benhnhan.insert(benhnhan, (result) => {
      res.send(result);
    });
  },
  update: (req, res) => {
    const benhnhan = req.body;
    const id = req.params.id;
    Benhnhan.update(benhnhan, id, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    const id = req.params.id;
    Benhnhan.delete(id, (result) => {
      res.send(result);
    });
  },
};
