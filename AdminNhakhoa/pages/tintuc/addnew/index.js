// export default PostForm;
import { useCallback, useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { useParams, useNavigate } from 'react-router-dom';
import { NewService } from '../../../demo/service/NewService';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import EditorToolbar, { modules, formats } from "../../../demo/components/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.module.css";

const PostForm = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [post, setPost] = useState({
    tintuc_id: '',
    tieu_de: '',
    noi_dung: '',
    ngay_dang: '',
    tac_gia: '',
    anh_tin_tuc: '',
    loai_tin: '',
    trang_thai: 'Nháp',
  });

  const categories = [
    { label: 'Dịch vụ', value: 'Dịch vụ' },
    { label: 'Giá dich vụ', value: 'Giá dịch vụ' },
  ];

  const statuses = [
    { label: 'Nháp', value: 'Nháp' },
    { label: 'Công khai', value: 'Công khai' },
    { label: 'Đã xóa', value: 'Đã xóa' },
  ];



  // Lấy dữ liệu bài viết nếu là chỉnh sửa
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/posts/${id}`).then((res) => {
        setPost({
          ...res.data,
          publish_date: res.data.publish_date ? new Date(res.data.publish_date) : null,
        });
      });
    }
  }, [id]);

  // Lưu bài viết (thêm hoặc sửa)
  const savePost = () => {
    const postData = {
      ...post,
      publish_date: post.publish_date ? post.publish_date.toISOString() : null,
    };

    if (id) {
      axios.put(`http://localhost:5000/posts/${id}`, postData).then(() => {
        navigate('/posts');
      });
    } else {
      axios.post('http://localhost:5000/posts', postData).then(() => {
        navigate('/posts');
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{id ? 'Sửa bài viết' : 'Thêm bài viết'}</h1>
      <div className="p-fluid">
        <div className="p-field">
          <label>Tiêu đề</label>
          <InputText
            value={post.tieu_de}
            onChange={(e) => setPost({ ...post, tieu_de: e.target.value })}
            className="w-full"
          />
        </div>
        <div className='p-field'>
          <label>Nội dung</label>
          <EditorToolbar toolbarId={'t1'} />
          <ReactQuill 
            theme="snow"
            value={post.noi_dung}
            onChange={(value) => setPost({ ...post, noi_dung: value})}
            placeholder={"Mời nhập nội dung..."}
            modules={modules('t1')}
            formats={formats}
            style={{height: '300px'}}
          />
        </div>
        <div className="p-field">
          <label>Hình ảnh (URL)</label>
          <InputText
            value={post.image_url}
            onChange={(e) => setPost({ ...post, image_url: e.target.value })}
            className="w-full"
          />
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
        <div className="p-field">
          <label>Ngày đăng</label>
          <Calendar
            value={post.publish_date}
            onChange={(e) => setPost({ ...post, publish_date: e.value })}
            showTime
            hourFormat="24"
            className="w-full"
          />
        </div>
      </div>
      <div className="p-mt-4 pt-3">
        <Button label="Lưu" icon="pi pi-check"  onClick={savePost} className="p-mr-2 mr-4" />
        <Button
          label="Hủy"
          icon="pi pi-times"
          onClick={() => navigate('/posts')}
          className="p-button-secondary"
        />
      </div>
    </div>
  );
};

export default PostForm;