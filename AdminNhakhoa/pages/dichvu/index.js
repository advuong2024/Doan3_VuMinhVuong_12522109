import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import {EventService} from "../../demo/service/EventService"
import { InputNumber } from "primereact/inputnumber";

const dichvuManagement = () => {
    const emptydichvu = { dichvu_id: "", ten_event: "", mo_ta: "", anh_event: "", gia_event: "" };
    const [dichvus, setdichvus] = useState([]);
    const [dichvu, setdichvu] = useState(emptydichvu);
    const [dichvuDialog, setdichvuDialog] = useState(false);
    const [deletedichvuDialog, setDeleteDichvuDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const toast = useRef(null);
    const [anh_event, setanhs] = useState([])
    const [errors, setErrors] = useState({
        ten_event: '',
        mo_ta: '',
        gia_event: '',
        anh_event: ''
    });

    useEffect(() => {
        let isMounted = true;
        EventService.getdichvu().then(data => {
            if (isMounted) {
                setdichvus(data);
            }
        });
            
        return () => { isMounted = false; };
    }, []);

    const validateForm = () => {
        let valid = true;
        let newErrors = {
            ten_event: '',
            mo_ta: '',
            gia_event: '',
            anh_event: ''
        };

        // Validate tên dịch vụ
        if (!dichvu.ten_event.trim()) {
            newErrors.ten_event = 'Tên dịch vụ không được để trống';
            valid = false;
        } else if (dichvu.ten_event.length < 3) {
            newErrors.ten_event = 'Tên dịch vụ phải có ít nhất 3 ký tự';
            valid = false;
        }

        // Validate mô tả
        if (!dichvu.mo_ta.trim()) {
            newErrors.mo_ta = 'Mô tả không được để trống';
            valid = false;
        }

        // Validate giá
        if (!dichvu.gia_event || dichvu.gia_event <= 0) {
            newErrors.gia_event = 'Giá phải lớn hơn 0';
            valid = false;
        }

        // Validate ảnh (chỉ kiểm tra khi thêm mới)
        if (!dichvu.dichvu_id && !selectedImage) {
            newErrors.anh_event = 'Vui lòng chọn ảnh';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const openNew = () => {
        setdichvu(emptydichvu);
        setSelectedImage(null);
        setSubmitted(false);
        setErrors({
            ten_event: '',
            mo_ta: '',
            gia_event: '',
            anh_event: ''
        });
        setdichvuDialog(true);
    };

    const hideDialog = () => {
        setdichvuDialog(false);
        setSubmitted(false);
        setErrors({
            ten_event: '',
            mo_ta: '',
            gia_event: '',
            anh_event: ''
        });
    };

    const LoadPage = async () => {
        const data = await EventService.getdichvu();
        setdichvus(data);
    };

    const savedichvu = async () => {
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

        let _dichvu = { ...dichvu };
        try {
            if (dichvu.dichvu_id) {
                // Cập nhật dịch vụ
                await EventService.putdichvu(dichvu.dichvu_id, _dichvu, selectedImage);
                toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật dịch vụ', life: 3000 });
            } else {
                // Thêm dịch vụ mới
                _dichvu.dichvu_id = createId();
                await EventService.postdichvu(_dichvu, selectedImage);
                toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Thêm dịch vụ mới', life: 3000 });
            }
            setdichvuDialog(false);
            setdichvu(emptydichvu);
            setSelectedImage(null);
            LoadPage();
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể xử lý yêu cầu', life: 3000 });
        }
    };

    const editdichvu = (dichvu) => {
        setdichvu(dichvu);
        setdichvuDialog(true);
    };

    const confirmDeletedichvu= (dichvu) => {
        setdichvu(dichvu);
        setDeleteDichvuDialog(true);
    };

    const deleteDichvu = async () => {
        try {
            // Gọi API để xóa dịch vụ
            const response = await EventService.deletedichvu(dichvu.dichvu_id);
    
            if (response) {
                // Cập nhật danh sách sau khi xóa thành công
                let _dichvus = dichvus.filter(val => val.dichvu_id !== dichvu.dichvu_id);
                setdichvus(_dichvus);
    
                toast.current.show({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Xóa dịch vụ thành công',
                    life: 3000
                });
            } else {
                throw new Error("Không thể xóa dịch vụ.");
            }
        } catch (error) {
            console.error("Lỗi khi xóa dịch vụ:", error);
            toast.current.show({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Xóa dịch vụ thất bại',
                life: 3000
            });
        } finally {
            // Đóng dialog và reset trạng thái
            setDeleteDichvuDialog(false);
            setdichvu(emptydichvu);
        }
    };    

    const createId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        setdichvu({ ...dichvu, [name]: val });
    };

    const onFileUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
            setdichvu({ ...dichvu, anh_event: e.target.files[0].name });
        }
    };
    // const onFileUpload = (e) => {
    //     setanhs(e.target.files);
    // }
    // const incacanh = () =>
    //     [...anh_event].map((anh, index) => (
    //         <div key={index}>
    //             <img src={URL.createObjectURL(anh)} width="200px" />
    //         </div>
    // ));
    const dichvuDialogFooter = () =>{
        return(
            <>
                <Button label="Hủy" icon="pi pi-times" onClick={hideDialog} />
                <Button label="Lưu" icon="pi pi-check" onClick={savedichvu} />
            </>
        )
    }

    const deleteDichvuFooter = (
        <>
            <Button label="Không" icon="pi pi-times" onClick={() => setDeleteDichvuDialog(false)} />
            <Button label="Có" icon="pi pi-check" onClick={deleteDichvu} />
        </>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil"  onClick={() => editdichvu(rowData)} />
                <Button icon="pi pi-trash" className="ml-2" onClick={() => confirmDeletedichvu(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h4 className="m-0">Dịch vụ</h4>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const formatCurrency = (value) => {
        return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    return (
        <div className="card">
            <Toast ref={toast} />
            <Toolbar className="mb-4" left={() => (
                <Button label="Thêm mới" icon="pi pi-plus" className=" mb-2" onClick={openNew} />
            )} />

            <DataTable value={dichvus} paginator rows={5} globalFilter={globalFilter} header={header}>
                <Column header="STT" body={(rowData, options) => options.rowIndex + 1} className='text-center'/>
                <Column field="ten_event" header="Tên dịch vụ" sortable></Column>
                <Column 
                    field="anh_event" 
                    header="Ảnh" 
                    body={(rowData) => (
                        rowData.anh_event ? (
                            <img 
                                src={EventService.getImageUrl(rowData.anh_event)} 
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
                <Column field="mo_ta" header="Mô tả" sortable></Column>
                <Column field="gia_event" header="Giá" sortable body={(rowData) => formatCurrency(rowData.gia_event)} />
                <Column body={actionBodyTemplate}></Column>
            </DataTable>

            <Dialog visible={dichvuDialog} onHide={() => setdichvuDialog(false)} header="Thông tin dịch vụ" footer={dichvuDialogFooter}>
                <div className="p-fluid">
                    <div className="field">
                        <label htmlFor="ten_event">Tên dịch vụ</label>
                        <InputText 
                            id="ten_event"
                            value={dichvu.ten_event} 
                            onChange={e => {
                                setdichvu({ ...dichvu, ten_event: e.target.value });
                                setErrors({ ...errors, ten_event: '' });
                            }} 
                            className={errors.ten_event ? 'p-invalid' : ''}
                            placeholder="Nhập tên dịch vụ"
                        />
                        {errors.ten_event && <small className="p-error">{errors.ten_event}</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="mo_ta">Mô tả</label>
                        <InputText 
                            id="mo_ta"
                            value={dichvu.mo_ta} 
                            onChange={e => {
                                setdichvu({ ...dichvu, mo_ta: e.target.value });
                                setErrors({ ...errors, mo_ta: '' });
                            }} 
                            className={errors.mo_ta ? 'p-invalid' : ''}
                            placeholder="Nhập mô tả"
                        />
                        {errors.mo_ta && <small className="p-error">{errors.mo_ta}</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="gia_event">Giá dịch vụ</label>
                        <InputNumber 
                            id="gia_event"
                            value={dichvu.gia_event} 
                            onValueChange={e => {
                                setdichvu({ ...dichvu, gia_event: e.value });
                                setErrors({ ...errors, gia_event: '' });
                            }} 
                            className={errors.gia_event ? 'p-invalid' : ''}
                            placeholder="Nhập giá"
                            mode="currency" 
                            currency="VND" 
                            locale="vi-VN"
                        />
                        {errors.gia_event && <small className="p-error">{errors.gia_event}</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="anh_event">Ảnh dịch vụ</label>
                        <input 
                            id="anh_event"
                            type="file" 
                            accept="image/*" 
                            onChange={onFileUpload} 
                            className={errors.anh_event ? 'p-invalid' : ''}
                        />
                        {errors.anh_event && <small className="p-error">{errors.anh_event}</small>}
                        {selectedImage && (
                            <img 
                                src={URL.createObjectURL(selectedImage)} 
                                alt="Ảnh xem trước" 
                                width="100" 
                                height="70" 
                                style={{ objectFit: 'cover', borderRadius: '8px', marginTop: '10px' }} 
                            />
                        )}
                    </div>
                </div>
            </Dialog>
            <Dialog visible={deletedichvuDialog} style={{ width: '450px' }} header="Xác nhận xóa" footer={deleteDichvuFooter} onHide={() => setDeleteDichvuDialog(false)}>
                <p>Bạn có chắc chắn muốn xóa dịch vụ <strong>{dichvu.ten_event}</strong> không?</p>
            </Dialog>
        </div>
    );
};

export default dichvuManagement;
