const Tintuc = require("../models/tintuc.model");
module.exports = {
  getAll: (req, res) => {
    Tintuc.getAll((result) => {
      res.send(result);
    });
  },
  getNewNK: (req, res) => {
    Tintuc.getNewNK((result) => {
        res.send(result);
    });
  },
  getNewGDV: (req, res) => {
    Tintuc.getNewGDV((result) => {
        res.send(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    Tintuc.getById(id, (result) => {
      res.send(result);
    });
  },
  insert: (req, res) => {
    const tintuc = req.body;
    Tintuc.insert(tintuc, (result) => {
      res.send(result);
    });
  },
  update: (req, res) => {
    const tintuc = req.body;
    const id = req.params.id;
    Tintuc.update(tintuc, id, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    const id = req.params.id;
    Tintuc.delete(id, (result) => {
      res.send(result);
    });
  },
};
