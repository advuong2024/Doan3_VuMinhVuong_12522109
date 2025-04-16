import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'; // Import theme
import 'primereact/resources/primereact.min.css'; // Import PrimeReact CSS
import 'primeicons/primeicons.css'; // Import PrimeIcons CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Boostrap CSS
import { Container} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const img = (filename) => `/assets/${filename}`;

function AboutPage() {
  const navigate = useNavigate();
  return (
    <div classname='w-100'>
      <Container>
        <div className="mb-3 p-3">
          <h2 className="text-success">Địa chỉ nha khoa an toàn khu vực Hà Nội hiện nay</h2>
        </div>
        <div className='text-success'>
          <h4 className='text-start'>GIỚI THIỆU VỀ ALISA</h4>
          <div className='row d-flex flex-column flex-md-row'>
            <div className='p-3 text-start col-12 col-md-6 justify-content-center'>
              <p>
                Được thành lập từ năm 2016, Alisa tự hào là một trong những nha khoa tại Việt 
                Nam đi đầu trong việc ứng dụng công nghệ hiện đại vào phương pháp trồng răng 
                Implant – Thẩm mỹ răng sứ – Chỉnh nha và điều trị các bệnh lý răng miệng.
              </p>
              <p>
                Đối với khách hàng, nha khoa Alisa là điểm đến đáp ứng <strong>Art-Light-Safe 
                (Nghệ thuật - Nhẹ nhàng - An toàn )</strong>. Đội ngũ y bác sĩ Alisa tốt nghiệp 
                Đại học Y Hà nội chúng tôi đã điều trị thành công cho hơn 10.000 khách hàng.
              </p>
            </div>
            <div className='col-12 col-md-6 d-flex justify-content-center'>
              <img src={img("tt1.jpg")} alt='lỗi ảnh'
                className="mx-auto d-block" 
                style={{
                  width: "400px",
                  height: "230px",
                  marginBottom: "10px",
                }}
              />
            </div>
          </div>
        </div>
        <div className='text-success'>
          <h4>SỨ MỆNH</h4>
          <p>
            <strong>"Lương y như từ mẫu"</strong>- Phẩm chất cao quý của người thầy thuốc theo 
            lời Bác dạy. Nên ngay từ khâu tuyển chọn đàu vào, chúng tôi luôn đặt <strong>Y Đức </strong>
            của người bác sĩ lên hàng đầu. Và không ngừng rèn luyện, chỉ bảo để toàn bộ công ty thấm nhuần tư tưởng Bác dạy.
          </p>
          <img src={img("tt2.jpg")} alt='Lỗi ảnh'
            style={{
              width: "100%",
              maxWidth: "800px",
              height: "auto",
              marginBottom: "10px",
            }} 
          />
        </div>
        <div className='text-success'>
          <h4 className='text-end me-5'>GIÁ TRỊ CỐT LÕI</h4>
          <div className="row d-flex flex-column flex-md-row">
            {/* Cột bên trái */}
            <div className="col-12 col-md-6 d-flex flex-column align-items-center">
              <img
                src={img("tt3.jpg")}
                alt="lỗi ảnh"
                className="img-fluid"
                style={{ maxWidth: "390px", height: "auto", marginBottom: "10px" }}
              />
              <img
                src={img("tt4.jpg")}
                alt="lỗi ảnh"
                className="img-fluid"
                style={{ maxWidth: "390px", height: "auto", marginBottom: "10px" }}
              />
              <p className="fw-bold mt-2 text-center">
                Bác sĩ Lê Nhọ Chuyên - Cùng VTV2 tìm hiểu về trồng răng implant tức thì
              </p>
            </div>

            {/* Cột bên phải */}
            <div className="col-12 col-md-6 d-flex flex-column align-items-center">
              <p className="text-start w-100 px-3">
                <strong>"Y đức của người thầy thuốc là không ngừng nâng cao y thuật".</strong>
                Để có những ca điều trị thành công & mang đến nụ cười hạnh phúc cho khách hàng, đội ngũ chuyên môn của nha khoa Alisa phải luôn chủ động nâng cao y thuật của mình.
              </p>
              <p className="text-start w-100 px-3">
                Thường xuyên tham gia đào tạo cập nhật kiến thức liên tục trong và ngoài nước. Từ đó mang lại kết quả điều trị tân tiến nhất, tốt nhất với những chuẩn mực điều trị quốc tế.
              </p>
              <img
                src={img("tt5.jpg")}
                alt="lỗi ảnh"
                className="img-fluid"
                style={{ maxWidth: "378px", height: "auto", marginBottom: "10px" }}
              />
            </div>
          </div>
        </div>
        <div className='text-start'>
          <h4 className='text-white bg-success text-start p-2'>Áp dụng quy chuẩn 5 safe</h4>
          <p className='mt-2 text-success'>
            Nha khoa Alisa thấu hiểu được những câu chuyện của cô chú và các bạn khi tìm hiểu về phương pháp trồng răng Implant. Vấn đề “đau” là vấn đề được quan tâm nhiều nhất.
          </p>
          <p className='mt-2 text-success'>
            Nha khoa Alisa ứng dụng quy chuẩn 5 Safe trong quá trình thăm khám và điều trị cho bệnh nhân với các tiêu chí sau:
          </p>
          <p><i>
            + Đội ngũ bác sĩ nha khoa giàu kinh nghiệm. 100% tốt nghiệp Đại Học Y Hà Nội về chuyên khoa Răng – Hàm – Mặt. Đã giúp đỡ rất nhiều khách hàng tìm lại nụ cười tự tin của mình.
          </i></p>
          <p><i>
            + Trang thiết bị phòng nha hiện đại, tiên tiến, đảm bảo được tính chính xác khi thực hiện các thao tác kỹ thuật. Đặc biệt đảm bảo vô trùng tuyệt đối.
          </i></p>
          <p><i>
            + Có phòng thủ thuật được vô trùng tuyệt đối, các thiết bị, dụng cụ y tế đều được khử trùng trước khi sử dụng. Nhờ đó không gây biến chứng, không gây viêm nhiễm.
          </i></p>
          <p><i>
            + Vật liệu điều trị đều là hàng chính hãng, đạt chuẩn. Đảm bảo chất lượng, đồ bền cao, không gây kích ứng trong quá trình sử dụng.
          </i></p>
          <p><i>
            + Có chi phí thực hiện được đánh giá là hợp lý. Cô chú và các bạn có nhiều lựa chọn tùy theo khả năng tài chính của mình.
          </i></p>
        </div>
        <div className='mt-2 text-start text-success'>
          <p>
            Nha khoa Alisa kính chúc Quý khách hàng, cô chú và các bạn sức khỏe, hạnh phúc. Để biết thêm thông tin chi tiết về từng dịch vụ tại nha khoa bạn có thể xem thêm 
            tại bài viết: Nha khoa Alisa – Địa chỉ nha khoa Hà Nội an toàn, chất lượng hiện nay.
          </p>
          <p>
            <strong>Xem thêm: </strong>
            <span 
              onClick={() => navigate("/AboutDentist")} 
              style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
            >
              Giới thiệu về bác sĩ Lê Nho Chuyên
            </span>
          </p>
        </div>
      </Container>
    </div>
  );
}

export default AboutPage;