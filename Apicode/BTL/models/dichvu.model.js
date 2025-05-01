const db = require("../common/db");
const Dichvu = (dichvu) => {
  this.dichvu_id = dichvu.dichvu_id;
  this.ten_event = dichvu.ten_event;
  this.mo_ta = dichvu.mo_ta;
  this.anh_event = dichvu.anh_event;
  this.gia_event = dichvu.gia_event;
};
Dichvu.getById = (dichvu_id, callback) => {
  const sqlString = "SELECT * FROM dichvu WHERE dichvu_id = ? ";
  db.query(sqlString, [dichvu_id], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
Dichvu.getAll = (callback) => {
  const sqlString = "SELECT * FROM dichvu ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
Dichvu.insert = (dichvu, callBack) => {
  const sqlString = "INSERT INTO dichvu SET ?";
  db.query(sqlString, [dichvu], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({dichvu_id : res.insertId, ...dichvu });
  });
};
Dichvu.update = (dichvu, dichvu_id, callBack) => {
  const sqlString = "UPDATE dichvu SET ? WHERE dichvu_id = ?";
  db.query(sqlString, [dichvu, dichvu_id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("Cập nhật dichvu dichvu_id = " + "dichvu_id" + " thành công");
  });
};
Dichvu.delete = (dichvu_id, callBack) => {
  db.query("DELETE FROM dichvu WHERE dichvu_id = ?", [dichvu_id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("Xóa dichvu dichvu_id = " + "dichvu_id" + " thành công");
  });
};
module.exports = Dichvu;
