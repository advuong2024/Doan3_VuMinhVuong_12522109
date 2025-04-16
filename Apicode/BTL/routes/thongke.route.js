var express = require('express');
var router = express.Router();
const thongkeController = require("../controllers/thongke.controller");

router.get('/hoadonCount', thongkeController.getCountByMonth);
router.get('/revenue', thongkeController.getRevenueByMonth);
router.get('/bookings', thongkeController.getBookingCount);
router.get('/chart', thongkeController.getChartData);
module.exports = router;