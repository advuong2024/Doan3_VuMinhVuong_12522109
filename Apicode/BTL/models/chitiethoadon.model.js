const db = require("../common/db");
const Chitiethoadon = (chitiethoadon) => {
  this.ma_chi_tiet = chitiethoadon.ma_chi_tiet;
  this.ma_hoa_don = chitiethoadon.ma_hoa_don;
  this.dichvu_id = chitiethoadon.dichvu_id;
  this.gia = chitiethoadon.gia;
};
Chitiethoadon.getById = (ma_chi_tiet, callback) => {
  const sqlString = "SELECT * FROM chitiethoadon WHERE ma_chi_tiet = ? ";
  db.query(sqlString, [ma_chi_tiet], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
Chitiethoadon.getByMaHD = (ma_hoa_don, callback) => {
  const sqlString = "SELECT * FROM chitiethoadon WHERE ma_hoa_don = ?";
  db.query(sqlString, [ma_hoa_don], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
Chitiethoadon.getAll = (callback) => {
  const sqlString = "SELECT * FROM chitiethoadon ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
Chitiethoadon.insert = (chitiethoadon, callBack) => {
  const sqlString = "INSERT INTO chitiethoadon SET ?";
  db.query(sqlString, [chitiethoadon], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ma_chi_tiet : res.insertId, ...chitiethoadon });
  });
};
Chitiethoadon.update = (chitiethoadon, ma_chi_tiet, callBack) => {
  const sqlString = "UPDATE chitiethoadon SET ? WHERE ma_chi_tiet = ?";
  db.query(sqlString, [chitiethoadon, ma_chi_tiet], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("Cập nhật chitiethoadon ma_chi_tiet = " + "ma_chi_tiet" + " thành công");
  });
};
Chitiethoadon.delete = (ma_chi_tiet, callBack) => {
  db.query("DELETE FROM chitiethoadon WHERE ma_chi_tiet = ?", [ma_chi_tiet], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("Xóa chitiethoadon ma_chi_tiet = " + "ma_chi_tiet" + " thành công");
  });
};
module.exports = Chitiethoadon;
