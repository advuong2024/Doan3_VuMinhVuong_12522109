import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useRef, useState } from 'react';
import { HoadonService } from '../../demo/service/HoadonService';
import { KhachhangService } from '../../demo/service/KhachhangService';
import { EventService } from '../../demo/service/EventService';
import { BacsiService } from '../../demo/service/BacsiService';

const Hoadon = () => {
    let emptyHoadon = {
        ma_hoa_don: '',
        benhnhan_id: '',
        bacsi_id: '',
        ngaytao: new Date().toISOString().split('T')[0],
        trangthai: 'Chưa thanh toán',
    };

    let emptyChiTiet = {
        ma_chi_tiet: '',
        dichvu_id: '',
        gia: 0,
    };

    const [hoadons, setHoadons] = useState([]);
    const [hoadonDialog, setHoadonDialog] = useState(false);
    const [deleteHoadonDialog, setDeleteHoadonDialog] = useState(false);
    const [viewHoadonDialog, setViewHoadonDialog] = useState(false);
    const [hoadon, setHoadon] = useState(emptyHoadon);
    const [chiTietHoaDon, setChiTietHoaDon] = useState([]);
    const [originalChiTiet, setOriginalChiTiet] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [services, setServices] = useState([]);
    const [benhnhans, setBenhnhans] = useState([]);
    const [bacsis, setBacsis] = useState([]);
    const toast = useRef(null);
    const dt = useRef(null);
    const [errors, setErrors] = useState({
        benhnhan_id: '',
        bacsi_id: '',
        ngaytao: '',
        dichvu: ''
    });

    useEffect(() => {
        let isMounted = true;
        Promise.all([
            EventService.getdichvu(),
            BacsiService.getbacsi(),
            KhachhangService.getKhachhang(),
            HoadonService.gethoadon(),
        ]).then(([dichvuData, bacsiData, benhnhanData, hoadonData]) => {
            if (isMounted) {
                setServices(dichvuData);
                setBacsis(bacsiData);
                setBenhnhans(benhnhanData);
                setHoadons(hoadonData.map(hd => ({
                    ...hd,
                    benhnhan_name: benhnhanData.find(bn => bn.benhnhan_id === hd.benhnhan_id)?.hoten || 'Không xác định',
                    bacsi_name: bacsiData.find(bs => bs.bacsi_id === hd.bacsi_id)?.hoten || 'Không xác định',
                })));
            }
        }).catch(error => {
            console.error('Lỗi khi tải dữ liệu ban đầu:', error);
            toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải dữ liệu', life: 3000 });
        });
        return () => { isMounted = false; };
    }, []);

    const validateForm = () => {
        let valid = true;
        let newErrors = {
            benhnhan_id: '',
            bacsi_id: '',
            ngaytao: '',
            dichvu: ''
        };

        // Validate bệnh nhân
        if (!hoadon.benhnhan_id) {
            newErrors.benhnhan_id = 'Vui lòng chọn bệnh nhân';
            valid = false;
        }

        // Validate bác sĩ
        if (!hoadon.bacsi_id) {
            newErrors.bacsi_id = 'Vui lòng chọn bác sĩ';
            valid = false;
        }

        // Validate ngày tạo
        if (!hoadon.ngaytao) {
            newErrors.ngaytao = 'Vui lòng chọn ngày tạo';
            valid = false;
        } else {
            const selectedDate = new Date(hoadon.ngaytao);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate > today) {
                newErrors.ngaytao = 'Ngày tạo không được lớn hơn ngày hiện tại';
                valid = false;
            }
        }

        // Validate chi tiết hóa đơn
        if (chiTietHoaDon.length === 0) {
            newErrors.dichvu = 'Vui lòng thêm ít nhất một dịch vụ';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const openNew = () => {
        setHoadon(emptyHoadon);
        setChiTietHoaDon([]);
        setOriginalChiTiet([]);
        setSubmitted(false);
        setErrors({
            benhnhan_id: '',
            bacsi_id: '',
            ngaytao: '',
            dichvu: ''
        });
        setHoadonDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setHoadonDialog(false);
        setErrors({
            benhnhan_id: '',
            bacsi_id: '',
            ngaytao: '',
            dichvu: ''
        });
    };

    const hideViewDialog = () => {
        setViewHoadonDialog(false);
    };

    const handleAddDichvu = (dichvu_id) => {
        const existing = chiTietHoaDon.find(dv => dv.dichvu_id === dichvu_id);
        if (existing) return;

        const dv = services.find(d => d.dichvu_id === dichvu_id);
        if (dv) {
            const chiTiet = {
                ma_chi_tiet: createIdCT(),
                dichvu_id: dv.dichvu_id,
                gia: dv.gia_event || 0,
            };
            setChiTietHoaDon([...chiTietHoaDon, chiTiet]);
        }
    };

    const handleRemoveDichvu = (ma_chi_tiet) => {
        setChiTietHoaDon(chiTietHoaDon.filter(ct => ct.ma_chi_tiet !== ma_chi_tiet));
    };

    const createIdCT = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const createId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const saveHoadon = async () => {
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
      
        try {
          let _hoadon = { ...hoadon };
          const isEditing = !!_hoadon.ma_hoa_don;

          _hoadon.ngaytao = formatDate(_hoadon.ngaytao);
      
          if (!isEditing) {
            // Tạo hóa đơn mới
            const newId = createId();
            if (typeof newId !== 'string') {
              throw new Error('Mã hóa đơn tạo ra không hợp lệ');
            }
            _hoadon.ma_hoa_don = newId;
            await HoadonService.posthoadon(_hoadon);
      
            if (chiTietHoaDon.length > 0) {
              for (const chiTiet of chiTietHoaDon) {
                if (!chiTiet.dichvu_id || !chiTiet.gia) {
                  throw new Error('Chi tiết hóa đơn không hợp lệ');
                }
                const chiTietData = {
                  ma_chi_tiet: chiTiet.ma_chi_tiet || createId(),
                  ma_hoa_don: _hoadon.ma_hoa_don,
                  dichvu_id: chiTiet.dichvu_id,
                  gia: chiTiet.gia,
                };
                await HoadonService.poschitietHD(chiTietData);
              }
            }
          } else {
            // Cập nhật hóa đơn
            if (! _hoadon.ma_hoa_don || typeof _hoadon.ma_hoa_don !== 'string') {
              throw new Error('Mã hóa đơn không hợp lệ khi cập nhật');
            }
            const { benhnhan_name, bacsi_name, ...hoadonData } = _hoadon;
            await HoadonService.puthoadon(hoadon.ma_hoa_don,hoadonData);
      
            const deletedChiTiet = originalChiTiet.filter(
              (oc) => !chiTietHoaDon.some((nc) => nc.ma_chi_tiet === oc.ma_chi_tiet)
            );
            for (const ct of deletedChiTiet) {
              await HoadonService.deleteChitietHD(ct.ma_chi_tiet);
            }
      
            for (const chiTiet of chiTietHoaDon) {
              const chiTietData = {
                ma_chi_tiet: chiTiet.ma_chi_tiet || createId(),
                ma_hoa_don: _hoadon.ma_hoa_don,
                dichvu_id: chiTiet.dichvu_id,
                gia: chiTiet.gia,
              };
              const isNewChiTiet = !originalChiTiet.some((oc) => oc.ma_chi_tiet === chiTiet.ma_chi_tiet);
              if (isNewChiTiet) {
                await HoadonService.poschitietHD(chiTietData);
              }
            }
          }
      
          const updatedHoadons = await HoadonService.gethoadon();
          setHoadons(
            updatedHoadons.map((hd) => ({
              ...hd,
              benhnhan_name:
                benhnhans.find((bn) => bn.benhnhan_id === hd.benhnhan_id)?.hoten || 'Không xác định',
              bacsi_name: bacsis.find((bs) => bs.bacsi_id === hd.bacsi_id)?.hoten || 'Không xác định',
            }))
          );
      
          toast.current.show({
            severity: 'success',
            summary: 'Thành công',
            detail: isEditing ? 'Cập nhật hóa đơn thành công' : 'Lưu hóa đơn thành công',
            life: 3000,
          });
          setHoadonDialog(false);
          setHoadon(emptyHoadon);
          setChiTietHoaDon([]);
          setOriginalChiTiet([]);
          setErrors({
                benhnhan_id: '',
                bacsi_id: '',
                ngaytao: '',
                dichvu: ''
            });
        } catch (error) {
          console.error('Lỗi khi lưu hóa đơn:', error);
          toast.current.show({
            severity: 'error',
            summary: 'Lỗi',
            detail: error.message || 'Không thể lưu hóa đơn',
            life: 3000,
          });
        }
    };

    const deleteHoadon = async () => {
        try {
            const maHoaDon = hoadon.ma_hoa_don;
            const chiTietData = await HoadonService.getByMaHD(maHoaDon);
            if (chiTietData && chiTietData.length > 0) {
                for (const ct of chiTietData) {
                    await HoadonService.deleteChitietHD(ct.ma_chi_tiet);
                }
            }

            await HoadonService.deleteHoadon(maHoaDon);

            setHoadons(hoadons.filter(hd => hd.ma_hoa_don !== maHoaDon));
            setDeleteHoadonDialog(false);
            setHoadon(emptyHoadon);
            toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa hóa đơn và chi tiết liên quan', life: 3000 });
        } catch (error) {
            console.error('Lỗi khi xóa hóa đơn:', error);
            toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể xóa hóa đơn', life: 3000 });
        }
    };

    const viewHoadon = async (rowData) => {
        setHoadon(rowData);
        try {
            const chiTietData = await HoadonService.getByMaHD(rowData.ma_hoa_don);
            setChiTietHoaDon(chiTietData || []);
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết hóa đơn:', error);
            setChiTietHoaDon([]);
            toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải chi tiết hóa đơn', life: 3000 });
        }
        setViewHoadonDialog(true);
    };

    const printHoadon = () => {
        const printContent = document.getElementById('print-area').innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>In hóa đơn</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        .invoice { max-width: 800px; margin: auto; border: 1px solid #ccc; padding: 20px; }
                        .invoice h2 { text-align: center; }
                        .invoice table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        .invoice th, .invoice td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        .invoice th { background-color: #f2f2f2; }
                        .total { font-weight: bold; margin-top: 20px; text-align: right; }
                        @media print {
                            .no-print { display: none; }
                        }
                    </style>
                </head>
                <body>
                    ${printContent}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    const handlePrintHoadon = async (rowData) => {
        try{
            const result = await HoadonService.updateStatus(rowData.maHoaDon);
            if (result && !Array.isArray(result)) {
                toast.current.show({severity: 'success', summary: 'Thành công', detail: 'Cập nhập trạng thái hóa đơn thành công', life: 3000});
                printHoadon();
            } else{
                throw new Error('phản hồi không hợp lệ từ API');
            }
        }catch (error) {
            console.error('Lỗi khi cập nhập trạng thái hóa đơn:', error);
            toast.current.show({severity: 'error', summary: 'Lỗi', detail: 'Không thể cập nhập trạng thái hóa đơn', life: 3000});
        }
    }

    const editHoadon = async (rowData) => {
        setHoadon(rowData);
        try {
            const chiTietData = await HoadonService.getByMaHD(rowData.ma_hoa_don);
            setChiTietHoaDon(chiTietData || []);
            setOriginalChiTiet([...chiTietData] || []);
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết hóa đơn:', error);
            setChiTietHoaDon([]);
            setOriginalChiTiet([]);
            toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải chi tiết hóa đơn', life: 3000 });
        }
        setHoadonDialog(true);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const d = new Date(dateString);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h4 className="m-0">Hóa đơn</h4>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar
                        className="mb-4"
                        left={() => (
                            <Button label="Thêm mới" icon="pi pi-plus" className="mr-2" onClick={openNew} />
                        )}
                    />

                    <DataTable ref={dt} value={hoadons} paginator rows={5} globalFilter={globalFilter} header={header}>
                        <Column header="STT" body={(rowData, options) => options.rowIndex + 1} className="text-center" />
                        <Column field="bacsi_name" header="Nha Sĩ" />
                        <Column field="benhnhan_name" header="Bệnh Nhân" />
                        <Column field="ngaytao" header="Ngày Tạo" sortable body={(rowData) => formatDate(rowData.ngaytao)} />
                        <Column field="trangthai" header="Trạng Thái" />
                        <Column
                            body={(rowData) => (
                                <div>
                                    <Button icon="pi pi-eye" className="mr-2" onClick={() => viewHoadon(rowData)} />
                                    <Button icon="pi pi-pencil" className="mr-2" onClick={() => editHoadon(rowData)} />
                                    <Button icon="pi pi-trash" onClick={() => { setHoadon(rowData); setDeleteHoadonDialog(true); }} />
                                </div>
                            )}
                            headerStyle={{ width: '12rem' }}
                        />
                    </DataTable>

                    {/* Dialog thêm/sửa hóa đơn */}
                    <Dialog
                        visible={hoadonDialog}
                        style={{ width: '600px' }}
                        header={"Thông tin hóa đơn"}
                        modal
                        className="p-fluid"
                        footer={(
                            <>
                                <Button label="Hủy" icon="pi pi-times" onClick={hideDialog} />
                                <Button label="Lưu" icon="pi pi-check" onClick={saveHoadon} />
                            </>
                        )}
                        onHide={hideDialog}
                    >
                        <div className="field">
                            <label>Bệnh Nhân</label>
                            <select
                                className={`w-full p-2 border rounded ${errors.benhnhan_id ? 'border-red-500' : ''}`}
                                value={hoadon.benhnhan_id}
                                onChange={(e) => {
                                    setHoadon({ ...hoadon, benhnhan_id: e.target.value });
                                    setErrors({ ...errors, benhnhan_id: '' });
                                }}
                            >
                                <option value="">-- Chọn bệnh nhân --</option>
                                {benhnhans.map(bn => (
                                    <option key={bn.benhnhan_id} value={bn.benhnhan_id}>
                                        {bn.hoten}
                                    </option>
                                ))}
                            </select>
                            {errors.benhnhan_id && (
                                <small className="p-error block">{errors.benhnhan_id}</small>
                            )}
                        </div>
                        <div className="field">
                            <label>Nha Sĩ</label>
                            <select
                                className={`w-full p-2 border rounded ${errors.bacsi_id ? 'border-red-500' : ''}`}
                                value={hoadon.bacsi_id}
                                onChange={(e) => {
                                    setHoadon({ ...hoadon, bacsi_id: e.target.value });
                                    setErrors({ ...errors, bacsi_id: '' });
                                }}
                            >
                                <option value="">-- Chọn Nha sĩ --</option>
                                {bacsis.map(bs => (
                                    <option key={bs.bacsi_id} value={bs.bacsi_id}>
                                        {bs.hoten}
                                    </option>
                                ))}
                            </select>
                            {errors.bacsi_id && (
                                <small className="p-error block">{errors.bacsi_id}</small>
                            )}
                        </div>
                        <div className="field">
                            <label>Ngày Tạo</label>
                            <InputText
                                type="date"
                                readOnly
                                className={`w-full ${errors.ngaytao ? 'p-invalid' : ''}`}
                                value={hoadon.ngaytao ? formatDate(hoadon.ngaytao) : ""}
                                onChange={(e) => {
                                    setHoadon({ ...hoadon, ngaytao: e.target.value });
                                    setErrors({ ...errors, ngaytao: '' });
                                }}
                            />
                            {errors.ngaytao && (
                                <small className="p-error block">{errors.ngaytao}</small>
                            )}
                        </div>
                        <div className="field">
                            <label>Chọn Dịch Vụ</label>
                            <select
                                className="w-full p-2 border rounded"
                                value=""
                                onChange={(e) => handleAddDichvu(e.target.value)}
                            >
                                <option value="">-- Chọn dịch vụ --</option>
                                {services.map(dv => (
                                    <option key={dv.dichvu_id} value={dv.dichvu_id}>
                                        {dv.ten_event} - {Number(dv.gia_event).toLocaleString('vi-VN')}₫
                                    </option>
                                ))}
                            </select>
                            {errors.dichvu && (
                                <small className="p-error block">{errors.dichvu}</small>
                            )}
                        </div>

                        {chiTietHoaDon.length > 0 && (
                            <DataTable value={chiTietHoaDon} className="mt-3">
                                <Column
                                    field="dichvu_id"
                                    header="Dịch Vụ"
                                    body={(rowData) => services.find(dv => dv.dichvu_id === rowData.dichvu_id)?.ten_event}
                                />
                                <Column
                                    field="gia"
                                    header="Giá"
                                    body={(rowData) => Number(rowData.gia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                />
                                <Column
                                    body={(rowData) => (
                                        <Button
                                            icon="pi pi-trash"
                                            onClick={() => handleRemoveDichvu(rowData.ma_chi_tiet)}
                                        />
                                    )}
                                />
                            </DataTable>
                        )}
                    </Dialog>

                    {/* Dialog xem chi tiết hóa đơn */}
                    <Dialog
                        visible={viewHoadonDialog}
                        style={{ width: '600px' }}
                        header="Hóa đơn"
                        modal
                        className="p-fluid"
                        footer={(
                            <>
                                <Button label="Đóng" icon="pi pi-times" onClick={hideViewDialog} />
                                <Button label="In hóa đơn" icon="pi pi-print" onClick={() => handlePrintHoadon(rowData)} />
                            </>
                        )}
                        onHide={hideViewDialog}
                    >
                        <div id="print-area">
                            <div className="invoice" style={{
                                fontFamily: 'Arial, sans-serif',
                                padding: '20px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                maxWidth: '100%',
                                margin: '0 auto'
                            }}>
                                <h2 style={{
                                    textAlign: 'center',
                                    color: '#f00',
                                    marginBottom: '20px',
                                    fontSize: '24px',
                                    borderBottom: '2px solid #007bff',
                                    paddingBottom: '10px'
                                }}>HÓA ĐƠN THANH TOÁN</h2>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 2fr',
                                    gap: '10px',
                                    marginBottom: '20px'
                                }}>
                                    <p style={{ fontWeight: 'bold', margin: '0', color: '#555' }}>Mã hóa đơn:</p>
                                    <p style={{ margin: '0' }}>{hoadon.ma_hoa_don}</p>

                                    <p style={{ fontWeight: 'bold', margin: '0', color: '#555' }}>Nha sĩ:</p>
                                    <p style={{ margin: '0' }}>{bacsis.find(bs => bs.bacsi_id === hoadon.bacsi_id)?.hoten || 'Không xác định'}</p>

                                    <p style={{ fontWeight: 'bold', margin: '0', color: '#555' }}>SĐT nha sĩ:</p>
                                    <p style={{ margin: '0' }}>{bacsis.find(bs => bs.bacsi_id === hoadon.bacsi_id)?.SDT || 'Không có'}</p>

                                    <p style={{ fontWeight: 'bold', margin: '0', color: '#555' }}>Bệnh nhân:</p>
                                    <p style={{ margin: '0' }}>{benhnhans.find(bn => bn.benhnhan_id === hoadon.benhnhan_id)?.hoten || 'Không xác định'}</p>

                                    <p style={{ fontWeight: 'bold', margin: '0', color: '#555' }}>SĐT bệnh nhân:</p>
                                    <p style={{ margin: '0' }}>{benhnhans.find(bn => bn.benhnhan_id === hoadon.benhnhan_id)?.SDT || 'Không có'}</p>

                                    <p style={{ fontWeight: 'bold', margin: '0', color: '#555' }}>Ngày tạo:</p>
                                    <p style={{ margin: '0' }}>{formatDate(hoadon.ngaytao)}</p>
                                </div>

                                <h3 style={{
                                    fontSize: '18px',
                                    color: '#333',
                                    marginBottom: '15px',
                                    borderBottom: '1px solid #ddd',
                                    paddingBottom: '5px'
                                }}>Danh sách dịch vụ</h3>

                                {chiTietHoaDon.length > 0 ? (
                                    <table style={{
                                        width: '100%',
                                        borderCollapse: 'collapse',
                                        marginBottom: '20px',
                                        fontSize: '14px'
                                    }}>
                                        <thead>
                                            <tr style={{ backgroundColor: '#f5f5f5', color: '#333' }}>
                                                <th style={{ padding: '1px', border: '1px solid #000', textAlign: 'center' }}>STT</th>
                                                <th style={{ padding: '10px', border: '1px solid #000', textAlign: 'center' }}>Tên dịch vụ</th>
                                                <th style={{ padding: '10px', border: '1px solid #000', textAlign: 'Center' }}>Giá</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {chiTietHoaDon.map((ct, index) => (
                                                <tr key={ct.ma_chi_tiet} style={{ borderBottom: '1px solid #eee'}}>
                                                    <td style={{ padding: '1px', border: '1px solid #000', textAlign: 'center' }}>
                                                        {index + 1}
                                                    </td>
                                                    <td style={{ padding: '10px', border: '1px solid #000' }}>
                                                        {services.find(dv => dv.dichvu_id === ct.dichvu_id)?.ten_event || 'Không xác định'}
                                                    </td>
                                                    <td style={{ padding: '10px', border: '1px solid #000', textAlign: 'right' }}>
                                                        {Number(ct.gia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p style={{ color: '#777', fontStyle: 'italic' }}>Không có dịch vụ nào.</p>
                                )}

                                <div className="total" style={{
                                    textAlign: 'right',
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    color: '#f00',
                                    marginTop: '20px'
                                }}>
                                    <p>Tổng tiền: {chiTietHoaDon.reduce((sum, ct) => sum + ct.gia, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                </div>
                            </div>
                        </div>
                    </Dialog>

                    {/* Dialog xóa hóa đơn */}
                    <Dialog
                        visible={deleteHoadonDialog}
                        style={{ width: '450px' }}
                        header="Xác nhận"
                        modal
                        footer={(
                            <>
                                <Button label="Hủy" icon="pi pi-times" onClick={() => setDeleteHoadonDialog(false)} />
                                <Button label="Xóa" icon="pi pi-check" onClick={deleteHoadon} />
                            </>
                        )}
                        onHide={() => setDeleteHoadonDialog(false)}
                    >
                        <div>Bạn có chắc muốn xóa hóa đơn này?</div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Hoadon;