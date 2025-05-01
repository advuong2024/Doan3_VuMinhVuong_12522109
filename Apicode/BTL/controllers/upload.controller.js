module.exports = {
    uploadImage: (req, res) => {
        try {
            if (!req.file) {
                return  res.status(400).json({ error: "Không có file nào được tải lên"});
            }
            res.status(200).json({
                message: "Upload ảnh thành công",
                filePath: req.file.path,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};