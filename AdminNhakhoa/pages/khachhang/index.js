import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useRef, useState } from 'react';
import { KhachhangService } from '../../demo/service/KhachhangService';

const Khachhang = () => {
    let emptyKhachhang = { benhnhan_id: "", hoten: "", ngaysinh: "", Gioitinh: "", diachi: "", email: "", SDT: "" };

    const [khachhangs, setKhachhangs] = useState([]);
    const [khachhang, setKhachhang] = useState(emptyKhachhang);
    const [khachhangDialog, setKhachhangDialog] = useState(false);
    const [deleteKhachhangDialog, setDeleteKhachhangDialog] = useState(false);
    const [selectedKhachhangs, setSelectedKhachhangs] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const [errors, setErrors] = useState({
        hoten: '',
        ngaysinh: '',
        Gioitinh: '',
        diachi: '',
        email: '',
        SDT: ''
    });

    useEffect(() => {
        let isMounted = true;
        KhachhangService.getKhachhang().then(data => {
            if (isMounted) {
                setKhachhangs(data);
            }
        });
    
        return () => { isMounted = false; };
    }, []);
    
    const validateForm = () => {
        let valid = true;
        let newErrors = {
            hoten: '',
            ngaysinh: '',
            Gioitinh: '',
            diachi: '',
            email: '',
            SDT: ''
        };

        // Validate họ tên
        if (!khachhang.hoten.trim()) {
            newErrors.hoten = 'Họ tên không được để trống';
            valid = false;
        } else if (khachhang.hoten.length < 3) {
            newErrors.hoten = 'Họ tên phải có ít nhất 3 ký tự';
            valid = false;
        }

        // Validate ngày sinh
        if (!khachhang.ngaysinh) {
            newErrors.ngaysinh = 'Ngày sinh không được để trống';
            valid = false;
        } else {
            const dob = new Date(khachhang.ngaysinh);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const m = today.getMonth() - dob.getMonth();
            
            if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
                age--;
            }

            if (age < 0 || age > 100) {
                newErrors.ngaysinh = 'Tuổi phải từ 0 đến 100';
                valid = false;
            }
        }

        // Validate giới tính
        if (!khachhang.Gioitinh) {
            newErrors.Gioitinh = 'Vui lòng chọn giới tính';
            valid = false;
        }

        // Validate địa chỉ
        if (!khachhang.diachi.trim()) {
            newErrors.diachi = 'Địa chỉ không được để trống';
            valid = false;
        }

        // Validate email
        if (!khachhang.email.trim()) {
            newErrors.email = 'Email không được để trống';
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(khachhang.email)) {
            newErrors.email = 'Email không hợp lệ';
            valid = false;
        }

        // Validate số điện thoại
        if (!khachhang.SDT.trim()) {
            newErrors.SDT = 'Số điện thoại không được để trống';
            valid = false;
        } else if (!/^\d{10}$/.test(khachhang.SDT)) {
            newErrors.SDT = 'Số điện thoại phải là 10 chữ số';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const openNew = () => {
        setKhachhang(emptyKhachhang);
        setSubmitted(false);
        setErrors({
            hoten: '',
            ngaysinh: '',
            Gioitinh: '',
            diachi: '',
            email: '',
            SDT: ''
        });
        setKhachhangDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setKhachhangDialog(false);
        setErrors({
            hoten: '',
            ngaysinh: '',
            Gioitinh: '',
            diachi: '',
            email: '',
            SDT: ''
        });
    };

    const LoadPage = async () => {
        const data = await KhachhangService.getKhachhang();
        setKhachhangs(data);
    };
    
    const formatDate = (dateString) => {
        if (!dateString) return "";
        
        if (typeof dateString === "string" && dateString.length === 10) return dateString;
    
        const d = new Date(dateString);
        return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    };

    const saveKhachhang = async () => {
        setSubmitted(true);
        
        if (!validateForm()) {
            toast.current.show({
                severity: 'warn',
                summary: 'Cảnh báo',
                detail: 'Vui lòng kiểm tra lại thông tin nhập',
                life: 3000
            });
            return;
        }

        let _khachhang = { ...khachhang };
        _khachhang.ngaysinh = formatDate(_khachhang.ngaysinh);

        try {
            if (khachhang.benhnhan_id) {
                const updatedKhachhang = await KhachhangService.putkhachhang(khachhang.benhnhan_id, _khachhang);
                let _khachhangs = khachhangs.map(kh => 
                    kh.benhnhan_id === khachhang.benhnhan_id ? updatedKhachhang : kh
                );
                setKhachhangs(_khachhangs);
                toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật khách hàng', life: 3000 });
            } else {
                _khachhang.benhnhan_id = createId();
                const newKhachhang = await KhachhangService.postkhachhang(_khachhang);
                setKhachhangs([...khachhangs, newKhachhang]);
                toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Thêm khách hàng mới', life: 3000 });
            } 
            
            setKhachhangDialog(false);
            setKhachhang(emptyKhachhang);
            LoadPage();
        } catch (error) {
            console.error("Lỗi khi lưu khách hàng:", error);
            toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể lưu khách hàng', life: 3000 });
        }
    };

    const confirmDeleteKhachhang = (khachhang) => {
        setKhachhang(khachhang);
        setDeleteKhachhangDialog(true);
    };

    const deleteKhachhang = async () => {
        try {
            // Gọi API để xóa khách hàng
            const response = await KhachhangService.deletekhachhang(khachhang.benhnhan_id, khachhang);
    
            if (response) {
                // Cập nhật danh sách sau khi xóa thành công
                let _khachhangs = khachhangs.filter(val => val.benhnhan_id !== khachhang.benhnhan_id);
                setKhachhangs(_khachhangs);
                
                toast.current.show({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Xóa khách hàng thành công',
                    life: 3000
                });
            } else {
                throw new Error("Không thể xóa khách hàng.");
            }
        } catch (error) {
            console.error("Lỗi khi xóa khách hàng:", error);
            toast.current.show({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Xóa khách hàng thất bại',
                life: 3000
            });
        } finally {
            // Đóng dialog và reset trạng thái
            setDeleteKhachhangDialog(false);
            setKhachhang(emptyKhachhang);
        }
    };    

    const createId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const customerDialogFooter = (
        <>
            <Button label="Hủy" icon="pi pi-times" onClick={hideDialog} />
            <Button label="Lưu" icon="pi pi-check" onClick={saveKhachhang} />
        </>
    );

    const deleteKhachhangFooter = (
        <>
            <Button label="Không" icon="pi pi-times" onClick={() => setDeleteKhachhangDialog(false)} />
            <Button label="Có" icon="pi pi-check" onClick={deleteKhachhang} />
        </>
    );
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h4 className="m-0">Khách Hàng</h4>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <Toolbar className="mb-4" left={() => (
                <Button label="Thêm mới" icon="pi pi-plus" onClick={openNew} />
            )} />
            
            <DataTable value={khachhangs} paginator rows={5} globalFilter={globalFilter} header={header}> 
                <Column header="STT" body={(rowData, options) => options.rowIndex + 1} className='text-center'/>
                <Column field="hoten" header="Họ Tên"></Column>
                <Column field="ngaysinh" header="ngày sinh" sortable body={(rowData) => formatDate(rowData.ngaysinh)}></Column>
                <Column field="Gioitinh" header="giới tính"></Column>
                <Column field="diachi" header="Địa chỉ"></Column>
                <Column field="email" header="Email" ></Column>
                <Column field="SDT" header="SĐT" ></Column>
                <Column body={(rowData) => (
                    <>
                        <Button icon="pi pi-pencil" onClick={() => { setKhachhang(rowData); setKhachhangDialog(true); }} />
                        <Button icon="pi pi-trash" className="ml-2" onClick={() => confirmDeleteKhachhang(rowData)} />
                    </>
                )} />
            </DataTable>

            <Dialog visible={khachhangDialog} style={{ width: '450px' }} header="Thông tin khách hàng" modal className="p-fluid" footer={customerDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="hoten">Họ tên</label>
                    <InputText 
                        id="hoten"
                        value={khachhang.hoten} 
                        onChange={(e) => {
                            setKhachhang({ ...khachhang, hoten: e.target.value });
                            setErrors({ ...errors, hoten: '' });
                        }} 
                        className={errors.hoten ? 'p-invalid' : ''}
                        placeholder="Nhập họ tên"
                    />
                    {errors.hoten && <small className="p-error">{errors.hoten}</small>}
                </div>

                <div className="field">
                    <label htmlFor="ngaysinh">Ngày sinh</label>
                    <InputText
                        id="ngaysinh"
                        type="date"
                        value={khachhang.ngaysinh ? formatDate(khachhang.ngaysinh) : ""}
                        onChange={(e) => {
                            setKhachhang({ ...khachhang, ngaysinh: e.target.value });
                            setErrors({ ...errors, ngaysinh: '' });
                        }}
                        className={errors.ngaysinh ? 'p-invalid' : ''}
                    />
                    {errors.ngaysinh && <small className="p-error">{errors.ngaysinh}</small>}
                </div>

                <div className="field">
                    <label htmlFor="Gioitinh">Giới tính</label>
                    <select
                        id="Gioitinh"
                        value={khachhang.Gioitinh}
                        onChange={(e) => {
                            setKhachhang({ ...khachhang, Gioitinh: e.target.value });
                            setErrors({ ...errors, Gioitinh: '' });
                        }}
                        className={`w-full p-2 border rounded ${errors.Gioitinh ? 'border-red-500' : ''}`}
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </select>
                    {errors.Gioitinh && <small className="p-error">{errors.Gioitinh}</small>}
                </div>

                <div className="field">
                    <label htmlFor="diachi">Địa chỉ</label>
                    <InputText 
                        id="diachi"
                        value={khachhang.diachi} 
                        onChange={(e) => {
                            setKhachhang({ ...khachhang, diachi: e.target.value });
                            setErrors({ ...errors, diachi: '' });
                        }} 
                        className={errors.diachi ? 'p-invalid' : ''}
                        placeholder="Nhập địa chỉ"
                    />
                    {errors.diachi && <small className="p-error">{errors.diachi}</small>}
                </div>

                <div className="field">
                    <label htmlFor="email">Email</label>
                    <InputText 
                        id="email"
                        value={khachhang.email} 
                        onChange={(e) => {
                            setKhachhang({ ...khachhang, email: e.target.value });
                            setErrors({ ...errors, email: '' });
                        }} 
                        className={errors.email ? 'p-invalid' : ''}
                        placeholder="Nhập email"
                    />
                    {errors.email && <small className="p-error">{errors.email}</small>}
                </div>

                <div className="field">
                    <label htmlFor="SDT">Số điện thoại</label>
                    <InputText 
                        id="SDT"
                        value={khachhang.SDT} 
                        onChange={(e) => {
                            setKhachhang({ ...khachhang, SDT: e.target.value });
                            setErrors({ ...errors, SDT: '' });
                        }} 
                        className={errors.SDT ? 'p-invalid' : ''}
                        placeholder="Nhập số điện thoại"
                    />
                    {errors.SDT && <small className="p-error">{errors.SDT}</small>}
                </div>
            </Dialog>

            <Dialog visible={deleteKhachhangDialog} style={{ width: '450px' }} header="Xác nhận xóa" footer={deleteKhachhangFooter} onHide={() => setDeleteKhachhangDialog(false)}>
                <p>Bạn có chắc chắn muốn xóa khách hàng <strong>{khachhang.hoten}</strong> không?</p>
            </Dialog>
        </div>
    );
};

export default Khachhang;
