import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useRef, useState } from 'react';
import { BacsiService } from '../../demo/service/BacsiService';

const Nhasi = () => {
    let emptyBacsi = { bacsi_id: "", hoten: "", ngaysinh: "", Gioitinh: "", diachi: "", email: "", SDT: "", taikhoan: "", matkhau: "", quyen: "" };

    const [bacsis, setBacsis] = useState([]);
    const [bacsi, setBacsi] = useState(emptyBacsi);
    const [bacsiDialog, setBacsiDialog] = useState(false);
    const [deleteBacsiDialog, setDeleteBacsiDialog] = useState(false);
    const [selectedBacsis, setSelectedBacsis] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState("");
    const toast = useRef(null);

    // useEffect(() => {
    //     BacsiService.getbacsi().then(data => setBacsis(data));
    // }, []);
    useEffect(() => {
        let isMounted = true;
        BacsiService.getbacsi().then(data => {
            if (isMounted) {
                setBacsis(data);
            }
        });
        
        return () => { isMounted = false; };
    }, []);

    const openNew = () => {
        setBacsi(emptyBacsi);
        setSubmitted(false);
        setBacsiDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setBacsiDialog(false);
    };

    const LoadPage = async () => {
        const data = await BacsiService.getbacsi();
        setBacsis(data); // Cập nhật danh sách khách hàng
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        
        // Nếu đã đúng định dạng yyyy-MM-dd thì giữ nguyên
        if (typeof dateString === "string" && dateString.length === 10) return dateString;
    
        const d = new Date(dateString);
        return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    };

    // const parseDate = (value) => {
    //     return value ? new Date(value) : null;
    // };

    const saveBacsi = async () => {
        setSubmitted(true);
        if (bacsi.hoten.trim()) {
            let _bacsi = { ...bacsi };
            // Chuyển đổi ngày sinh về yyyy-MM-dd
            _bacsi.ngaysinh = formatDate(_bacsi.ngaysinh);
    
            if (bacsi.bacsi_id) {
                try {
                    const updatedBacsi = await BacsiService.putbacsi(bacsi.bacsi_id, _bacsi);
                    let _bacsis = bacsis.map(bs => 
                        bs.bacsi_id === bacsi.bacsi_id ? updatedBacsi : bs
                    );
    
                    setBacsis(_bacsis);
                    toast.current.show({ severity: "success", summary: "Thành công", detail: "Cập nhật bác sĩ", life: 3000 });
    
                } catch (error) {
                    console.error("Lỗi khi cập nhật bác sĩ:", error);
                    toast.current.show({ severity: "error", summary: "Lỗi", detail: "Không thể cập nhật bác sĩ", life: 3000 });
                }
            } else {
                try {
                    _bacsi.bacsi_id = createId();
                    const newBacsi = await BacsiService.postbacsi(_bacsi);
    
                    setBacsis([...bacsis, newBacsi]);
                    toast.current.show({ severity: "success", summary: "Thành công", detail: "Thêm bác sĩ mới", life: 3000 });
    
                } catch (error) {
                    console.error("Lỗi khi thêm bác sĩ:", error);
                    toast.current.show({ severity: "error", summary: "Lỗi", detail: "Không thể thêm bác sĩ", life: 3000 });
                }
            }
    
            setBacsiDialog(false);
            setBacsi(emptyBacsi);
            LoadPage();
        }
    };
     

    const confirmDeleteBacsi = (bacsi) => {
        setBacsi(bacsi);
        setDeleteBacsiDialog(true);
    };

    const deleteBacsi = async () => {
        try {
            // Gọi API xóa bác sĩ
            const response = await BacsiService.deletebacsi(bacsi.bacsi_id);
    
            if (response) {
                // Xóa bác sĩ khỏi danh sách hiện tại
                let _bacsis = bacsis.filter(bs => bs.bacsi_id !== bacsi.bacsi_id);
                setBacsis(_bacsis);
    
                toast.current.show({
                    severity: "success",
                    summary: "Thành công",
                    detail: "Xóa bác sĩ thành công",
                    life: 3000
                });
            } else {
                throw new Error("Không thể xóa bác sĩ.");
            }
        } catch (error) {
            console.error("Lỗi khi xóa bác sĩ:", error);
            toast.current.show({
                severity: "error",
                summary: "Lỗi",
                detail: "Xóa bác sĩ thất bại",
                life: 3000
            });
        } finally {
            // Đóng dialog và reset trạng thái
            setDeleteBacsiDialog(false);
            setBacsi(emptyBacsi);
        }
    };    

    const createId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const bacsiDialogFooter = (
        <>
            <Button label="Hủy" icon="pi pi-times" onClick={hideDialog} />
            <Button label="Lưu" icon="pi pi-check" onClick={saveBacsi} />
        </>
    );

    const deleteBacsiFooter = (
        <>
            <Button label="Không" icon="pi pi-times" onClick={() => setDeleteBacsiDialog(false)} />
            <Button label="Có" icon="pi pi-check" onClick={deleteBacsi} />
        </>
    );
    const header = (
            <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                <h4 className="m-0">Nha sĩ</h4>
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

            <DataTable value={bacsis} paginator rows={5} globalFilter={globalFilter} header={header}> 
                <Column header="STT" body={(rowData, options) => options.rowIndex + 1} className='text-center'/> 
                <Column field="hoten" header="Họ Tên"></Column>
                <Column field="ngaysinh" header="Ngày sinh" sortable body={(rowData) => formatDate(rowData.ngaysinh)}></Column>
                <Column field="Gioitinh" header="Giới tính" className='text-center'></Column>
                <Column field="diachi" header="Địa chỉ"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="SDT" header="SĐT" className='text-center'></Column>
                {/* <Column field="taikhoan" header="Tài khoản"></Column> */}
                {/* <Column field="matkhau" header="Mật khẩu" sortable></Column> */}
                <Column field="quyen" header="Quyền"></Column>
                <Column body={(rowData) => (
                    <>
                        <Button icon="pi pi-pencil" onClick={() => {setBacsi(rowData); setBacsiDialog(true);}} />
                        <Button icon="pi pi-trash" className="ml-2" onClick={() => confirmDeleteBacsi(rowData)} />
                    </>
                )} />
            </DataTable>

            <Dialog visible={bacsiDialog} style={{ width: '450px' }} header="Thông tin bác sĩ" footer={bacsiDialogFooter} onHide={hideDialog}>
                <InputText value={bacsi.hoten} onChange={(e) => setBacsi({ ...bacsi, hoten: e.target.value })} placeholder="Tên bác sĩ" className="w-full" />
                <InputText
                    type="date"
                    value={bacsi.ngaysinh ? formatDate(bacsi.ngaysinh) : ""}
                    onChange={(e) =>
                        setBacsi({ ...bacsi, ngaysinh: e.target.value }) // Không cần parseDate
                    }
                    className="w-full mt-2"
                />
                <select
                    value={bacsi.Gioitinh}
                    onChange={(e) => bacsi({ ...bacsi, Gioitinh: e.target.value })}
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
                <InputText value={bacsi.diachi} onChange={(e) => setBacsi({ ...bacsi, diachi: e.target.value })} placeholder="địa chỉ" className="w-full mt-2" />
                <InputText value={bacsi.email} onChange={(e) => setBacsi({ ...bacsi, email: e.target.value })} placeholder="email" className="w-full mt-2" />
                <InputText value={bacsi.SDT} onChange={(e) => setBacsi({ ...bacsi, SDT: e.target.value })} placeholder="số điện thoại" className="w-full mt-2" />
                <InputText value={bacsi.taikhoan} onChange={(e) => setBacsi({ ...bacsi, taikhoan: e.target.value })} placeholder="Tài khoản" className="w-full mt-2" />
                <InputText type="password" value={bacsi.matkhau} onChange={(e) => setBacsi({ ...bacsi, matkhau: e.target.value })} placeholder="Mật khẩu" className="w-full mt-2" />
                <select
                    value={bacsi.quyen}
                    onChange={(e) => setBacsi({ ...bacsi, quyen: e.target.value })}
                    className="w-full pt-3 pb-3 mt-2 text-gray-700"
                    style={{
                        borderRadius: '8px',
                        border: '1px solid #CCC',
                        padding: '10px',
                        fontSize: '13px',
                    }}
                    >
                    <option value="">Chọn quyền</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
            </Dialog>
            <Dialog visible={deleteBacsiDialog} style={{ width: '450px' }} header="Xác nhận xóa" footer={deleteBacsiFooter} onHide={() => setDeleteBacsiDialog(false)}>
                <p>Bạn có chắc chắn muốn xóa khách hàng <strong>{bacsi.hoten}</strong> không?</p>
            </Dialog>
        </div>
    );
};

export default Nhasi;
