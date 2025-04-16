const Hoadon = require("../models/hoadon.model");
const Datlich = require("../models/datlich.model")
module.exports = {
    getCountByMonth: (req, res) => {
        Hoadon.getCountByMonth((err, count) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.json({ hoadonCount: count});
        });
    },
    getRevenueByMonth: (req, res) => {
        Hoadon.getRevenueByMonth((err, revenue) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.json({ revenue });
        });
    },
    getBookingCount: (req, res) => {
        Datlich.getBookingCount((err, count) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.json({ bookingCount: count });
        });
    },
    getChartData: (req, res) => {
        const { filterType, startDate, endDate } = req.query;
        Hoadon.getChartData(filterType, startDate, endDate, (err, chartData) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.json(chartData);
        });
    },
};
