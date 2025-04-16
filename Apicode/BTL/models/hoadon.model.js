const db = require("../common/db");
const Hoadon = (hoadon) => {
  this.ma_hoa_don = hoadon.ma_hoa_don;
  this.benhnhan_id = hoadon.benhnhan_id;
  this.bacsi_id = hoadon.bacsi_id;
  this.ngaytao = hoadon.ngaytao;
  this.trangthai = hoadon.trangthai;
};
Hoadon.getById = (ma_hoa_don, callback) => {
  const sqlString = "SELECT * FROM hoadon WHERE ma_hoa_don = ? ";
  db.query(sqlString, [ma_hoa_don], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
Hoadon.getAll = (callback) => {
  const sqlString = "SELECT * FROM hoadon ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
Hoadon.insert = (hoadon, callBack) => {
  const sqlString = "INSERT INTO hoadon SET ?";
  db.query(sqlString, [hoadon], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ma_hoa_don : res.insertId, ...hoadon });
  });
};
Hoadon.update = (hoadon, ma_hoa_don, callBack) => {
  const sqlString = "UPDATE hoadon SET ? WHERE ma_hoa_don = ?";
  db.query(sqlString, [hoadon, ma_hoa_don], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("Cập nhật hoadon ma_hoa_don = " + "ma_hoa_don" + " thành công");
  });
};
Hoadon.updateStatus = (ma_hoa_don, callBack) => {
  const sqlString = "UPDATE hoadon SET trangthai = 'Đã thanh toán' Where ma_hoa_don = ?";
  db.query(sqlString, [ma_hoa_don], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("Cập nhập trạng thái thành công");
  })
}
Hoadon.delete = (ma_hoa_don, callBack) => {
  db.query("DELETE FROM hoadon WHERE ma_hoa_don = ?", [ma_hoa_don], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("Xóa hoadon ma_hoa_don = " + "ma_hoa_don" + " thành công");
  });
};
Hoadon.getCountByMonth =(callBack) => {
  db.query(`SELECT COUNT(*) AS count FROM hoadon 
    WHERE MONTH(ngaytao) = MONTH(CURRENT_DATE()) AND YEAR(ngaytao) = YEAR(CURRENT_DATE())`,
    (err, res) => {
      if (err) {
        callBack(err);
        return;
      }
      callBack(null, res[0].count);
  });
};
Hoadon.getRevenueByMonth = (callBack) => {
  db.query(`SELECT SUM(ct.gia) as total FROM hoadon h
    LEFT JOIN chitiethoadon ct ON h.ma_hoa_don = ct.ma_hoa_don
    WHERE MONTH(h.ngaytao) = MONTH(CURRENT_DATE()) AND YEAR(h.ngaytao) = YEAR(CURRENT_DATE())`,
    (err, res) => {
      if(err) {
        callBack(err);
        return;
      }
      callBack(null, res[0].total || 0);
  });
};
Hoadon.getChartData = (filterType, startDate, endDate, callBack) => {
  const isQuarter = filterType === 'quy';
  const periodField = isQuarter ? 'QUARTER(h.ngaytao)' : 'MONTH(h.ngaytao)';

  let query = `SELECT 
                 ${periodField} as period,
                 SUM(ct.gia) as total 
               FROM hoadon h
               LEFT JOIN chitiethoadon ct ON h.ma_hoa_don = ct.ma_hoa_don 
               WHERE 1=1`;
  const params = [];
  if (filterType) {
    switch (filterType) {
      case 'tuan':
        query += ' AND h.ngaytao >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)';
        break;
      case 'thang':
        query += ' AND MONTH(h.ngaytao) = MONTH(CURRENT_DATE()) AND YEAR(h.ngaytao) = YEAR(CURRENT_DATE())';
        break;
      case 'quy':
        query += ' AND YEAR(h.ngaytao) = YEAR(CURRENT_DATE())';
        break;
      case 'nam':
        query += ' AND YEAR(h.ngaytao) = YEAR(CURRENT_DATE())';
        break;
      default:
        break;
    }
  }

  if (startDate && endDate) {
    query += ' AND h.ngaytao BETWEEN ? AND ?';
    params.push(startDate, endDate);
  }

  query += ` GROUP BY ${periodField} ORDER BY ${periodField}`;

  db.query(query, params, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }

    let labels;
    if (filterType === 'quy') {
      labels = res.map((row) => `Quý ${row.period}`);
    } else {
      labels = res.map((row) => `Tháng ${row.period}`);
    }
    const data = res.map((row) => row.total || 0);

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Doanh thu (VNĐ)',
          backgroundColor: '#6f42c1',
          data,
        },
      ],
    };
    callBack(null, chartData);
  });
};

module.exports = Hoadon;
