const Dichvu = require("../models/dichvu.model");
const Upload = require("../middlewares/multerConfig");
const { getToday } = require("../models/datlich.model");
module.exports = {
  getAll: (req, res) => {
    Dichvu.getAll((result) => {
      res.send(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    Dichvu.getById(id, (result) => {
      res.send(result);
    });
  },
  insert: [Upload.single('anh_event'), (req, res) => {
    const dichvu = req.body;
    if (req.file) {
      dichvu.anh_event = `/uploads/${req.file.filename}`;
    }
    Dichvu.insert(dichvu, (result) => {
      res.send(result);
    });
  }],
  
  update: [Upload.single('anh_event'), (req, res) => {
    const dichvu = req.body;
    const id = req.params.id;

    if (req.file) {
      Dichvu.getById(id, (oldService) => {
        if (oldService && oldService.anh_event) {
          if (fs.existsSync(`.${oldService.anh_event}`)) {
            fs.unlinkSync(`.${oldService.anh_event}`); // Xóa file cũ
          }
        }
        dichvu.anh_event = `/uploads/${req.file.filename}`;
        Dichvu.update(dichvu, id, (result) => {
          res.send(result);
        });
      });
    } else {
      Dichvu.update(dichvu, id, (result) => {
        res.send(result);
      });
    }
  }],

  delete: (req, res) => {
    const id = req.params.id;
    Dichvu.getById(id, (oldService) => {
      if (oldService && oldService.anh_event) {
        if (fs.existsSync(`.${oldService.anh_event}`)) {
          fs.unlinkSync(`.${oldService.anh_event}`); // Xóa file vật lý
        }
      }
      Dichvu.delete(id, (result) => {
        res.send(result);
      });
    });
  }
};
