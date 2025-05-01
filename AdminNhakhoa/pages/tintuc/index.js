import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { NewService } from '../../demo/service/NewService'
import { BacsiService } from '../../demo/service/BacsiService'

const PostList = () => {
  let emptytintuc = { tintuc_id: "", tieu_de: "", noi_dung: "", ngay_dang: "", tac_gia: "", anh_tin_tuc: "", loai_tin: "", trang_thai: ""};

  const [posts, setposts] = useState([]);
  const [post, setpost] = useState(emptytintuc);
  const [bacsis, setBacsis] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
//   const navigate = useNavigate();

  // Lấy danh sách bài viết từ backend
 useEffect(() => {
    let isMounted = true;
    Promise.all([
      NewService.gettintuc(),
      BacsiService.getbacsi()
    ]).then(([tintucData, bacsiData]) => {
      if (isMounted) {
        setBacsis(bacsiData);
        setposts(tintucData.map(tt => ({
          ...tt,
          bacsi_name: bacsiData.find(bs => bs.bacsi_id === tt.tac_gia)?.hoten || 'Không xác định'
        })));
      }
    }).catch(error => {
      console.error('Lỗi khi tải dữ liệu ban đầu:', error);
      toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải dữ liệu', life: 3000})
    })
     
    return () => { isMounted = false; };
  }, []);

  // Xóa bài viết
  const deletePost = (id) => {
    // axios.delete(`http://localhost:5000/posts/${id}`).then(() => {
    //   setPosts(posts.filter((post) => post.id !== id));
    // });
  };

  // Chuyển hướng đến trang sửa bài viết
  // const editPost = (id) => {
  //   navigate(`/posts/edit/${id}`);
  // };

  // Template cho cột hành động
  const actionTemplate = (rowData) => (
    <div>
      <Button
        label="Sửa"
        className='mr-2'
        onClick={() => editPost(rowData.id)}
      />
      <Button
        label="Xóa"
        onClick={() => deletePost(rowData.id)}
      />
    </div>
  );

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h4 className="m-0">Quản lý bài đăng</h4>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
      </span>
    </div>
  );

  return (
    <div>
      {/* <Button
        label="Thêm bài viết"
        icon="pi pi-plus"
        onClick={() => navigate('/tintuc/addnew')}
        className="p-mb-4"
      /> */}
      <DataTable value={posts} paginator rows={5} className="p-mt-4" globalFilter={globalFilter} header={header}>
        <Column header="STT" body={(rowData, options) => options.rowIndex + 1} className='text-center'/>
        <Column field="tieu_de" header="Tiêu đề" />
        {/* <Column field="anh_tin_tuc" header="Ảnh" />  */}
        <Column 
          field="anh_tin_tuc" 
            header="Ảnh" 
            body={(rowData) => (
              rowData.anh_tin_tuc ? (
                <img 
                  src={NewService.getImageUrl(rowData.anh_tin_tuc)} 
                  alt="Ảnh dịch vụ" 
                  width="150" 
                  height="90" 
                  style={{ objectFit: 'cover', borderRadius: '8px' }} 
                />
                ) : (
                  <span>Không có ảnh</span>
                )
          )} 
        />
        {/* <Column field="noi_dung" header="nội dung" sortable /> */}
        <Column field="ngay_dang" header="Ngày đăng" sortable  body={(rowData) => formatDate(rowData.ngay_dang)}/>
        <Column field="bacsi_name" header="Tác giả" />
        <Column field="loai_tin" header="Loại tin" />
        <Column field="trang_thai" header="Trạng thái" />
        <Column body={actionTemplate} header="Hành động" />
      </DataTable>
    </div>
  );
};

export default PostList;