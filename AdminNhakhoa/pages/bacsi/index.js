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
    const [quyen, setQuyen] = useState(null); // State để lưu quyen từ localStorage
    const toast = useRef(null);
    const [errors, setErrors] = useState({
        hoten: '',
        ngaysinh: '',
        Gioitinh: '',
        diachi: '',
        email: '',
        SDT: '',
        taikhoan: '',
        matkhau: '',
        quyen: ''
    });

    // Lấy quyen từ localStorage và lấy danh sách bác sĩ
    useEffect(() => {
        let isMounted = true;

        // Lấy quyen từ localStorage
        if (typeof window !== "undefined") {
            const storedQuyen = localStorage.getItem('quyen');
            if (storedQuyen) {
                setQuyen(storedQuyen);
            }
        }

        // Lấy danh sách bác sĩ
        BacsiService.getbacsi().then(data => {
            if (isMounted) {
                setBacsis(data);
            }
        });

        return () => { isMounted = false; };
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        
        if (typeof dateString === "string" && dateString.length === 10) return dateString;
    
        const d = new Date(dateString);
        return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {
            hoten: '',
            ngaysinh: '',
            Gioitinh: '',
            diachi: '',
            email: '',
            SDT: '',
            taikhoan: '',
            matkhau: '',
            quyen: ''
        };

        if (!bacsi.hoten.trim()) {
            newErrors.hoten = 'Họ tên không được để trống';
            valid = false;
        } else if (bacsi.hoten.length < 3) {
            newErrors.hoten = 'Họ tên phải có ít nhất 3 ký tự';
            valid = false;
        }

        if (!bacsi.ngaysinh) {
            newErrors.ngaysinh = 'Ngày sinh không được để trống';
            valid = false;
        } else {
            const dob = new Date(bacsi.ngaysinh);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const m = today.getMonth() - dob.getMonth();
            
            if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
                age--;
            }

            if (age < 18 || age > 100) {
                newErrors.ngaysinh = 'Tuổi phải từ 18 đến 100';
                valid = false;
            }
        }

        if (!bacsi.Gioitinh) {
            newErrors.Gioitinh = 'Vui lòng chọn giới tính';
            valid = false;
        }

        if (!bacsi.diachi.trim()) {
            newErrors.diachi = 'Địa chỉ không được để trống';
            valid = false;
        }

        if (!bacsi.email.trim()) {
            newErrors.email = 'Email không được để trống';
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bacsi.email)) {
            newErrors.email = 'Email không hợp lệ';
            valid = false;
        }

        if (!bacsi.SDT.trim()) {
            newErrors.SDT = 'Số điện thoại không được để trống';
            valid = false;
        } else if (!/^\d{10}$/.test(bacsi.SDT)) {
            newErrors.SDT = 'Số điện thoại phải là 10 chữ số';
            valid = false;
        }

        if (!bacsi.taikhoan.trim()) {
            newErrors.taikhoan = 'Tài khoản không được để trống';
            valid = false;
        } else if (bacsi.taikhoan.length < 4) {
            newErrors.taikhoan = 'Tài khoản phải có ít nhất 4 ký tự';
            valid = false;
        }

        if (!bacsi.matkhau.trim()) {
            newErrors.matkhau = 'Mật khẩu không được để trống';
            valid = false;
        } else if (bacsi.matkhau.length < 6) {
            newErrors.matkhau = 'Mật khẩu phải có ít nhất 6 ký tự';
            valid = false;
        }

        if (!bacsi.quyen) {
            newErrors.quyen = 'Vui lòng chọn quyền';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const openNew = () => {
        setBacsi(emptyBacsi);
        setSubmitted(false);
        setErrors({
            hoten: '',
            ngaysinh: '',
            Gioitinh: '',
            diachi: '',
            email: '',
            SDT: '',
            taikhoan: '',
            matkhau: '',
            quyen: ''
        });
        setBacsiDialog(true);
    };

    const LoadPage = async () => {
        const data = await BacsiService.getbacsi();
        setBacsis(data);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setBacsiDialog(false);
        setErrors({
            hoten: '',
            ngaysinh: '',
            Gioitinh: '',
            diachi: '',
            email: '',
            SDT: '',
            taikhoan: '',
            matkhau: '',
            quyen: ''
        });
    };

    const saveBacsi = async () => {
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

        let _bacsi = { ...bacsi };
        _bacsi.ngaysinh = formatDate(_bacsi.ngaysinh);

        try {
            if (bacsi.bacsi_id) {
                const updatedBacsi = await BacsiService.putbacsi(bacsi.bacsi_id, _bacsi);
                let _bacsis = bacsis.map(bs => 
                    bs.bacsi_id === bacsi.bacsi_id ? updatedBacsi : bs
                );
                setBacsis(_bacsis);
                toast.current.show({ severity: "success", summary: "Thành công", detail: "Cập nhật bác sĩ", life: 3000 });
            } else {
                _bacsi.bacsi_id = createId();
                const newBacsi = await BacsiService.postbacsi(_bacsi);
                setBacsis([...bacsis, newBacsi]);
                toast.current.show({ severity: "success", summary: "Thành công", detail: "Thêm bác sĩ mới", life: 3000 });
            }
            
            setBacsiDialog(false);
            setBacsi(emptyBacsi);
            LoadPage();
        } catch (error) {
            console.error("Lỗi khi lưu bác sĩ:", error);
            toast.current.show({ severity: "error", summary: "Lỗi", detail: "Không thể lưu bác sĩ", life: 3000 });
        }
    };

    const confirmDeleteBacsi = (bacsi) => {
        setBacsi(bacsi);
        setDeleteBacsiDialog(true);
    };

    const deleteBacsi = async () => {
        try {
            const response = await BacsiService.deletebacsi(bacsi.bacsi_id);
    
            if (response) {
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

    // Cột hành động (Sửa, Xóa)
    const actionBodyTemplate = (rowData) => {
        return (
            <div>
                <Button
                    icon="pi pi-pencil"
                    onClick={() => { setBacsi(rowData); setBacsiDialog(true); }}
                    disabled={quyen === 'User'} // Vô hiệu hóa nếu là User
                />
                <Button
                    icon="pi pi-trash"
                    className="ml-2"
                    onClick={() => confirmDeleteBacsi(rowData)}
                    disabled={quyen === 'User'} // Vô hiệu hóa nếu là User
                />
            </div>
        );
    };

    return (
        <div className="card">
            <Toast ref={toast} />
            <Toolbar
                className="mb-4"
                left={() => (
                    quyen !== 'User' && ( // Ẩn nút Thêm nếu là User
                        <Button label="Thêm mới" icon="pi pi-plus" onClick={openNew} />
                    )
                )}
            />

            <DataTable
                value={bacsis}
                paginator
                rows={5}
                globalFilter={globalFilter}
                header={header}
            > 
                <Column header="STT" body={(rowData, options) => options.rowIndex + 1} className='text-center'/> 
                <Column field="hoten" header="Họ Tên"></Column>
                <Column field="ngaysinh" header="Ngày sinh" sortable body={(rowData) => formatDate(rowData.ngaysinh)}></Column>
                <Column field="Gioitinh" header="Giới tính" className='text-center'></Column>
                <Column field="diachi" header="Địa chỉ"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="SDT" header="SĐT" className='text-center'></Column>
                <Column field="quyen" header="Quyền"></Column>
                {quyen !== 'User' && ( // Ẩn cột Hành động nếu là User
                    <Column body={actionBodyTemplate} header="Hành động" />
                )}
            </DataTable>

            <Dialog
                visible={bacsiDialog}
                style={{ width: '450px' }}
                header="Thông tin bác sĩ"
                modal
                className="p-fluid"
                footer={bacsiDialogFooter}
                onHide={hideDialog}
            >
                <div className="field">
                    <label htmlFor="hoten">Họ tên</label>
                    <InputText 
                        id="hoten"
                        value={bacsi.hoten} 
                        onChange={(e) => {
                            setBacsi({ ...bacsi, hoten: e.target.value });
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
                        value={bacsi.ngaysinh ? formatDate(bacsi.ngaysinh) : ""}
                        onChange={(e) => {
                            setBacsi({ ...bacsi, ngaysinh: e.target.value });
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
                        value={bacsi.Gioitinh}
                        onChange={(e) => {
                            setBacsi({ ...bacsi, Gioitinh: e.target.value });
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
                        value={bacsi.diachi} 
                        onChange={(e) => {
                            setBacsi({ ...bacsi, diachi: e.target.value });
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
                        value={bacsi.email} 
                        onChange={(e) => {
                            setBacsi({ ...bacsi, email: e.target.value });
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
                        value={bacsi.SDT} 
                        onChange={(e) => {
                            setBacsi({ ...bacsi, SDT: e.target.value });
                            setErrors({ ...errors, SDT: '' });
                        }} 
                        className={errors.SDT ? 'p-invalid' : ''}
                        placeholder="Nhập số điện thoại"
                    />
                    {errors.SDT && <small className="p-error">{errors.SDT}</small>}
                </div>

                <div className="field">
                    <label htmlFor="taikhoan">Tài khoản</label>
                    <InputText 
                        id="taikhoan"
                        value={bacsi.taikhoan} 
                        onChange={(e) => {
                            setBacsi({ ...bacsi, taikhoan: e.target.value });
                            setErrors({ ...errors, taikhoan: '' });
                        }} 
                        className={errors.taikhoan ? 'p-invalid' : ''}
                        placeholder="Nhập tài khoản"
                    />
                    {errors.taikhoan && <small className="p-error">{errors.taikhoan}</small>}
                </div>

                <div className="field">
                    <label htmlFor="matkhau">Mật khẩu</label>
                    <InputText 
                        id="matkhau"
                        value={bacsi.matkhau} 
                        onChange={(e) => {
                            setBacsi({ ...bacsi, matkhau: e.target.value });
                            setErrors({ ...errors, matkhau: '' });
                        }} 
                        className={errors.matkhau ? 'p-invalid' : ''}
                        placeholder="Nhập mật khẩu"
                    />
                    {errors.matkhau && <small className="p-error">{errors.matkhau}</small>}
                </div>

                <div className="field">
                    <label htmlFor="quyen">Quyền</label>
                    <select
                        id="quyen"
                        value={bacsi.quyen}
                        onChange={(e) => {
                            setBacsi({ ...bacsi, quyen: e.target.value });
                            setErrors({ ...errors, quyen: '' });
                        }}
                        className={`w-full p-2 border rounded ${errors.quyen ? 'border-red-500' : ''}`}
                    >
                        <option value="">Chọn quyền</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                    {errors.quyen && <small className="p-error">{errors.quyen}</small>}
                </div>
            </Dialog>

            <Dialog
                visible={deleteBacsiDialog}
                style={{ width: '450px' }}
                header="Xác nhận xóa"
                footer={deleteBacsiFooter}
                onHide={() => setDeleteBacsiDialog(false)}
            >
                <p>Bạn có chắc chắn muốn xóa bác sĩ <strong>{bacsi.hoten}</strong> không?</p>
            </Dialog>
        </div>
    );
};

export default Nhasi;