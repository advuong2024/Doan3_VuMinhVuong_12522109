const db = require("../common/db");
const Bacsi = (bacsi) => {
  this.bacsi_id = bacsi.bacsi_id;
  this.hoten = bacsi.hoten;
  this.ngaysinh = bacsi.ngaysinh;
  this.Gioitinh = bacsi.Gioitinh;
  this.diachi = bacsi.diachi;
  this.email = bacsi.email;
  this.SDT = bacsi.SDT;
  this.taikhoan = bacsi.taikhoan;
  this.matkhau = bacsi.matkhau;
  this.quyen = bacsi.quyen;
};
Bacsi.getById = (bacsi_id, callback) => {
  const sqlString = "SELECT * FROM bacsi WHERE bacsi_id = ? ";
  db.query(sqlString, [bacsi_id], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
Bacsi.getAll = (callback) => {
  const sqlString = "SELECT * FROM bacsi ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
Bacsi.insert = (bacsi, callBack) => {
  const sqlString = "INSERT INTO bacsi SET ?";
  db.query(sqlString, [bacsi], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({bacsi_id : res.insertId, ...bacsi });
  });
};
Bacsi.update = (bacsi, bacsi_id, callBack) => {
  const sqlString = "UPDATE bacsi SET ? WHERE bacsi_id = ?";
  db.query(sqlString, [bacsi, bacsi_id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("Cập nhật bacsi bacsi_id = " + "bacsi_id" + " thành công");
  });
};
Bacsi.delete = (bacsi_id, callBack) => {
  db.query("DELETE FROM bacsi WHERE bacsi_id = ?", [bacsi_id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("Xóa bacsi bacsi_id = " + "bacsi_id" + " thành công");
  });
};
Bacsi.findByAccount = (taikhoan, callBack) => {
  db.query("SELECT * FROM bacsi WHERE taikhoan = ?", [taikhoan], (err, res) => {
    if (err) {
      callBack(err, null);
      return;
    }
    if (res.length) {
      callBack(null, res[0]);
    } else {
      callBack(null, null);
    }
  });
};
module.exports = Bacsi;
