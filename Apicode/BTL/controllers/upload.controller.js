module.exports = {
    uploadImage: (req, res) => {
        try {
        if (!req.file) {
            return res.status(400).json({ error: 'Không có file nào được tải lên' });
        }
        // Tạo URL công khai
        const imageUrl = `/uploads/${req.file.filename}`;
        res.status(200).json({
            message: 'Upload ảnh thành công',
            url: imageUrl,
        });
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }
};