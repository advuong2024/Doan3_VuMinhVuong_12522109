// import { useState, useEffect, useRef } from 'react';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { Editor } from 'primereact/editor';
// import { Calendar } from 'primereact/calendar';
// import { Dropdown } from 'primereact/dropdown';
// import { useParams } from 'react-router-dom';
// import { NewService } from '../../../demo/service/NewService';

// const PostForm = () => {
//   const { id } = useParams();
//   const emptyTinTuc = {
//     tintuc_id: '',
//     tieu_de: '',
//     noi_dung: '',
//     ngay_dang: '',
//     tac_gia: '',
//     anh_tin_tuc: '',
//     loai_tin: '',
//     trang_thai: ''
//   };

//   const [post, setPost] = useState(emptyTinTuc);
//   const editorRef = useRef(null);
//   const toast = useRef(null);
//   const [errors, setErrors] = useState(emptyTinTuc);

//   const categories = [
//     { label: 'Chăm sóc răng', value: 'Chăm sóc răng' },
//     { label: 'Niềng răng', value: 'Niềng răng' },
//     { label: 'Trồng răng', value: 'Trồng răng' },
//     { label: 'Khuyến mãi', value: 'Khuyến mãi' },
//   ];

//   const statuses = [
//     { label: 'Nháp', value: 'draft' },
//     { label: 'Đã đăng', value: 'published' },
//     { label: 'Lên lịch', value: 'scheduled' },
//   ];

//   // Lấy dữ liệu bài viết nếu chỉnh sửa
//   useEffect(() => {
//     if (id) {
//       NewService.gettintuc()
//         .then((data) => {
//           const tinTuc = data.find((item) => item.tintuc_id === id);
//           if (tinTuc) {
//             setPost({
//               ...tinTuc,
//               ngay_dang: tinTuc.ngay_dang ? new Date(tinTuc.ngay_dang) : null,
//             });
//           } else {
//             throw new Error('Không tìm thấy bài viết');
//           }
//         })
//         .catch((error) => {
//           console.error('Lấy bài viết thất bại:', error);
//           alert('Không thể tải bài viết. Vui lòng thử lại.');
//         });
//     }
//   }, [id]);

//   // Cấu hình Quill để upload ảnh
//   useEffect(() => {
//     const setupQuill = () => {
//       if (editorRef.current) {
//         const quill = editorRef.current.getQuill();
//         if (quill) {
//           const toolbar = quill.getModule('toolbar');
//           if (toolbar) {
//             toolbar.addHandler('image', () => {
//               const input = document.createElement('input');
//               input.setAttribute('type', 'file');
//               input.setAttribute('accept', 'image/*');
//               input.click();

//               input.onchange = async () => {
//                 const file = input.files[0];
//                 if (file) {
//                   const formData = new FormData();
//                   formData.append('image', file);

//                   try {
//                     const response = await NewService.uploadImage(formData);
//                     console.log('Response từ uploadImage:', response);
//                     if (!response || !response.imageName) {
//                       throw new Error('Response từ API không hợp lệ hoặc thiếu imageName');
//                     }
//                     const imageName = response.imageName;
//                     const imageUrl = NewService.getImageUrl(imageName);
//                     console.log('Image URL:', imageUrl);
//                     if (!imageUrl) {
//                       throw new Error('Không thể tạo URL ảnh');
//                     }

//                     // Kiểm tra URL ảnh có tải được không
//                     const img = new Image();
//                     img.onerror = () => {
//                       console.error('Không thể tải ảnh từ URL:', imageUrl);
//                       alert('Ảnh không tải được. Vui lòng kiểm tra URL.');
//                     };
//                     img.src = imageUrl;

//                     // Chèn ảnh vào Quill tại vị trí con trỏ
//                     const range = quill.getSelection(true);
//                     quill.insertEmbed(range.index, 'image', imageUrl);
//                     quill.setSelection(range.index + 1);

