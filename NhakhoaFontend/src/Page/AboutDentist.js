import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'; // Import theme
import 'primereact/resources/primereact.min.css'; // Import PrimeReact CSS
import 'primeicons/primeicons.css'; // Import PrimeIcons CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Boostrap CSS
import { Container, Button, Image, Row, Col} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const img = (filename) => `/assets/${filename}`;
const certificates = [
    {
      title: "GIẤY CHỨNG NHẬN TỐT NGHIỆP ĐẠI HỌC Y HÀ NỘI VỚI NHỮNG CHƯƠNG TRÌNH ĐÀO TẠO CHUYÊN SÂU",
      description: [
        "Đào tạo toàn diện về lý thuyết và thực hành về cấy Ghép Implant.",
        "Tốt nghiệp chính quy khoa Răng – Hàm – Mặt đại học Y Hà Nội.",
        "Bác sĩ lâm sàng bệnh viện Việt Nam – Cuba tới năm 2018.",
        "Hoàn thành xuất sắc khóa học Cấy ghép Implant chuyên sâu.",
        "Hoàn thành khóa đào tạo nâng cao ứng dụng của kỹ thuật Implant All-on-4.",
      ],
      image: "/assets/BSCHUYEN_2.jpg",
    },
    {
      title: "CHỨNG CHỈ ĐÀO TẠO CHUYÊN SÂU VỀ IMPLANT CỦA NEO BIOTECH HÀN QUỐC",
      description: [],
      image: "/assets/BSCHUYEN_3.jpg",
    },
    {
      title: "CHỨNG CHỈ ĐÀO TẠO CHUYÊN SÂU VỀ PHỤC HÌNH THẨM MỸ RĂNG SỨ ĐƯỜNG ĐẠI 3M CỦA HOA KỲ",
      description: [],
      image: "/assets/BSCHUYEN_4.jpg",
    },
    {
        title: "HOÀN THÀNH XUẤT SẮC KHÓA HỌC IMPLANT NÂNG CAO CỦA HỌC VIỆN ĐÀO TẠO TRINON COLLEGIUM",
        description: [],
        image: "/assets/BSCHUYEN_5.jpg",
    },
  ];


function AboutDentist() {
    const navigate = useNavigate();
    return (
    <div className='w-100'>
      <Container fluid className="p-0">
        <div className='bg-success py-2 text-start ps-3'>
            <Button variant="light" className="border-0 rounded-circle shadow"
                onClick={() => navigate(-1)}
            >
                {"<"}
            </Button>
        </div>
        <Container className='text-success'>
            <p className='mt-2'>
                Bác sĩ Chuyên xin chào cô chú và các bạn, rất vui được gặp lại cô chú và các bạn trong bài viết này. Lời đầu tiên bác 
                sĩ xin gửi lời cảm ơn đến cô chú và các bạn đã dành sự quan tâm đến bác sĩ cũng như nha khoa Alisa. Để hiểu hơn về bác 
                sĩ Chuyên cùng tìm hiểu những thông tin dưới đây nhé!
            </p>
            <h3 className='bg-success text-white text-start p-2'>
                Câu chuyện về y đức của bác sĩ Chuyên
            </h3>
            <div className='row mt-2'>
                <div className='d-flex justify-content-center align-items-center'>
                    <Image 
                        src={img("BSCHUYEN_1.jpg")}
                        alt="Bác sĩ Lê Nho Chuyên"
                        className="mx-auto"
                        style={{
                            width: "804px",
                            height: "330px",
                            marginBottom: "10px",
                        }}
                    />
                </div>
                <p>
                    <strong>Bác sĩ Chuyên chia sẻ: </strong>“Để có những ca cấy ghép Implant thành công & mang đến nụ cười rạng rỡ cho các khách hàng, 
                    tôi luôn chủ động nâng cao y thuật của mình, thường xuyên tham gia đào tạo, cập nhật kiến thức liên tục trong và 
                    ngoài nước. Từ đó, mang lại cho khách hàng chất lượng tốt nhất với những chuẩn mực điều trị quốc tế”.
                </p>
            </div>
        </Container>
        <Container className="my-5 text-success">
            <h3 className='bg-success text-white text-start p-2 mb-3'>
                Chứng chỉ đào tạo của Bác sĩ Chuyên
            </h3>
            {certificates.map((cert, index) => (
                <Row key={index} className="mb-5 border-bottom pb-4">
                <Col md={6} className="d-flex flex-column justify-content-center">
                    <h5 className="text-uppercase fw-bold">{cert.title}</h5>
                    {cert.description.length > 0 && (
                    <ul className='text-start'>
                        {cert.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                        ))}
                    </ul>
                    )}
                </Col>
                <Col md={6} className="d-flex justify-content-center">
                    <Image src={cert.image} alt="lỗi ảnh" 
                        style={{
                            width: "292px",
                            height: "195px",
                            marginBottom: "10px",
                        }}
                    />
                </Col>
                </Row>
            ))}
        </Container>
        <Container className="my-5 text-success text-start">
            <h3 className='bg-success text-white text-start p-2 mb-3'>
                Khách hàng chia sẻ sau khi được bác sĩ Chuyên điều trị
            </h3>
            <p>
                Trồng răng Implant là phương pháp phục hồi răng đã mất được đánh giá hiệu quả hiện nay. 
                Phương pháp này có rất nhiều ưu điểm, một trong số đó phải kể đến là chức năng ăn nhai như 
                răng thật tuổi thọ lâu dài và tính thẩm mỹ cao.
            </p>
            <p>
                So với hai phương pháp truyền thống đó là làm cầu răng sứ và hàm răng giả tháo lắp. Phương pháp trồng 
                răng Implant vượt trội hơn, chính vì vậy cô chú và các bạn lựa chọn và tìm hiểu về phương pháp này là 
                phương án hiệu quả nhất để khắc phục răng đã mất.
            </p>
            <p>
            <strong>Lê Nho Chuyên:</strong>{" "}
                <a href="#" target="_blank" rel="noopener noreferrer">
                https://www.facebook.com/Dr.Chuyen.Alisa/
                </a>
            </p>
            <p>
                <strong>Địa chỉ:</strong> 33 Nguyễn Phong Sắc, Cầu Giấy, Hà Nội
            </p>
            <p>
                <strong>Hotline:</strong> 084.229.5777 – 091.206.1031
            </p>
        </Container>
      </Container>
    </div>
  );
}

export default AboutDentist;