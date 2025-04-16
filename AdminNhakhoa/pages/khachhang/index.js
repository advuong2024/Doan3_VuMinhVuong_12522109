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

    useEffect(() => {
        let isMounted = true;
        KhachhangService.getKhachhang().then(data => {
            if (isMounted) {
                setKhachhangs(data);
            }
        });
    
        return () => { isMounted = false; };
    }, []);
    
    const openNew = () => {
        setKhachhang(emptyKhachhang);
        setSubmitted(false);
        setKhachhangDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setKhachhangDialog(false);
    };
    const LoadPage = async () => {
        const data = await KhachhangService.getKhachhang();
        setKhachhangs(data); // Cập nhật danh sách khách hàng
    };
    
    const formatDate = (dateString) => {
        if (!dateString) return "";
        
        // Nếu đã đúng định dạng yyyy-MM-dd thì giữ nguyên
        if (typeof dateString === "string" && dateString.length === 10) return dateString;
    
        const d = new Date(dateString);
        return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    };

    const saveKhachhang = async () => {
        setSubmitted(true);
        if (khachhang.hoten.trim()) {
            let _khachhang = { ...khachhang };

            _khachhang.ngaysinh = formatDate(_khachhang.ngaysinh);

            if (khachhang.benhnhan_id) {
                try {
                    const updatedKhachhang = await KhachhangService.putkhachhang(khachhang.benhnhan_id, _khachhang);
    
                    let _khachhangs = khachhangs.map(kh => 
                        kh.benhnhan_id === khachhang.benhnhan_id ? updatedKhachhang : kh
                    );
    
                    setKhachhangs(_khachhangs);
                    toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật khách hàng', life: 3000 });
    
                } catch (error) {
                    console.error("Lỗi khi cập nhật khách hàng:", error);
                    toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể cập nhật khách hàng', life: 3000 });
                }
            } else {
                try {
                    _khachhang.benhnhan_id = createId();
                    const newKhachhang = await KhachhangService.postkhachhang(_khachhang);
    
                    setKhachhangs([...khachhangs, newKhachhang]);
                    toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Thêm khách hàng mới', life: 3000 });
    
                } catch (error) {
                    console.error("Lỗi khi thêm khách hàng:", error);
                    toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể thêm khách hàng', life: 3000 });
                }
            }
            setKhachhangDialog(false);
            setKhachhang(emptyKhachhang);
            LoadPage();
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

            <Dialog visible={khachhangDialog} style={{ width: '450px' }} header="Thông tin khách hàng" footer={customerDialogFooter} onHide={hideDialog}>
                <InputText value={khachhang.hoten} onChange={(e) => setKhachhang({ ...khachhang, hoten: e.target.value })} placeholder="Tên khách hàng" className="w-full" />
                <InputText
                    type="date"
                    value={khachhang.ngaysinh ? formatDate(khachhang.ngaysinh) : ""}
                    onChange={(e) =>
                        setKhachhang({ ...khachhang, ngaysinh: e.target.value }) // Không cần parseDate
                    }
                    className="w-full mt-2"
                />
                <select
                    value={khachhang.Gioitinh}
                    onChange={(e) => setKhachhang({ ...khachhang, Gioitinh: e.target.value })}
                    className="w-full pt-3 pb-3 mt-2 text-gray-700"
                    style={{
                        borderRadius: '8px',
                        border: '1px solid #CCC',
                        padding: '10px',
                        fontSize: '13px',
                    }}
                    >
                    <option value="">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                </select>
                <InputText value={khachhang.diachi} onChange={(e) => setKhachhang({ ...khachhang, diachi: e.target.value })} placeholder="Địa chỉ" className="w-full mt-2" />
                <InputText value={khachhang.email} onChange={(e) => setKhachhang({ ...khachhang, email: e.target.value })} placeholder="Email" className="w-full mt-2" />
                <InputText value={khachhang.SDT} onChange={(e) => setKhachhang({ ...khachhang, SDT: e.target.value })} placeholder="Số điện thoại" className="w-full mt-2" />
            </Dialog>

            <Dialog visible={deleteKhachhangDialog} style={{ width: '450px' }} header="Xác nhận xóa" footer={deleteKhachhangFooter} onHide={() => setDeleteKhachhangDialog(false)}>
                <p>Bạn có chắc chắn muốn xóa khách hàng <strong>{khachhang.hoten}</strong> không?</p>
            </Dialog>
        </div>
    );
};

export default Khachhang;
