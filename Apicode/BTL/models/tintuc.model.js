const db = require("../common/db");
const tintuc = (tintuc) => {
  this.tintuc_id = tintuc.tintuc_id;
  this.tieu_de = tintuc.tieu_de;
  this.noi_dung = tintuc.noi_dung;
  this.ngay_dang = tintuc.ngay_dang;
  this.tac_gia = tintuc.tac_gia;
  this.anh_tin_tuc = tintuc.anh_tin_tuc;
  this.loai_tin = tintuc.loai_tin;
  this.trang_thai = tintuc.trang_thai;
};
tintuc.getById = (tintuc_id, callback) => {
  const sqlString = "SELECT * FROM tintuc WHERE tintuc_id = ? ";
  db.query(sqlString, [tintuc_id], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
tintuc.getNewNK = (callback) => {
    const sqlString = "SELECT * FROM tintuc WHERE loai_tin = N'Dịch vụ' AND trang_thai = N'Công khai'";
    db.query(sqlString, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(result);
    });
};
tintuc.getNewGDV = (callback) => {
    const sqlString = "SELECT * FROM tintuc WHERE loai_tin = N'Giá dịch vụ' AND trang_thai = N'Công khai'";
    db.query(sqlString, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(result);
    });
};
tintuc.getAll = (callback) => {
  const sqlString = "SELECT * FROM tintuc ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
tintuc.insert = (tintuc, callBack) => {
  const sqlString = "INSERT INTO tintuc SET ?";
  db.query(sqlString, [tintuc], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({tintuc_id : res.insertId, ...tintuc });
  });
};
tintuc.update = (tintuc, tintuc_id, callBack) => {
  const sqlString = "UPDATE tintuc SET ? WHERE tintuc_id = ?";
  db.query(sqlString, [tintuc, tintuc_id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("Cập nhật tintuc tintuc_id = " + "tintuc_id" + " thành công");
  });
};
tintuc.delete = (tintuc_id, callBack) => {
  db.query("DELETE FROM tintuc WHERE tintuc_id = ?", [tintuc_id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("Xóa tintuc tintuc_id = " + "tintuc_id" + " thành công");
  });
};
module.exports = tintuc;
