const { updateStatus } = require("../models/datlich.model");
const Hoadon = require("../models/hoadon.model");
module.exports = {
  updateStatus: (req, res) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Vui lòng cung cấp ID." });
    }
    Hoadon.updateStatus(id, (result) => {
      res.status(200).json({ message: result });
    });
  },
  getAll: (req, res) => {
    Hoadon.getAll((result) => {
      res.send(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    Hoadon.getById(id, (result) => {
      res.send(result);
    });
  },
  insert: (req, res) => {
    const hoadon = req.body;
    Hoadon.insert(hoadon, (result) => {
      res.send(result);
    });
  },
  update: (req, res) => {
    const hoadon = req.body;
    const id = req.params.id;
    Hoadon.update(hoadon, id, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    const id = req.params.id;
    Hoadon.delete(id, (result) => {
      res.send(result);
    });
  },
};
