import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
//   const navigate = useNavigate();

  // Lấy danh sách bài viết từ backend
  useEffect(() => {
    // axios.get('http://localhost:5000/posts').then((res) => {
    //   setPosts(res.data);
    // });
  }, []);

  // Xóa bài viết
  const deletePost = (id) => {
    // axios.delete(`http://localhost:5000/posts/${id}`).then(() => {
    //   setPosts(posts.filter((post) => post.id !== id));
    // });
  };

  // Chuyển hướng đến trang sửa bài viết
  const editPost = (id) => {
    navigate(`/posts/edit/${id}`);
  };

  // Template cho cột hành động
  const actionTemplate = (rowData) => (
    <div>
      <Button
        label="Sửa"
        className="p-button-warning p-mr-2"
        onClick={() => editPost(rowData.id)}
      />
      <Button
        label="Xóa"
        className="p-button-danger"
        onClick={() => deletePost(rowData.id)}
      />
    </div>
  );

  return (
    <div>
      <h1>Quản lý bài viết</h1>
      {/* <Button
        label="Thêm bài viết"
        icon="pi pi-plus"
        onClick={() => navigate('/tintuc/addnew')}
        className="p-mb-4"
      /> */}
      <DataTable value={posts} paginator rows={10} className="p-mt-4">
        <Column field="title" header="Tiêu đề" sortable />
        <Column field="category" header="Danh mục" sortable />
        <Column field="status" header="Trạng thái" sortable />
        <Column field="publish_date" header="Ngày đăng" sortable />
        <Column body={actionTemplate} header="Hành động" />
      </DataTable>
    </div>
  );
};

export default PostList;