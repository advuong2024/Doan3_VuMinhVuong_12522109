const db = require("../common/db");
const Benhnhan = (benhnhan) => {
  this.benhnhan_id = benhnhan.benhnhan_id;
  this.hoten = benhnhan.hoten;
  this.ngaysinh = benhnhan.ngaysinh;
  this.Gioitinh = benhnhan.Gioitinh;
  this.diachi = benhnhan.diachi;
  this.email = benhnhan.email;
  this.SDT = benhnhan.SDT;
};
Benhnhan.getById = (benhnhan_id, callback) => {
  const sqlString = "SELECT * FROM benhnhan WHERE benhnhan_id = ? ";
  db.query(sqlString, [benhnhan_id], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
Benhnhan.getAll = (callback) => {
  const sqlString = "SELECT * FROM benhnhan ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
Benhnhan.insert = (benhnhan, callBack) => {
  const sqlString = "INSERT INTO benhnhan SET ?";
  db.query(sqlString, [benhnhan], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({benhnhan_id : res.insertId, ...benhnhan });
  });
};
Benhnhan.update = (benhnhan, benhnhan_id, callBack) => {
  const sqlString = "UPDATE benhnhan SET ? WHERE benhnhan_id = ?";
  db.query(sqlString, [benhnhan, benhnhan_id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("Cập nhật benhnhan benhnhan_id = " + "benhnhan_id" + " thành công");
  });
};
Benhnhan.delete = (benhnhan_id, callBack) => {
  db.query("DELETE FROM benhnhan WHERE benhnhan_id = ?", [benhnhan_id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("Xóa benhnhan benhnhan_id = " + "benhnhan_id" + " thành công");
  });
};
module.exports = Benhnhan;
