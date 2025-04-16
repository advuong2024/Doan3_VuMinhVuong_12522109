const Datlich = require("../models/datlich.model");
const moment = require('moment');
module.exports = {
  getAll: (req, res) => {
    Datlich.getAll((result) => {
      // Chuyển đổi Ngay_Kham từ UTC sang múi giờ địa phương
      result.forEach(datlich => {
        if (datlich.Ngay_Kham) {
          datlich.Ngay_Kham = moment(datlich.Ngay_Kham).local().format('YYYY-MM-DD');
        }
      });
      res.send(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    Datlich.getById(id, (result) => {
      res.send(result);
    });
  },
  insert: (req, res) => {
    const datlich = req.body;
    Datlich.insert(datlich, (result) => {
      res.send(result);
    });
  },
  update: (req, res) => {
    const datlich = req.body;
    const id = req.params.id;
    Datlich.update(datlich, id, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    const id = req.params.id;
    Datlich.delete(id, (result) => {
      res.send(result);
    });
  },
  getToday: (req, res) => {
    Datlich.getToday((err, result) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi khi truy vấn lịch hôm nay", error: err });
      }
  
      // Chuyển định dạng ngày
      result.forEach(datlich => {
        if (datlich.Ngay_Kham) {
          datlich.Ngay_Kham = moment(datlich.Ngay_Kham).local().format('YYYY-MM-DD');
        }
      });
  
      res.send(result);
    });
  }, 
  updateStatus: (req, res) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Vui lòng cung cấp ID." });
    }
    Datlich.updateStatus(id, (result) => {
      res.status(200).json({ message: result });
    });
  },
};
