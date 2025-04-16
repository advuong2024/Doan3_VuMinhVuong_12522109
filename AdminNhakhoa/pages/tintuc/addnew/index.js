import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import mammoth from 'mammoth';

const PostForm = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    content: '',
    image_url: '',
    category: '',
    status: 'draft',
    publish_date: null,
  });

  const categories = [
    { label: 'Chăm sóc răng', value: 'Chăm sóc răng' },
    { label: 'Niềng răng', value: 'Niềng răng' },
    { label: 'Trồng răng', value: 'Trồng răng' },
    { label: 'Khuyến mãi', value: 'Khuyến mãi' },
  ];

  const statuses = [
    { label: 'Nháp', value: 'draft' },
    { label: 'Đã đăng', value: 'published' },
    { label: 'Lên lịch', value: 'scheduled' },
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

  // Xử lý khi người dùng tải file Word lên
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        try {
          const result = await mammoth.convertToHtml({ arrayBuffer });
          const htmlContent = result.value; // Nội dung HTML từ file Word
          setPost({ ...post, content: htmlContent });
        } catch (error) {
          console.error('Lỗi khi chuyển đổi file Word sang HTML:', error);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

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
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="w-full"
          />
        </div>
        <div className="p-field">
          <label>Tải file Word (nếu có)</label>
          <input
            type="file"
            accept=".docx"
            onChange={handleFileUpload}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="p-field">
          <label>Nội dung</label>
          <Editor
            style={{ height: '200px' }}
            value={post.content}
            onTextChange={(e) => setPost({ ...post, content: e.htmlValue })}
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
            value={post.category}
            onChange={(e) => setPost({ ...post, category: e.value })}
            className="w-full"
          />
        </div>
        <div className="p-field">
          <label>Trạng thái</label>
          <Dropdown
            options={statuses}
            value={post.status}
            onChange={(e) => setPost({ ...post, status: e.value })}
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
      <div className="p-mt-4">
        <Button label="Lưu" icon="pi pi-check" onClick={savePost} className="p-mr-2" />
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