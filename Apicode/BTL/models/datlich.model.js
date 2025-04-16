const db = require("../common/db");
const moment = require('moment');

const Datlich = (datlich) => {
  this.datlich_id = datlich.datlich_id;
  this.benhnhan_id = datlich.benhnhan_id;
  this.bacsi_id = datlich.bacsi_id;
  this.dichvu_id = datlich.dichvu_id;
  this.Ngay_Kham = moment(datlich.Ngay_Kham).local().format('YYYY-MM-DD');

  this.Gio_Kham = datlich.Gio_Kham;
  this.Trang_Thai = datlich.Trang_Thai;
};
Datlich.getById = (datlich_id, callback) => {
  const sqlString = "SELECT * FROM datlich WHERE datlich_id = ? ";
  db.query(sqlString, [datlich_id], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
Datlich.getAll = (callback) => {
  const sqlString = "SELECT * FROM datlich ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
Datlich.insert = (datlich, callBack) => {
  const sqlString = "INSERT INTO datlich SET ?";
  db.query(sqlString, [datlich], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({datlich_id : res.insertId, ...datlich });
  });
};
Datlich.update = (datlich, datlich_id, callBack) => {
  const sqlString = "UPDATE datlich SET ? WHERE datlich_id = ?";
  db.query(sqlString, [datlich, datlich_id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("Cập nhật datlich datlich_id = " + "datlich_id" + " thành công");
  });
};
Datlich.delete = (datlich, datlich_id, callBack) => {
  db.query("DELETE FROM datlich WHERE datlich_id = ?", [datlich_id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("Xóa datlich datlich_id = " + "datlich_id" + " thành công");
  });
};
Datlich.getToday = (callBack) => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const sqlString = "SELECT * FROM nhakhoa.datlich WHERE Ngay_Kham = ?";
  db.query(sqlString, [formattedDate], (err, result) => {
    if (err) {
      console.error('Lỗi:', err);
      return callBack(err);
    }
    callBack(null, result);
  });
};
Datlich.updateStatus = (datlich_id, callBack) =>{
  const sql = "UPDATE datlich SET Trang_Thai = 'Hoàn thành' WHERE datlich_id = ?";
  db.query(sql, [datlich_id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("Cập nhật datlich datlich_id = " + "datlich_id" + " thành công");
  });
};
Datlich.getBookingCount = (callBack) => {
  db.query(`SELECT COUNT(*) as count FROM datlich
    WHERE MONTH(Ngay_Kham) = MONTH(CURRENT_DATE()) AND YEAR(Ngay_Kham) = YEAR(CURRENT_DATE())`,
    (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack(null, res[0].count);
  });
};

module.exports = Datlich;