//                     // Cập nhật post.noi_dung để đồng bộ
//                     const updatedContent = quill.root.innerHTML;
//                     console.log('Nội dung Quill sau khi chèn:', updatedContent);
//                     setPost((prev) => ({
//                       ...prev,
//                       noi_dung: updatedContent
//                     }));
//                   } catch (error) {
//                     console.error('Upload ảnh thất bại:', error);
//                     alert('Không thể tải ảnh lên. Vui lòng thử lại.');
//                   }
//                 }
//               };
//             });
//           } else {
//             console.error('Toolbar module không tồn tại');
//           }
//         } else {
//           console.error('Quill instance không tồn tại');
//         }
//       } else {
//         console.error('editorRef.current không tồn tại');
//       }
//     };

//     setupQuill();
//   }, []);

//   // Xử lý nội dung khi thay đổi (bao gồm sau khi thoát chế độ mã nguồn)
//   const handleTextChange = (e) => {
//     const newContent = e.htmlValue;
//     console.log('Nội dung sau khi thay đổi:', newContent);
//     setPost((prev) => ({
//       ...prev,
//       noi_dung: newContent || ''
//     }));
//   };

//   // Lưu bài viết
//   const savePost = () => {
//     const postData = {
//       ...post,
//       ngay_dang: post.ngay_dang ? post.ngay_dang.toISOString() : null,
//     };

//     const apiCall = id
//       ? NewService.puttintuc(id, postData)
//       : NewService.posttintuc(postData);

//     apiCall
//       .then((response) => {
//         console.log('Lưu bài viết thành công:', response);
//         alert('Lưu bài viết thành công!');
//       })
//       .catch((error) => {
//         console.error('Lưu bài thất bại:', error);
//         alert('Lưu bài thất bại. Vui lòng thử lại.');
//       });
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">{id ? 'Sửa bài viết' : 'Thêm bài viết'}</h1>
//       <div className="p-fluid">
//         <div className="p-field">
//           <label>Tiêu đề</label>
//           <InputText
//             value={post.tieu_de}
//             onChange={(e) => setPost({ ...post, tieu_de: e.target.value })}
//             className="w-full"
//           />
//         </div>
//         <div className="p-field">
//           <label>Tác giả</label>
//           <InputText
//             value={post.tac_gia}
//             onChange={(e) => setPost({ ...post, tac_gia: e.target.value })}
//             className="w-full"
//           />
//         </div>
//         <div className="p-field">
//           <label>Nội dung</label>
//           <Editor
//             ref={editorRef}
//             style={{ height: '300px' }}
//             value={post.noi_dung}
//             onTextChange={handleTextChange}
//             // formats={['bold', 'italic', 'underline', 'header', 'list', 'bullet', 'link', 'image']}
//             // modules={{
//             //   toolbar: [
//             //     [{ header: [1, 2, 3, false] }],
//             //     ['bold', 'italic', 'underline'],
//             //     [{ list: 'ordered' }, { list: 'bullet' }],
//             //     ['link', 'image', 'code-block']
//             //   ],
//             //   clipboard: {
//             //     matchVisual: false
//             //   }
//             // }}
//           />
//         </div>
//         <div className="p-field">
//           <label>Hình ảnh (URL, tùy chọn)</label>
//           <InputText
//             value={post.anh_tin_tuc}
//             onChange={(e) => setPost({ ...post, anh_tin_tuc: e.target.value })}
//             className="w-full"
//           />
//         </div>
//         <div className="p-field">
//           <label>Loại tin</label>
//           <Dropdown
//             options={categories}
//             value={post.loai_tin}
//             onChange={(e) => setPost({ ...post, loai_tin: e.value })}
//             className="w-full"
//           />
//         </div>
//         <div className="p-field">
//           <label>Trạng thái</label>
//           <Dropdown
//             options={statuses}
//             value={post.trang_thai}
//             onChange={(e) => setPost({ ...post, trang_thai: e.value })}
//             className="w-full"
//           />
//         </div>
//         <div className="p-field">
//           <label>Ngày đăng</label>
//           <Calendar
//             value={post.ngay_dang}
//             onChange={(e) => setPost({ ...post, ngay_dang: e.value })}
//             showTime
//             hourFormat="24"
//             className="w-full"
//           />
//         </div>
//       </div>
//       <div className="mt-4">
//         <Button label="Lưu" icon="pi pi-check" onClick={savePost} className="mr-2" />
//         <Button
//           label="Hủy"
//           icon="pi pi-times"
//           onClick={() => window.history.back()}
//           className="p-button-secondary"
//         />
//       </div>
//     </div>
//   );
// };

// export default PostForm;
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