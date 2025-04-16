const Chitiethoadon = require("../models/chitiethoadon.model");
module.exports = {
  getAll: (req, res) => {
    Chitiethoadon.getAll((result) => {
      res.send(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    Chitiethoadon.getById(id, (result) => {
      res.send(result);
    });
  },
  getMaHD: (req, res) => {
    const id = req.params.id;
    Chitiethoadon.getByMaHD(id, (result) => {
      res.send(result);
    });
  },
  insert: (req, res) => {
    const chitiethoadon = req.body;
    Chitiethoadon.insert(chitiethoadon, (result) => {
      res.send(result);
    });
  },
  update: (req, res) => {
    const chitiethoadon = req.body;
    const id = req.params.id;
    Chitiethoadon.update(chitiethoadon, id, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    const id = req.params.id;
    Chitiethoadon.delete(id, (result) => {
      res.send(result);
    });
  },
};
