import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'; // Import theme
import 'primereact/resources/primereact.min.css'; // Import PrimeReact CSS
import 'primeicons/primeicons.css'; // Import PrimeIcons CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Boostrap CSS
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const img = (filename) => `/assets/${filename}`;
const features = [
  {
    image: "/assets/webicon5.png",
    title: "AN TOÀN NHẤT",
    description:
      "Đội ngũ bác sĩ tốt nghiệp chuyên khoa Răng – Hàm – Mặt tại Trường Đại Học Y Hà Nội, đều trên 5.000h thực hành.",
  },
  {
    image: "/assets/webicon6.png",
    title: "TIẾT KIỆM NHẤT",
    description:
      "Chúng tôi luôn nghiên cứu để cho chi phí luôn tối ưu nhất, bình ổn giá và có hợp đồng rõ ràng minh bạch.",
  },
  {
    image: "/assets/webicon7.png",
    title: "KHÔNG ĐAU RĂNG",
    description:
      "Công nghệ hiện đại như CT ConeBeam 3D, Scan 3D,… hỗ trợ giúp bác sĩ thực hiện nhanh chóng. Hạn chế đau – ê buốt.",
  },
  {
    image: "/assets/webicon8.png",
    title: "LƯƠNG Y NHƯ TỪ MẪU",
    description:
      "Phẩm chất cao quý của Thầy thuốc theo tư tưởng Hồ Chí Minh – Kim chỉ nam của Alisa",
    button: "ĐẶT LỊCH NGAY",
  },
];
const services = [
  {
    img: "/assets/dv1.jpg",
    alt: "niềng răng mắc cài 5 safe",
    name: "NIỀNG RĂNG MẮC CÀI 5 SAFE",
    description: "Niềng răng mắc cài 5 Safe là phương pháp sử dụng mắc cài, dây cung tác động lực lên răng giúp dịch chuyển răng về vị trí khớp cắn chuẩn."
  },
  {
    img: "/assets/dv2.jpg",
    alt: "niềng răng trong suốt",
    name: "NIỀNG RĂNG TRONG SUỐT",
    description: "Niềng răng trong suốt sử dụng khay niềng được thiết kế riêng biệt cho mỗi người, dễ dàng điều chỉnh răng về đúng vị trí."
  },
  {
    img: "/assets/dv3.jpg",
    alt: "cấy ghép răng Implant",
    name: "CẤY GHÉP RĂNG IMPLANT",
    description: "Cấy ghép răng implant là giải pháp phục hình răng mất bao gồm thân răng sứ và trụ chân răng, đảm bảo chức năng và thẩm mỹ cao."
  },
  {
    img: "/assets/dv4.jpg",
    alt: "cấy ghép toàn hàm",
    name: "CẤY GHÉP TOÀN HÀM",
    description: "Cấy ghép toàn hàm giúp phục hồi chức năng ăn nhai và thẩm mỹ cho bệnh nhân mất răng toàn hàm."
  },
  {
    img: "/assets/dv5.jpg",
    alt: "tẩy trắng răng zoom laser",
    name: "TẨY TRẮNG RĂNG ZOOM LASER",
    description: "Công nghệ tẩy trắng răng hiện đại giúp làm sáng răng nhanh chóng mà không gây ê buốt."
  },
  {
    img: "/assets/dv6.jpg",
    alt: "dán răng sứ veneer",
    name: "DÁN RĂNG SỨ VENEER",
    description: "Dán răng sứ Veneer giúp cải thiện thẩm mỹ nụ cười với lớp sứ siêu mỏng, bảo tồn răng thật tối đa."
  },
  {
    img: "/assets/dv7.jpg",
    alt: "nhổ răng khôn không đau",
    name: "NHỔ RĂNG KHÔN KHÔNG ĐAU",
    description: "Dịch vụ nhổ răng khôn an toàn, nhẹ nhàng, không đau, hạn chế tối đa sưng viêm."
  },
  {
    img: "/assets/dv8.jpg",
    alt: "nha khoa trẻ em",
    name: "NHA KHOA TRẺ EM",
    description: "Dịch vụ nha khoa chuyên biệt dành cho trẻ em, giúp bảo vệ sức khỏe răng miệng từ sớm."
  }
];

