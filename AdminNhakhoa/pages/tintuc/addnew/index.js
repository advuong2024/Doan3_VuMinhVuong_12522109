import { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { useRouter } from "next/router";
import { Toast } from 'primereact/toast';
// import axios from "axios";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const QuillToolbar = dynamic(() => import("../../../demo/components/EditorToolbar"), { ssr: false });
import { modules, formats } from "../../../demo/components/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.module.css";
import { NewService } from "../../../demo/service/NewService";
import { BacsiService } from "../../../demo/service/BacsiService";

const PostForm = () => {
  const emptyPost = {
    tintuc_id: "",
    tieu_de: "",
    noi_dung: "",
    ngay_dang: new Date().toISOString().split('T')[0],
    tac_gia: "",
    anh_tin_tuc: "",
    loai_tin: "",
    trang_thai: "Nháp",
  };
  const router = useRouter();
  const { id } = router.query;
  const [bacsi, setBacsi] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const quillRef = useRef(null);
  const [post, setPost] = useState(emptyPost);
  const categories = [
    { label: "Dịch vụ", value: "Dịch vụ" },
    { label: "Giá dich vụ", value: "Giá dịch vụ" },
  ];

  const statuses = [
    { label: "Nháp", value: "Nháp" },
    { label: "Công khai", value: "Công khai" },
    { label: "Đã xóa", value: "Đã xóa" },
  ];

  useEffect(() => {
    setIsClient(true); // Đánh dấu là client-side
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (id) {
      NewService.gettintucbyid(id).then((data) => {
        if (data) {
          setPost(data);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    let isMounted = true;
    BacsiService.getbacsi().then((data) => {
      if (isMounted) {
        setBacsi(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const createId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const savePost = () => {
    setSubmitted(true);

    let _post = { ...post };
    _post.ngay_dang = new Date().toISOString().split('T')[0];
    const payload = JSON.stringify(_post);
    const payloadSize = new TextEncoder().encode(payload).length;
    if (payloadSize > 5 * 1024 * 1024) { // Giới hạn 5MB
        throw new Error('Dữ liệu quá lớn, vui lòng giảm kích thước nội dung hoặc tệp');
    }

    try{
      if (id) {
        NewService.puttintuc(_post,id,selectedImage).then(() => {
          toast.current.show({
            severity: "success",
            summary: "Thành công",
            detail: "Cập nhật bài viết thành công",
            life: 3000,
          });
          router.push("/tintuc");
        });
      } else {
        _post.tintuc_id = createId();
        NewService.posttintuc(_post,selectedImage).then(() => {
          toast.current.show({
            severity: "success",
            summary: "Thành công",
            detail: "Thêm bài viết thành công",
            life: 3000,
          });
          router.push("/tintuc");
        });
      }
      setPost(emptyPost);
      setSelectedImage(null);
    } catch (error) {
      console.error("Lỗi khi lưu tin tức mới:", error);
      toast.current.show({ severity: "error", summary: "Lỗi", detail: "Có lỗi xảy ra khi lưu bài viết", life: 3000 });
    }
  };

  const onFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setPost({ ...post, anh_tin_tuc: e.target.files[0].name });
    }
  };

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Sửa bài viết" : "Thêm bài viết"}
      </h1>
      <div className="p-fluid">
        <div className="p-field">
          <label>Tiêu đề</label>
          <InputText
            value={post.tieu_de}
            onChange={(e) => setPost({ ...post, tieu_de: e.target.value })}
            className="w-full"
          />
        </div>
        <div className="p-field">
          <label>Nội dung</label>
          {isClient && (
            <>
              <QuillToolbar toolbarId={"t1"} />
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={post.noi_dung}
                onChange={(value) => setPost({ ...post, noi_dung: value })}
                placeholder={"Mời nhập nội dung..."}
                modules={modules("t1", quillRef)}
                formats={formats}
                style={{ height: "300px", backgroundColor: "#fff" }}
              />
            </>
          )}
        </div>
        <div className="field">
          <label>Nha Sĩ</label>
          <select
            className="w-full p-3 border"
            value={post.tac_gia}
            onChange={(e) => setPost({ ...post, tac_gia: e.target.value })}
          >
            <option value="">-- Chọn Nha sĩ --</option>
            {bacsi.map((bs) => (
              <option key={bs.bacsi_id} value={bs.bacsi_id}>
                {bs.hoten}
              </option>
            ))}
          </select>
        </div>
        <div className="p-field p-2 mt-2 bg-white" style={{ border: "1px solid #CCC", borderRadius: "8px" , display: "flex"}}>
          <label htmlFor="anh_tin_tuc">Ảnh dịch vụ</label>
          <input 
            id="anh_tin_tuc"
            type="file" 
            accept="image/*" 
            onChange={onFileUpload} 
            // className={errors.anh_tin_tuc ? 'p-invalid' : ''}
          />
          {/* {errors.anh_tin_tuc && <small className="p-error">{errors.anh_tin_tuc}</small>} */}
          {selectedImage && (
            <img 
              src={URL.createObjectURL(selectedImage)} 
              alt="Ảnh xem trước" 
              width="200" 
              height="120" 
              style={{ objectFit: 'cover', borderRadius: '8px', marginTop: '10px' }} 
            />
          )}
        </div>
        <div className="p-field">
          <label>Danh mục</label>
          <Dropdown
            options={categories}
            value={post.loai_tin}
            onChange={(e) => setPost({ ...post, loai_tin: e.value })}
            className="w-full"
          />
        </div>
        <div className="p-field">
          <label>Trạng thái</label>
          <Dropdown
            options={statuses}
            value={post.trang_thai}
            onChange={(e) => setPost({ ...post, trang_thai: e.value })}
            className="w-full"
          />
        </div>
        <div className="field">
          <label>Ngày đăng</label>
          <InputText
            type="date"
            // className={`w-full ${errors.ngaytao ? 'p-invalid' : ''}`}
            value={post.ngay_dang ? formatDate(post.ngay_dang) : ""}
            readOnly
            onChange={(e) => {
              setPost({ ...post, ngay_dang: e.target.value });
              // setErrors({ ...errors, ngaytao: '' });
          }}
          />
          {/* {errors.ngaytao && (
            <small className="p-error block">{errors.ngaytao}</small>
          )} */}
        </div>
      </div>
      <div className="p-mt-4 pt-3">
        <Button
          label="Lưu"
          icon="pi pi-check"
          onClick={savePost}
          className="p-mr-2 mr-4"
        />
        <Button
          label="Hủy"
          icon="pi pi-times"
          onClick={() => router.push("/tintuc")}
          className="p-button-secondary"
        />
      </div>
    </div>
  );
};

export default PostForm;