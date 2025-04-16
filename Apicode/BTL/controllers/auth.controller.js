const Bacsi = require("../models/bacsi.model");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "12345aA@";

exports.login = async (req, res) => {
    try {
        const { taikhoan, matkhau } = req.body;

        if (!taikhoan || !matkhau) {
            return res.status(400).json({ message: "Vui lòng nhập tài khoản và mật khẩu!" });
        }

        Bacsi.findByAccount(taikhoan, (err, bacsi) => {
            if (err) return res.status(500).json({ message: "Lỗi server!" });
            if (!bacsi) return res.status(401).json({ message: "Tài khoản không tồn tại!" });

            if (matkhau !== bacsi.matkhau) {
                return res.status(401).json({ message: "Mật khẩu không đúng!" });
            }

            // Tạo token
            const token = jwt.sign({ id_bacsi: bacsi.id_bacsi, taikhoan: bacsi.taikhoan }, SECRET_KEY, { expiresIn: "10h" });

            res.json({
                message: "Đăng nhập thành công!",
                token,
                bacsi: {
                    id_bacsi: bacsi.id_bacsi,
                    taikhoan: bacsi.taikhoan,
                    hoten: bacsi.hoten,
                    email: bacsi.email
                }
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server!" });
    }
};