const customers = [
  {
    name: "Lê Thắng",
    age: 22,
    review:
      "Niềng răng đúng là tay đổi toàn bộ cuộc sống của mình luôn. Từ một người nhút nhát và tự ti về ngoại"+
      " hình, nhờ Alisa update mà mình đã tự tin hơn rất nhiều! Nếu có điều kiện thì bạn lên niềng sớm nhé!",
    condition: "Răng khấp khểnh nặng",
    service: "Niềng răng",
    profileImg: "/assets/Thang.jpg",
    afterImg: "/assets/Thang2.jpg",
  },
  {
    name: "Ly Ly",
    age: 22,
    review:
      "Đến nha khoa thì cực kỳ hài lòng ở dịch vụ và cách làm việc của các bạn. Toàn người giỏi "+
      "lại nhiệt tình. Mình sẽ cùng gia đình tới chăm sóc răng miệng thường xuyên ở đây.",
    condition: "răng nhỏ và ố vàng.",
    service: "Dán sứ veneer thẩm mỹ - 6 tháng.",
    profileImg: "/assets/LyLy.jpg",
    afterImg: "/assets/LyLy2.jpg",
  },
  {
    name: "Chú Trần Hiệp",
    age: 67,
    review:
      "Chú cảm thấy bác sĩ, nhân viên, lễ tân rất nhiệt tình, tận tâm với khách hàng. "+
      "Tôi cảm thấy HÀI LÒNG!",
    condition: "Nha chu nặng, mất nhiều răng 2 hàm.",
    service: "Cấy ghép răng Allon4 - 2 hàm.",
    profileImg: "/assets/cHiep.jpg",
    afterImg: "/assets/cHiep2.jpg",
  },
  {
    name: "Chú Nguyễn Quang Tự",
    age: 53,
    review:
      "Sau khi phẫu thuật xong, cảm giác của chú gần như không thấy đau gì cả, bác sĩ thực "+
      "hiện rất nhẹ nhàng.",
    condition: "Mất răng toàn hàm dưới.",
    service: "Cấy ghép răng All-on-4 hàm dưới.",
    profileImg: "/assets/chuTu.jpg",
    afterImg: "/assets/chuTu2.jpg",
  },
  {
    name: "Ngọc Hà",
    age: 24,
    review:
      "Là người mẫu ảnh nổi tiếng tại Hà Nội, mình đã lựa chọn niềng răng tại Alisa và cảm thấy rất "+
      "hài lòng vì chất lượng ở đây. Trình độ bác sĩ, công nghệ, trang thiết bị hiện đại nhưng giá thành "+
      "lại vô cùng hợp lí.",
    condition: "Răng khấp khểnh, khớp cắn lệch.",
    service: "Niềng răng mắc cài Kim loại Thông minh.",
    profileImg: "/assets/NHa.jpg",
    afterImg: "/assets/NHa2.jpg",
  },
  {
    name: "Cô Đỗ Thị Loan",
    age: 70,
    review:
      "Cô rất vui vì ở nha khoa nhiệt tình với cô lắm, bác sĩ nhiệt tình hết ý. Làm răng xong cô đã có "+
      "thể đi hát thành ca mà không có một vấn đề gì cả.",
    condition: "Mất gần hết răng ở hàm trên.",
    service: "Làm hàm tháo lắp.",
    profileImg: "/assets/CoLoan.jpg",
    afterImg: "/assets/CoLoan2.png",
  },
  {
    name: "VĐV Wushu Đặng Tiểu Bình",
    age: 25,
    review:
      "Hành trình niềng răng tại Alisa cũng là khoảng thời gian mình đạt được nhiều thành tựu trong sự "+
      "nghiệp của mình. Từ vận động viên Wushu mình lấn sân sang cả MC nhờ update ngoại hình CHẤT LƯỢNG "+
      "sau khi niềng răng tại Alisa. Tuyệt vời Alisa.",
    condition: "Răng thưa, khấp khểnh và ố vàng.",
    service: "Niềng răng + Tẩy trắng răng.",
    profileImg: "/assets/DBinh.jpg",
    afterImg: "/assets/DBinh2.jpg",
  },
  {
    name: "Bùi Ngọc Tuấn",
    age: 40,
    review:
      "Cảm ơn Alisa đã đem lại cho mình một hàm răng mới. Mất răng từ năm 30 tuổi do tiểu đường, mình đi"+
      " tìm hiểu nhiều nah khoa không bên nào nhận. Cuối cùng nha khoa Alisa như một vị cứu tinh để mình tìm lại "+
      "cảm giác ăn uống.",
    condition: "Mất toàn bộ răng 2 hàm do tiểu đường.",
    service: "Trông răng toàn hàm kỹ thuật All on 4.",
    profileImg: "/assets/cTuan.jpg",
    afterImg: "/assets/cTuan2.jpg",
  },
];

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className='w-100'>
      <div className="container mt-3 mb-3">
        <div className="row">
          {features.map((feature, index) => (
            <div key={index} className="col-md-3 d-flex mb-2">
              <div className="card p-4 w-100 h-100 bg-custom" style={{ border: "none" }}>
                <img
                  src={feature.image}
                  alt={feature.title}
                  style={{
                    width: "105px",
                    height: "105px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.2)",
                    padding: "15px",
                    marginBottom: "10px",
                  }}
                />
                <h5 className="text-white text-start">{feature.title}</h5>
                <p className="text-white text-start">{feature.description}</p>
                {feature.button && (
                  <button 
                    onClick={() => navigate("/Contact")} 
                    className="btn btn-success mt-auto border border-light text-light fw-bold">{feature.button}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='container mt-3 mb-3 text-success'>
        <h3 >GIÁO SƯ TIẾN SỸ TIN TƯỞNG</h3>
        <p>Nha khoa Alisa tự hào là địa điểm được rất nhiều giáo sư, tiến sĩ hàng đầu Việt Nam tin tưởng lựa chọn khi sử dụng các dịch vụ nha khoa.</p>
        <div className='row d-flex flex-column flex-md-row'>
          <div className='col-12 col-md-3 d-flex justify-content-center'>
            <div className="card p-4 text-center" style={{ border: "none" }}>
              <img src={img("TSSy.jpg")} alt='lỗi ảnh'
                className="mx-auto d-block" 
                style={{
                  width: "258px",
                  height: "300px",
                  marginBottom: "10px",
                }}
              />
              <h5 className='text-success'>PGS.TS Dương Tiến Sỹ</h5>
              <p className='text-success'>“Nha khoa Alisa là địa điểm tôi tin tưởng lựa chọn khi có vấn đề răng miệng”</p>
            </div>
          </div>
          <div className='col-12 col-md-3 d-flex justify-content-center'>
            <div className="card p-4 text-center" style={{ border: "none" }}>
              <img src={img("TSHoe.jpg")} alt='lỗi ảnh'
                className="mx-auto d-block"
                style={{
                  width: "258px",
                  height: "300px",
                  marginBottom: "10px",
                }}
              />
              <h5 className='text-success'>PGS.TS Vũ Đình Hòe</h5>
              <p className='text-success'>“Tôi đã trồng răng implant ở đây và thật tuyệt vời vì ăn nhai khá tốt”</p>
            </div>
          </div>
          <div className='col-12 col-md-3 d-flex justify-content-center'>
            <div className="card p-4 text-center" style={{ border: "none" }}>
              <img src={img("TSThai.jpg")} alt='lỗi ảnh' 
                className="mx-auto d-block"
                style={{
                  width: "258px",
                  height: "300px",
                  marginBottom: "10px",
                }}
              />
              <h5 className='text-success'>PGS.TS Đinh Hồng Thái</h5>
              <p className='text-success'>“Chất lượng phù hợp mức giá, đội ngũ bác sĩ giỏi”</p>
            </div>
          </div>
          <div className='col-12 col-md-3 d-flex justify-content-center'>
            <div className="card p-4 text-center" style={{ border: "none" }}>
              <img src={img("TSHung.jpg")} alt='lỗi ảnh' 
                className="mx-auto d-block"
                style={{
                  width: "258px",
                  height: "300px",
                  marginBottom: "10px",
                }}
              />
              <h5 className='text-success'>PGS.TS Đinh Thế Hùng</h5>
              <p className='text-success'>“Dịch vụ nha khoa Alisa thật uy tín, bác sĩ chất lượng”</p>
            </div>
          </div>
        </div>
      </div>
      <div className='container mt-3 text-success pb-3'>
        <h3>DỊCH VỤ NỔI BẬT TẠI ALISA DENTAL</h3>
        <p className='mb-2'>Nha khoa Alisa hiện có đa dạng các dịch vụ nha khoa đáp ứng nhu cầu chăm sóc sức khỏe răng miệng của mọi đối tượng khách hàng.</p>
        <hr className="border-success"/>
        <div className='row'>
          {services.map((service, index) => (
            <div key={index} className='col-md-3 col-sm-6 mb-4'>
              <div className="service-card position-relative text-center">
                <img src={service.img} alt={service.alt} className="img-fluid" />
                <div className="service-overlay position-absolute d-flex align-items-center justify-content-center">
                  <p className="text-light text-center px-3 fw-bold">{service.description}</p>
                </div>
                <div className="service-title p-2 bg-success text-light fw-bold">{service.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='container mt-3 text-success pb-3'>
        <h3>MỘT SỐ ĐỐI TÁC QUAN TRỌNG</h3>
        <p>Nha khoa Alisa hiện có đa dạng các dịch vụ nha khoa đáp ứng nhu cầu chăm sóc sức khỏe răng miệng của mọi đối tượng khách hàng.</p>
        <hr className="border-success"/>
        <div className='row d-flex flex-column flex-md-row'>
          <div className='col-12 col-md-4 d-flex justify-content-center'>
            <div className="card p-4" style={{ border: "none" }}>
              <img src={img("dt1.jpg")} alt='lỗi ảnh'
                className="mx-auto d-block" 
                style={{
                  width: "368px",
                  height: "220px",
                  marginBottom: "10px",
                }}
              />
              <h5 className='text-success'>Tọa đàm cùng Sensodyne</h5>
              <p className='text-success'>
                <i className='fw-bold'>Sensodyne</i> là thương hiệu hàng đầu thế giới về kem đánh răng và nước súc miệng dành cho 
                người dùng có răng nhạy cảm, thành lập <i className='fw-bold'>năm 1961</i></p>
            </div>
          </div>
          <div className='col-12 col-md-4 d-flex justify-content-center'>
            <div className="card p-4" style={{ border: "none" }}>
              <img src={img("dt2.jpg")} alt='lỗi ảnh' 
                className="mx-auto d-block"
                style={{
                  width: "368px",
                  height: "220px",
                  marginBottom: "10px",
                }}
              />
              <h5 className='text-success'>Hợp tác chiến lượt Hiossen - Hoa Kỳ</h5>
              <p className='text-success'>
                <i className='fw-bold'>Hiossen </i> à thương hiệu Implant xuất xứ từ Hoa Kỳ và có hệ thống phân phối trên toàn cầu. Là 
                <i className='fw-bold'> 01 trong 5 </i>tập đoàn Implant hàng đầu thế giới.</p>
            </div>
          </div>
          <div className='col-12 col-md-4 d-flex justify-content-center'>
            <div className="card p-4" style={{ border: "none" }}>
              <img src={img("dt3.jpg")} alt='lỗi ảnh' 
                className="mx-auto d-block"
                style={{
                  width: "368px",
                  height: "220px",
                  marginBottom: "10px",
                }}
              />
              <h5 className='text-success'>Chuyển giao công nghệ Biotem</h5>
              <p className='text-success'>
                <i className='fw-bold'>Biotem</i> là thương hiệu Implant đến từ Hàn Quốc, thuộc tập đoàn Biotem thành lập <i className='fw-bold'>năm 2012</i></p>
            </div>
          </div>
          <div className='col-12 col-md-4 d-flex justify-content-center'>    
            <div className="card p-4" style={{ border: "none" }}>
              <img src={img("dt4.jpg")} alt='lỗi ảnh' 
                className="mx-auto d-block"
                style={{
                  width: "368px",
                  height: "220px",
                  marginBottom: "10px",
                }}
              />
              <h5 className='text-success'>VTV2 Phỏng vấn bác sĩ Alisa</h5>
              <p className='text-success'>
                VTV2 - Bác sĩ chuyên tìm hiều về trồng răng Implant tức thì</p>
            </div>
          </div>
          <div className='col-12 col-md-4 d-flex justify-content-center'>
            <div className="card p-4" style={{ border: "none" }}>
              <img src={img("dt5.jpg")} alt='lỗi ảnh'
                className="mx-auto d-block" 
                style={{
                  width: "368px",
                  height: "220px",
                  marginBottom: "10px",
                }}
              />
              <h5 className='text-success'>Cùng VTV6 - Phỏng vấn tẩy trắng răng</h5>
              <p className='text-success'>
                VTVT6 - Alisadental tìm hiểu về công nghệ tẩy trắng răng mới nhất hiện nay</p>
            </div>
          </div>
          <div className='col-12 col-md-4 d-flex justify-content-center'>
            <div className="card p-4" style={{ border: "none" }}>
              <img src={img("dt6.jpg")} alt='lỗi ảnh'
                className="mx-auto d-block" 
                style={{
                  width: "368px",
                  height: "220px",
                  marginBottom: "10px",
                }}
              />
              <h5 className='text-success'>VTV - Công nghệ niềng răng Alisa</h5>
              <p className='text-success'>
              Niềng răng 5 Safe - Niềng răng an toàn đọc quyền tại Alisa | VTV Nào cùng phong cách</p>
            </div>
          </div>
        </div>
      </div>
      <div className='container text-light bg-custom p-4 mb-2'>
        <h3>TRẢI NHIỆM CỦA KHÁCH HÀNG THỰC TẾ</h3>
        <hr className="border-light"/>
        <Container>
          <Carousel interval={4000}>
            {customers.map((customer, index) => (
              <Carousel.Item key={index}>
                <Row className="align-items-center p-5">
                  <Col md={5} className="text-center">
                    <img
                      src={customer.profileImg}
                      alt={customer.name}
                      className="rounded-circle"
                      style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                    <h5 className="mt-3">{customer.name} ({customer.age} tuổi)</h5>
                    <blockquote>“{customer.review}”</blockquote>
                    <hr className="border-light"/>
                    <h5>Thông tin khách hàng</h5>
                    <p><strong>Tình trạng răng:</strong> {customer.condition}</p>
                    <p><strong>Dịch vụ sử dụng:</strong> {customer.service}</p>
                  </Col>
                  <Col md={7} className="text-center">
                    <img
                      src={customer.afterImg}
                      alt="After Treatment"
                      className="w-100"
                      style={{ borderRadius: "10px" }}
                    />
                  </Col>
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </div>
    </div>
  );
}

export default HomePage;