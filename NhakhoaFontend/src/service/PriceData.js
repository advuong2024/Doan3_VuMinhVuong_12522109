import React from 'react';
const img = (filename) => `/assets/${filename}`;

const articles = [
    {
        id: 1,
        title: "Chi phí trông răng Implant",
        description: "Trồng răng Implant là phương pháp phục hình răng đã mất an toàn và hiệu...",
        image: 'bg1.jpg',
        detail: (
            <div className="detail-section">
                <h1>Chi phí trồng răng Implant tại Nha khoa Alisa</h1>
                <p>Trồng răng Implant là phương pháp phục hình răng đã mất an toàn và hiệu quả nhất hiện nay. Tuy nhiên, chi phí trồng răng Implant chính là vấn đề mà rất nhiều người quan tâm như bạn. Trong bài viết này, <strong>Nha khoa Alisa</strong> sẽ cung cấp cho bạn những thông tin tổng quát về trồng răng Implant và chi phí trồng răng Implant tại Alisa. Tại đây, chúng tôi đã xây dựng bảng chi phí trồng răng Implant cho từng loại trụ Implant mà Alisa hiện đang là đối tác trực tiếp tại Việt Nam.</p>
                <div className="d-flex justify-content-center">
                    <img
                        className="w-50"
                        src={img('bg1.jpg')}
                        alt="Trồng răng Implant tại Nha khoa Alisa"
                    />
                </div>
                <p className="text-center"><em>Trồng răng Implant tại Nha khoa Alisa</em></p>

                <h2>Chi phí trồng răng Implant tại Alisa</h2>
                <p>Nha khoa Alisa tự hào là đối tác chiến lược của các thương hiệu trụ Implant hàng đầu như Biotem (Hàn Quốc), Hiossen (Mỹ) và Straumann (Thụy Sĩ). Dưới đây là bảng giá tham khảo cho dịch vụ trồng răng Implant tại Alisa:</p>
                <div className="d-flex justify-content-center">
                    <img
                        src={img('banggiaimplant-1.png')}
                        alt="Bảng giá trồng răng Implant tại Alisa"
                    />
                </div>
                <p className="text-center"><em>Bảng giá trồng răng Implant tại Nha khoa Alisa</em></p>
                <p><strong>Lưu ý:</strong> Chi phí trên là tham khảo và có thể thay đổi tùy theo tình trạng răng miệng của bệnh nhân. Vui lòng liên hệ Alisa để được tư vấn chi tiết và nhận ưu đãi đặc biệt.</p>
            </div>
        )
    },
    {
        id: 2,
        title: "Chi phí làm răng sứ thẩm mỹ nha khoa Alisa Cầu giấy Hà Nội",
        description: "Dân gian có câu "+"cái răng cái tóc là góc con người"+".Ngày này, răng...",
        image: 'bg2.jpg',
        detail: (
            <div className="detail-section">
                <h1>Chi phí làm răng sứ thẩm mỹ tại Nha khoa Alisa Cầu Giấy Hà Nội</h1>
                <p>Bọc răng sứ thẩm mỹ là phương pháp phục hình răng cho một hoặc nhiều răng bị hư hỏng, bị gãy, sứt mẻ, răng thiếu màu, nhiễm sản men răng. Răng sứ được thiết kế với màu sắc và hình dáng y như răng thật nên phương pháp này luôn được lựa chọn để đảm bảo yếu tố thẩm mỹ. Bọc răng sứ thẩm mỹ đang dần trở thành xu hướng làm đẹp.</p>
                <div className="d-flex justify-content-center">
                    <img
                        className="w-50"
                        src={img('bg2.jpg')}
                        alt="Bọc răng sứ thẩm mỹ tại Nha khoa Alisa"
                    />
                </div>
                <p className="text-center"><em>Bọc răng sứ thẩm mỹ tại Nha khoa Alisa</em></p>

                <h2>Chi phí làm răng sứ thẩm mỹ tại Nha khoa Alisa</h2>
                <p>Bảng giá bọc răng sứ tại Nha khoa Alisa cam kết là tốt nhất. Ngoài ra, chúng tôi có chính sách bảo hành rõ ràng, đảm bảo chất lượng và dịch vụ chăm sóc khách hàng nhiệt tình, tận tâm. Khách hàng có thể hoàn toàn yên tâm về việc bọc răng sứ an toàn và hiệu quả mà không cần lo lắng về chi phí.</p>
                <p>Dưới đây là bảng giá tham khảo cho dịch vụ bọc răng sứ thẩm mỹ tại Nha khoa Alisa:</p>
                <div className="d-flex justify-content-center">
                    <img
                        src={img('banggiarangsuthammy.jpg')}
                        alt="Bảng giá bọc răng sứ tại Nha khoa Alisa"
                    />
                </div>
                <p className="text-center"><em>Bảng giá bọc răng sứ tại Nha khoa Alisa</em></p>
                <p><strong>Lưu ý:</strong> Chi phí trên là tham khảo và có thể thay đổi tùy theo tình trạng răng miệng và số lượng răng cần phục hình. Vui lòng liên hệ Nha khoa Alisa để được thăm khám và tư vấn chi tiết.</p>
            </div>
        )
    },
    {
        id: 3,
        title: "Giá niềng răng tại nha khoa Alisa Cầu Giấy Hà Nội",
        description: "Giá niềng răng tại nha khoa Alisa Cầu Giấy Hà Nội...",
        image: 'niengrang2.png',
        detail: (
            <div className="detail-section">
                <h1>Giá niềng răng tại nha khoa Alisa Cầu Giấy Hà Nội</h1>
                <p>Niềng răng là phương pháp chỉnh nha sử dụng các khí cụ nha khoa như mắc cài, dây cung và khay niềng để tạo ra lực vừa đủ tác động lên răng, giúp răng dịch chuyển đến vị trí mong muốn, nhằm đạt được hàm răng đều, đẹp và thẳng hàng. Quá trình niềng răng thường kéo dài từ 18 đến 24 tháng, tùy thuộc vào phương pháp niềng, độ tuổi, tình trạng răng và quá trình chăm sóc của bệnh nhân.</p>
                <h2>Giá niềng răng tại Nha khoa Alisa</h2>
                <p>Theo khảo sát thị trường, bạn cần bỏ ra từ 20.000.000 đến 140.000.000 VNĐ để thực hiện niềng răng trên cả 2 hàm đối với các trường hợp răng thưa, răng hô, móm, răng mọc lệch, sai lệch khớp cắn… mà không cần thực hiện phẫu thuật. Giá niềng răng cũng phụ thuộc vào nhiều yếu tố như: phương pháp niềng răng, niềng răng 1 hay 2 hàm…</p>
                <p>Bạn có thể tham khảo bảng giá niềng răng bằng mắc cài tại Alisa dưới đây:</p>
                <div className="d-flex justify-content-center">
                    <img
                        src={img('banggiamaccai.png')}
                        alt="Bảng giá niềng răng tại Nha khoa Alisa"
                    />
                </div>
                <p className="text-center"><em>Bảng giá niềng răng tại Nha khoa Alisa</em></p>
                <p><strong>Lưu ý:</strong> Chi phí trên là tham khảo và có thể thay đổi tùy theo tình trạng răng miệng cụ thể. Vui lòng liên hệ Nha khoa Alisa để được thăm khám và báo giá chính xác.</p>

                <h2>Trang thiết bị hiện đại tại Alisa</h2>
                <p>Alisa luôn nâng cấp và sử dụng các trang thiết bị và máy móc hiện đại nhất để có thể tối ưu hiệu quả niềng răng đồng thời đảm bảo an toàn sức khỏe cho khách hàng. Mỗi dụng cụ, thiết bị khi sử dụng trong quá trình niềng răng đều đã được vệ sinh và khử trùng sạch sẽ.</p>
                <div className="d-flex justify-content-center">
                    <img
                        className="w-50"
                        src={img('invisalign3.jpg')}
                        alt="Trang thiết bị hiện đại tại Nha khoa Alisa"
                    />
                </div>
                <p className="text-center"><em>Trang thiết bị hiện đại tại Nha khoa Alisa</em></p>
                <p>Trên đây là bảng giá niềng răng tại Alisa. Alisa luôn cố gắng xây dựng các mức giá niềng răng hợp lý dựa trên mức thu nhập và chi phí sinh hoạt tại Hà Nội. Ngoài ra còn có hợp đồng cam kết rõ ràng và đặc biệt là không phát sinh bất cứ chi phí nào trong quá trình điều trị.</p>
            </div>
        )
    },
    {
        id: 4,
        title: "Bảng giá tẩy trắng răng Zom lazer",
        description: "Bảng giá tẩy răng của Nha Khoa Alisa Bảng giá Tẩy trắng răng Đơn...",
        image: 'lazer.jpg',
        detail: (
            <div className="detail-section">
                <h1>Bảng giá tẩy trắng răng Zoom Laser tại Nha khoa Alisa Cầu Giấy Hà Nội</h1>
                <p>Tẩy trắng răng mang lại lợi ích thẩm mỹ rất tốt. Nhờ có màu răng trắng sáng, đúng chuẩn thẩm mỹ mà nhiều người sẽ tự tin hơn rất nhiều sau khi thực hiện. Tuy nhiên, có nên tẩy trắng răng hay không vẫn là thắc mắc của rất nhiều người. Bởi trên thực tế có rất nhiều ý kiến trái chiều xung quanh phương pháp thẩm mỹ răng này. Không ít người cho rằng tẩy trắng răng sẽ làm mòn răng gây yếu răng.</p>
                <h2>Về tình trạng răng</h2>
                <p>Tình trạng răng nếu xỉn màu là do nhiễm màu ngoại lai như: Thường xuyên uống cà phê hoặc những thức uống có màu sậm, hút thuốc lá… hình thành các ngà răng và khiến răng sậm màu, vàng răng. Với tình trạng này, tẩy trắng răng sẽ mang lại hiệu quả rất tốt. Do đó, bạn nên thực hiện tẩy trắng răng để giúp răng trắng sáng hơn, tự tin hơn.</p>
                <p>Nếu tình trạng răng xỉn màu là do nhiễm màu nội sinh như: Răng chết tủy, nhiễm màu hóa chất, tuổi tác hoặc di truyền… Những trường hợp này khi tẩy trắng răng thì hiệu quả đạt được sẽ không cao. Do đó, bạn nên cân nhắc trước khi quyết định có nên tẩy trắng răng không.</p>
                <h2>Quy trình tẩy trắng răng Zoom Laser tại Nha khoa Alisa</h2>
                <p>Tại Nha khoa Alisa, quy trình tẩy trắng răng Zoom Laser được thực hiện bởi đội ngũ bác sĩ chuyên môn cao, sử dụng công nghệ hiện đại, đảm bảo an toàn và hiệu quả:</p>
                <ol>
                    <li><strong>Thăm khám và tư vấn:</strong> Bác sĩ kiểm tra tình trạng răng miệng, xác định mức độ xỉn màu và tư vấn phương pháp phù hợp.</li>
                    <li><strong>Vệ sinh răng miệng:</strong> Loại bỏ cao răng và mảng bám để thuốc tẩy trắng thẩm thấu tốt hơn.</li>
                    <li><strong>Bảo vệ nướu và môi:</strong> Sử dụng dụng cụ cách ly để bảo vệ mô mềm trước khi bôi thuốc tẩy trắng.</li>
                    <li><strong>Áp dụng thuốc tẩy và chiếu laser:</strong> Bôi gel tẩy trắng lên răng, sau đó chiếu ánh sáng Zoom Laser để kích hoạt thuốc, giúp loại bỏ vết ố vàng trong 45-60 phút.</li>
                    <li><strong>Hoàn thiện:</strong> Súc miệng, kiểm tra kết quả và hướng dẫn chăm sóc răng sau tẩy trắng.</li>
                </ol>
                <div className="d-flex justify-content-center">
                    <img
                        className="w-50"
                        src={img('qttaytrangrang.jpg')}
                        alt="Quy trình tẩy trắng răng Zoom Laser tại Nha khoa Alisa"
                    />
                </div>
                <p className="text-center"><em>Quy trình tẩy trắng răng Zoom Laser tại Nha khoa Alisa</em></p>

                <h2>Bảng giá tẩy trắng răng Zoom Laser tại Nha khoa Alisa</h2>
                <p>Nha khoa Alisa cam kết cung cấp dịch vụ tẩy trắng răng Zoom Laser với chi phí hợp lý, minh bạch, không phát sinh thêm trong quá trình điều trị. Dưới đây là bảng giá tham khảo:</p>       
                <div className="d-flex justify-content-center">
                    <img
                        src={img('giataytrangrang.png')}
                        alt="Bảng giá tẩy trắng răng Zoom Laser tại Nha khoa Alisa"
                    />
                </div>
                <p className="text-center"><em>Bảng giá tẩy trắng răng tại Nha khoa Alisa</em></p>
                <p><strong>Lưu ý:</strong> Chi phí trên là tham khảo và có thể thay đổi tùy theo tình trạng răng miệng cụ thể. Vui lòng liên hệ Nha khoa Alisa để được thăm khám và báo giá chính xác.</p>
            </div>
        )
    },
    {
        id: 5,
        title: "Bảng giá răng sứ thẩm mỹ mới nhất (2024)",
        description: "Cập nhập bảng giá bọc sứ trên thị trường, bảng giá bọc răng sứ tại...",
        image: 'bocrangsu.jpg',
        detail: (
            <div className="detail-section">
                <h1>Bảng giá răng sứ thẩm mỹ mới nhất 2024 tại Nha khoa Alisa</h1>
                <p>Bọc răng sứ thẩm mỹ là phương pháp phục hình răng hiện đại, giúp khắc phục các khuyết điểm như răng xỉn màu, sứt mẻ, thưa, hoặc không đều, mang lại nụ cười trắng sáng, tự nhiên. Tại Nha khoa Alisa, chúng tôi cam kết cung cấp dịch vụ bọc răng sứ với bảng giá tốt nhất trên thị trường, chính sách giá và bảo hành rõ ràng, cùng chất lượng chăm sóc khách hàng luôn được đặt lên hàng đầu. Khách hàng hoàn toàn yên tâm làm răng thẩm mỹ mà không phải lo lắng về vấn đề chi phí.</p>
                <h2>Bọc răng sứ thẩm mỹ tại Nha khoa Alisa</h2>
                <div className="d-flex justify-content-center">
                    <img
                        className="w-50"
                        src={img('brthammy.jpg')}
                        alt="Bọc răng sứ thẩm mỹ tại Nha khoa Alisa"
                    />
                </div>
                <p className="text-center"><em>Bọc răng sứ thẩm mỹ tại Nha khoa Alisa</em></p>
                <p>Bọc răng sứ tại Alisa được thực hiện bởi đội ngũ bác sĩ giàu kinh nghiệm, sử dụng vật liệu sứ chất lượng cao nhập khẩu từ Đức, Mỹ, và công nghệ CAD/CAM hiện đại. Quy trình bao gồm thăm khám, mài cùi răng, lấy dấu hàm, chế tác mão sứ, và gắn răng sứ, đảm bảo độ chính xác và thẩm mỹ tối ưu. Phương pháp này phù hợp với các trường hợp:</p>
                <ul>
                    <li>Răng ố vàng, xỉn màu không thể tẩy trắng.</li>
                    <li>Răng sứt mẻ, gãy vỡ, hoặc hình dáng không đều.</li>
                    <li>Răng thưa, hở kẽ, hoặc sai lệch nhẹ.</li>
                </ul>
                <p>Với chính sách bảo hành rõ ràng và không phát sinh chi phí, Alisa mang đến trải nghiệm an tâm cho khách hàng.</p>
                <h2>Bảng giá răng sứ thẩm mỹ tại Nha khoa Alisa</h2>
                <p>Dưới đây là bảng giá bọc răng sứ thẩm mỹ mới nhất 2024 tại Nha khoa Alisa, được xây dựng minh bạch và phù hợp với thu nhập của người dân Hà Nội:</p>
                <div className="d-flex justify-content-center">
                    <img
                        src={img('banggiarangsuthammymoi.jpg')}
                        alt="Bảng giá răng sứ thẩm mỹ tại Nha khoa Alisa"
                    />
                </div>
                <p className="text-center"><em>Bảng giá răng sứ thẩm mỹ tại Nha khoa Alisa</em></p>
                <p><strong>Lưu ý:</strong> Chi phí trên là tham khảo và có thể thay đổi tùy theo tình trạng răng miệng cụ thể. Vui lòng liên hệ Nha khoa Alisa để được thăm khám miễn phí và báo giá chính xác.</p>
            </div>
        )
    },
    {
        id: 6,
        title: "Bảng giá nhổ răng khôn của Nha Khoa Alisa",
        description: "Chi tiết bảng giá nhổ răng khôn tại nha khoa Alisa được nhiều cô chú...",
        image: 'bg3.jpg',
        detail: (
            <div className="detail-section">
                <h1>Bảng giá nhổ răng khôn mới nhất 2025 tại Nha khoa Alisa</h1>
                <p>Chi tiết bảng giá nhổ răng khôn tại Nha khoa Alisa được nhiều cô chú và các bạn tại Hà Nội quan tâm khi tìm hiểu về phương pháp này. Tại Nha khoa Alisa, chúng tôi đã cập nhật đầy đủ công nghệ nhổ răng hiện đại nhất hiện nay, như máy siêu âm Piezotome, đảm bảo quá trình nhổ răng an toàn, không đau và phục hồi nhanh. Quý khách hoàn toàn yên tâm tuyệt đối khi sử dụng dịch vụ.</p>
                <p>Các bạn xem bảng giá dưới đây, nếu có thắc mắc hoặc cần thêm thông tin, vui lòng liên hệ số <strong>Hotline: 0374.062.017</strong> để được tư vấn. Hoặc liên hệ qua các kênh thông tin chính thức của Nha khoa Alisa.</p>
                <div className="d-flex justify-content-center">
                    <img
                        className="w-50"
                        src={img('dv7.jpg')}
                        alt="Nhổ răng khôn tại Nha khoa Alisa"
                    />
                </div>
                <p className="text-center"><em>Nhổ răng khôn tại Nha khoa Alisa</em></p>
                <h2>Quy trình nhổ răng khôn tại Nha khoa Alisa</h2>
                <p>Nhổ răng khôn tại Nha khoa Alisa được thực hiện bởi đội ngũ bác sĩ tốt nghiệp Đại học Y Hà Nội, với quy trình chuẩn y khoa và công nghệ hiện đại. Các bước bao gồm:</p>
                <ul>
                    <li><strong>Thăm khám và chụp X-quang:</strong> Đánh giá vị trí, hướng mọc của răng khôn bằng máy chụp ConeBeam CT 3D.</li>
                    <li><strong>Gây tê cục bộ:</strong> Sử dụng thuốc tê an toàn, hạn chế đau đớn trong quá trình nhổ.</li>
                    <li><strong>Nhổ răng:</strong> Áp dụng kỹ thuật siêu âm Piezotome cho các trường hợp răng mọc lệch, mọc ngầm, đảm bảo ít xâm lấn, không tổn thương mô mềm.</li>
                    <li><strong>Chăm sóc sau nhổ:</strong> Hướng dẫn vệ sinh, kê thuốc giảm đau, kháng viêm và hẹn tái khám.</li>
                </ul>
                <p>Quy trình được thực hiện trong phòng vô trùng, với trang thiết bị hiện đại, giúp khách hàng an tâm và phục hồi nhanh chóng.</p>
                <h2>05 Tác hại của răng khôn đối với cơ thể</h2>
                <p>Răng khôn (răng số 8) thường gây nhiều vấn đề nếu không được xử lý kịp thời. Dưới đây là 05 tác hại phổ biến:</p>
                <ol>
                    <li><strong>Gây đau và viêm nhiễm:</strong> Răng khôn thường mọc không đúng hướng hoặc không đủ không gian để phát triển, gây ra đau và viêm nhiễm trong miệng.</li>
                    <li><strong>Gây sưng và ảnh hưởng tới ăn uống:</strong> Khi răng khôn mọc, nó có thể gây sưng và làm hạn chế khả năng ăn uống. Đau và khó chịu cũng khiến bệnh nhân mất cảm giác thèm ăn.</li>
                    <li><strong>Gây lệch khớp hàm:</strong> Răng khôn có thể ảnh hưởng đến khuôn mặt và lệch khớp hàm, dẫn đến khó khăn khi nhai thức ăn và đau đớn khi nói.</li>
                    <li><strong>Gây tổn thương cho răng khác:</strong> Răng khôn có thể đẩy các răng khác ra khỏi vị trí của chúng, gây ra các vấn đề về chức năng và vẻ ngoài. Khả năng bị xô hàm và tình trạng răng khấp khểnh là rất cao.</li>
                    <li><strong>Tạo điều kiện cho vi khuẩn gây nhiễm trùng:</strong> Khi răng khôn chưa mọc hoàn toàn, chúng tạo ra các khe hở giữa răng và lợi, tạo điều kiện thuận lợi cho vi khuẩn và sự nhiễm trùng.</li>
                </ol>
                <p>Chính vì vậy, bác sĩ tại Nha khoa Alisa luôn khuyên bạn nhổ răng khôn sớm để tránh những tác hại này.</p>
                <h2>Bảng giá nhổ răng khôn tại Nha khoa Alisa</h2>
                <p>Dưới đây là bảng giá nhổ răng khôn mới nhất 2025 tại Nha khoa Alisa, được xây dựng minh bạch và phù hợp với khách hàng tại Hà Nội:</p>
                <div className="d-flex justify-content-center">
                    <img
                        src={img('gianhorangkhon.png')}
                        alt="Bảng giá nhổ răng khôn tại Nha khoa Alisa"
                    />
                </div>
                <p className="text-center"><em>Bảng giá nhổ răng khôn tại Nha khoa Alisa – Liên hệ 0374.062.017</em></p>
                <p><strong>Lưu ý:</strong> Chi phí trên là tham khảo và có thể thay đổi tùy theo tình trạng răng miệng cụ thể. Vui lòng liên hệ <strong>Hotline: 0374.062.017</strong> để được thăm khám miễn phí và báo giá chính xác.</p>
                <h2>07 Lưu ý khi nhổ răng khôn</h2>
                <p>Nhổ răng khôn là một thủ tục phẫu thuật đơn giản, tuy nhiên cần tuân thủ một số lưu ý để đảm bảo quá trình phục hồi sau phẫu thuật nhổ răng thuận lợi. Sau đây là 07 lưu ý quan trọng:</p>
                <ol>
                    <li><strong>Chuẩn bị tinh thần:</strong> Nhổ răng khôn có thể gây đau đớn và khó chịu một chút trong quá trình phẫu thuật. Do đó, bạn cần chuẩn bị tinh thần trước khi thực hiện thủ tục này. Hãy ăn no và uống đủ nước trước khi phẫu thuật. Có thể nhờ người nhà đi cùng để cảm thấy an tâm hơn.</li>
                    <li><strong>Chọn phòng khám phẫu thuật uy tín:</strong> Bạn cần chọn một nơi phẫu thuật uy tín và có kinh nghiệm để đảm bảo an toàn và hiệu quả của quá trình phẫu thuật. Tìm hiểu về bác sĩ, khách hàng đã từng thực hiện. Thậm chí nên đến khám trước khi nhổ để kiểm tra độ uy tín của cơ sở khám chữa bệnh.</li>
                    <li><strong>Điều trị trước và sau phẫu thuật:</strong> Bạn nên tuân thủ các chỉ định điều trị của bác sĩ trước và sau phẫu thuật để giảm đau, sưng và nguy cơ nhiễm trùng.</li>
                    <li><strong>Nghỉ ngơi đầy đủ:</strong> Bạn cần nghỉ ngơi đầy đủ sau phẫu thuật và tránh các hoạt động mạnh để tránh gây ra chấn thương hoặc gây ra chảy máu. Đặc biệt sau phẫu thuật, không nên khạc nhổ nước bọt, ăn các đồ ăn cứng. Vì có thể làm cho vết thương bị ảnh hưởng.</li>
                    <li><strong>Kiểm tra định kỳ:</strong> Bạn cần đến thăm bác sĩ định kỳ để kiểm tra tiến trình hồi phục và đảm bảo răng khôn được loại bỏ hoàn toàn. Thông thường sau khoảng 1 tuần bạn nên tới để bác sĩ kiểm tra lại kết quả.</li>
                    <li><strong>Ăn uống hợp lý:</strong> Bạn cần tránh ăn uống đồ cứng và khó nhai trong vài ngày sau khi nhổ răng khôn để tránh gây đau và phù nề.</li>
                    <li><strong>Vệ sinh răng miệng:</strong> Bạn cần vệ sinh răng miệng thật kỹ càng sau khi nhổ răng khôn để giảm nguy cơ nhiễm trùng và đảm bảo sức khỏe răng miệng của bạn.</li>
                </ol>
                <p>Lưu ý rằng, đây chỉ là một số lưu ý chung khi nhổ răng khôn. Bạn cần thảo luận cụ thể với bác sĩ của mình để được tư vấn và hỗ trợ cụ thể cho trường hợp của mình.</p>
            </div>
        )
    },
    {
        id: 7,
        title: "Bảng giá trồng răng toàn hàm",
        description: "Hiện nay trên thị trường có nhiều mức giá trồng răng toàn hàm khác nhau...",
        image: 'anhdd5.jpg',
        detail: (
            <div className="detail-section">
                <h1>Bảng giá trồng răng toàn hàm mới nhất 2025 tại Nha khoa Alisa</h1>
                <p>Hiện nay trên thị trường có nhiều mức giá trồng răng toàn hàm khác nhau. Tại <strong>Nha khoa Alisa</strong>, chúng tôi đang có nhiều sản phẩm ưu đãi dành cho khách hàng, đảm bảo mang đến giải pháp phục hồi răng mất tối ưu với chi phí hợp lý. Quý khách vui lòng xem bảng giá trồng răng toàn hàm dưới đây để biết thêm chi tiết.</p>
                <p><strong>NHA KHOA ALISA</strong> là một trong những nha khoa hàng đầu về lĩnh vực khắc phục mất răng, đặc biệt là kỹ thuật trồng răng Implant và cấy ghép Implant toàn hàm (All on 4, All on 6…). Đến với Nha khoa Alisa, cô chú và các bạn sẽ được trải nghiệm quy trình trồng răng “<strong>an toàn - thẩm mỹ - không đau</strong>”:</p>
                <ul>
                    <li><strong>Yếu tố AN TOÀN</strong> được đặt lên hàng đầu, với quy trình vô trùng và công nghệ hiện đại.</li>
                    <li><strong>Yếu tố THẨM MỸ</strong> được chú trọng, để khách hàng có nụ cười tuyệt vời nhất.</li>
                    <li><strong>Yếu tố KHÔNG ĐAU</strong> là điều cần thiết, giúp khách hàng cảm thấy yên tâm trong suốt quá trình điều trị.</li>
                </ul>
                <p>Nếu có thắc mắc hoặc cần thêm thông tin, vui lòng liên hệ số <strong>Hotline: 0347.062.017</strong> để được tư vấn miễn phí.</p>
                <div className="d-flex justify-content-center">
                    <img
                        className="w-50"
                        src={img('anhdd3.jpg')}
                        alt="Trồng răng toàn hàm tại Nha khoa Alisa"
                    />
                </div>
                <p className="text-center"><em>Trồng răng toàn hàm tại Nha khoa Alisa</em></p>

                <h2>Quy trình cấy ghép Implant toàn hàm tại Nha khoa Alisa</h2>
                <p>Cấy ghép Implant toàn hàm (All on 4, All on 6) tại Nha khoa Alisa được thực hiện bởi đội ngũ bác sĩ tốt nghiệp Đại học Y Hà Nội, với công nghệ tiên tiến và trang thiết bị hiện đại. Quy trình bao gồm:</p>
                <ul>
                    <li><strong>Thăm khám và chụp phim CT 3D:</strong> Đánh giá tình trạng xương hàm bằng máy ConeBeam CT để lập kế hoạch điều trị chính xác.</li>
                    <li><strong>Gây tê và cấy trụ Implant:</strong> Sử dụng 4 hoặc 6 trụ Implant (tùy phương pháp All on 4 hoặc All on 6) để phục hình toàn hàm, đảm bảo không đau.</li>
                    <li><strong>Phục hình tạm thời:</strong> Lắp hàm tạm trong 2-5 ngày để đảm bảo thẩm mỹ và chức năng ăn nhai.</li>
                    <li><strong>Phục hình vĩnh viễn:</strong> Sau 3-6 tháng, khi trụ Implant tích hợp với xương hàm, gắn mão sứ vĩnh viễn (12-14 răng/hàm).</li>
                    <li><strong>Tái khám định kỳ:</strong> Kiểm tra và bảo hành để duy trì hiệu quả lâu dài.</li>
                </ul>
                <p>Quy trình được thực hiện trong phòng vô trùng, với các trụ Implant chính hãng từ Hàn Quốc, Mỹ, Thụy Sĩ, giúp khách hàng an tâm về chất lượng và độ bền.</p>
                <h2>Cấy ghép Implant All on 4 – All on 6</h2>
                <p><strong>Cấy ghép Implant All on 4</strong> là kỹ thuật trồng răng hiện đại giúp phục hồi chức năng ăn nhai và thẩm mỹ vô cùng hiệu quả cho người bị mất răng toàn hàm. Phương pháp này sử dụng 4 trụ Implant trên một hàm, gồm 2 trụ thẳng ở vị trí răng số 2 và 2 trụ nghiêng (góc tối đa 45 độ) ở vị trí răng số 5, để nâng đỡ 12 răng sứ. Đây là giải pháp tiết kiệm chi phí và thời gian so với cấy ghép Implant đơn lẻ.</p>
                <p><strong>Cấy ghép Implant All on 6</strong> sử dụng 6 trụ Implant để nâng đỡ 12-14 răng, phù hợp với trường hợp xương hàm yếu hơn hoặc cần độ vững chắc cao hơn. Phương pháp này mang lại khả năng ăn nhai vượt trội, gần giống răng thật, và ngăn ngừa tiêu xương hiệu quả.</p>
                <p>Cả hai kỹ thuật đều được thực hiện với công nghệ định vị hiện đại, đảm bảo độ chính xác và an toàn tuyệt đối.</p>

                <h2>Bảng giá trồng răng toàn hàm tại Nha khoa Alisa</h2>
                <p>Dưới đây là bảng giá trồng răng toàn hàm mới nhất 2024 tại Nha khoa Alisa, áp dụng cho các phương pháp All on 4 và All on 6, sử dụng trụ Implant Hàn Quốc (các dòng trụ Mỹ, Thụy Sĩ có mức giá chênh lệch tùy loại):</p>
                <div className="d-flex justify-content-center">
                    <img
                        src={img('toanham.jpg')}
                        alt="Bảng giá trồng răng toàn hàm tại Nha khoa Alisa"
                    />
                </div>
                <p><strong>Lưu ý:</strong> Chi phí trên là tham khảo và có thể thay đổi tùy theo tình trạng xương hàm, loại răng sứ, và chương trình ưu đãi. Vui lòng liên hệ <strong>Hotline: 0374.062.017</strong> để được thăm khám miễn phí, tư vấn phác đồ điều trị, và báo giá chính xác.</p>
            </div>
        )
    },
    {
        id: 8,
        title: "Bảng giá niềng răng trong suốt Invisalign",
        description: "Bảng giá niềng răng trong suốt Invisalign...",
        image: 'anhdd2.png',
        detail: (
            <div className="detail-section">
            </div>
        )
    },
    {
        id: 9,
        title: "Bảng giá niềng răng 5 Safe mắc cài",
        description: "Dưới đây là bảng giá niềng răng 5 Safe mắc cài tại Nha Khoa Alisa...",
        image: 'niengrang.jpg',
        detail: (
            <div className="detail-section">
            </div>
        )
    }
];

export default articles;