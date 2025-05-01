import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useRef, useState } from 'react';
import { DatlichService } from '../../demo/service/DatlichService';
import { KhachhangService } from '../../demo/service/KhachhangService';
import { EventService } from '../../demo/service/EventService';
import { BacsiService } from '../../demo/service/BacsiService';

const Datlich = () => {
    let emptydatlich = { datlich_id: "", benhnhan_id: "", bacsi_id: "", dichvu_id: "", Ngay_Kham: "", Gio_Kham: "", Trang_Thai: ""};

    const [datlichs, setDatlichs] = useState([]);
    const [datlich, setDatlich] = useState(emptydatlich);
    const [datlichDialog, setDatlichDialog] = useState(false);
    const [deleteDatlichDialog, setDeleteDatlichDialog] = useState(false);
    const [selectedDatlichs, setSelectedDatlichs] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [selectedTime, setSelectedTime] = useState("Chọn giờ");
    const [showDropdown, setShowDropdown] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);

    const fetchData = async () => {
        const data = await fetchDatlichDetails();
        setDatlichs(data);  // Cập nhật state với dữ liệu hợp nhất
    };
     
    const getBenhnhanName = (benhnhan_id, benhnhanData) => {
        const benhnhan = benhnhanData.find(bn => String(bn.benhnhan_id) === String(benhnhan_id));
        return benhnhan ? benhnhan.hoten : "Không xác định";  // Nếu không tìm thấy, trả về "Không xác định"
    };

    const getBacsiName = (bacsi_id, bacsiData) => {
        if (!bacsi_id || !bacsiData || !Array.isArray(bacsiData)) {
            console.warn('Invalid bacsi_id or bacsiData:', { bacsi_id, bacsiData });
            return "Không xác định";
        }
        const cleanedBacsiId = String(bacsi_id).trim(); // Loại bỏ khoảng trắng
        const bacsi = bacsiData.find(bs => {
            const cleanedBsId = String(bs.bacsi_id).trim();
            const isMatch = cleanedBsId === cleanedBacsiId;
            return isMatch;
        });
        if (!bacsi) {
            console.warn('No matching bacsi found for bacsi_id:', cleanedBacsiId, 'in bacsiData:', bacsiData);
        }
        return bacsi ? bacsi.hoten : "Không xác định";
    };
    
    const getDichvuName = (dichvu_id, dichvuData) => {
        if (!dichvu_id || !dichvuData || !Array.isArray(dichvuData)) {
            console.warn('Invalid dichvu_id or dichvuData:', { dichvu_id, dichvuData });
            return "Không xác định";
        }
        const cleanedDichvuId = String(dichvu_id); // Loại bỏ khoảng trắng
        const dichvu = dichvuData.find(dv => {
            const cleanedDvId = String(dv.dichvu_id).trim();
            const isMatch = cleanedDvId === cleanedDichvuId;
            return isMatch;
        });
        if (!dichvu) {
            console.warn('No matching dichvu found for dichvu_id:', cleanedDichvuId, 'in dichvuData:', dichvuData);
        }
        return dichvu ? dichvu.ten_event : "Không xác định";
    };

    useEffect(() => {
        let isMounted = true;

        // Gọi hàm fetchDatlichToday khi load trang
        if (isMounted) {
            fetchDatlichToday();
        }
    
        return () => { isMounted = false; };
    }, []);    

    useEffect(() => {
        if (datlich?.Gio_Kham) {
          setSelectedTime(datlich.Gio_Kham);
        }
    }, [datlich?.Gio_Kham]);

    // const openNew = () => {
    //     setDatlich(emptydatlich);
    //     setSubmitted(false);
    //     setDatlichDialog(true);
    // };

    const fetchDatlichToday = async () => {
        try {
            // Lấy thông tin cuộc hẹn cho ngày hôm nay
            const data = await DatlichService.getToday();
            
            if (typeof data === "string") {
                setDatlichs([]);
                console.log(data);
                return;
            }
    
            // Lấy dữ liệu bệnh nhân và dịch vụ
            const [benhnhanData, bacsiData, dichvuData] = await Promise.all([
                KhachhangService.getKhachhang(),
                BacsiService.getbacsi(),
                EventService.getdichvu(),
            ]);

            // Ánh xạ benhnhan_id và dichvu_id thành tên
            const mergedData = data.map(item => {
                const benhnhan_name = getBenhnhanName(item.benhnhan_id, benhnhanData);  // Tìm tên bệnh nhân
                const bacsi_name = getBacsiName(item.bacsi_id, bacsiData);
                const dichvu_name = getDichvuName(item.dichvu_id, dichvuData);  // Tìm tên dịch vụ
    
                return {
                    ...item,
                    benhnhan_name,  // Tên bệnh nhân
                    bacsi_name,
                    dichvu_name,  // Tên dịch vụ
                };
            });    
            setDatlichs(mergedData); // Cập nhật state với dữ liệu đã ánh xạ
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            setDatlichs([]); // Nếu có lỗi, xóa dữ liệu hiện tại
        }
    };    

    const fetchDatlichDetails = async () => {
        try {
            // Gọi các API song song
            const [datlichData, benhnhanData, bacsiData, dichvuData] = await Promise.all([
                DatlichService.getDatlich(),
                KhachhangService.getKhachhang(),
                BacsiService.getbacsi(),
                EventService.getdichvu(),
            ]);
    
            if (typeof datlichData === "string") {
                console.warn("⚠️ Thông báo:", datlichData);
                return [];
            }
            
            // Hợp nhất dữ liệu
            const mergedData = datlichData.map(item => {
                const benhnhan_name = getBenhnhanName(item.benhnhan_id, benhnhanData);  // Tìm tên bệnh nhân
                const bacsi_name = getBacsiName(item.bacsi_id, bacsiData);
                const dichvu_name = getDichvuName(item.dichvu_id, dichvuData);  // Tìm tên dịch vụ
    
                return {
                    ...item,
                    benhnhan_name,  // Tên bệnh nhân
                    bacsi_name,
                    dichvu_name,  // Tên dịch vụ
                };
            });
            return mergedData;
    
        } catch (error) {
            console.error("🚨 Lỗi khi gọi API:", error);
            return [];
        }
    };

    const hideDialog = () => {
        setSubmitted(false);
        setDatlichDialog(false);
    };

    const LoadPage = async () => {
        // const data = await DatlichService.getDatlich();
        fetchData();
        // setDatlichs(data);
    };

    const LoadDay = async () => {
        try {
            await fetchDatlichToday();
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        
        // Nếu đã đúng định dạng yyyy-MM-dd thì giữ nguyên
        if (typeof dateString === "string" && dateString.length === 10) return dateString;
    
        const d = new Date(dateString);
        return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    };

    const saveDatlich = async () => {
        setSubmitted(true);
        if (datlich.datlich_id.trim()) {
            let _datlich = { ...datlich };

            _datlich.Ngay_Kham = formatDate(_datlich.Ngay_Kham);

            try {
                const { benhnhan_name, bacsi_name, dichvu_name, ...datlichData } = _datlich;
                const updatedDatlich = await DatlichService.putdatlich(datlich.datlich_id, datlichData);
                let _datlichs = datlichs.map(dl => 
                    dl.datlich_id === datlich.datlich_id ? updatedDatlich : dl
                );
                setDatlichs(_datlichs);
                toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật đặt lịch', life: 3000 });
            } catch (error) {
                console.error("Lỗi khi cập nhật đặt lịch:", error);
                toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể cập nhật đặt lịch', life: 3000 });
            }
            setDatlichDialog(false);
            setDatlich(emptydatlich);
            LoadPage();
        }
    };
    const confirmDeleteDatlich = (datlich) => {
        setDatlich(datlich);
        setDeleteDatlichDialog(true);
    };
    const deleteDatLich = async () => {
        try {
            // Gọi API để xóa khách hàng
            const response = await DatlichService.deletedatlich(datlich.datlich_id, datlich);
        
            if (response) {
                // Cập nhật danh sách sau khi xóa thành công
                let _datlichs = datlichs.filter(val => val.datlich_id !== datlich.datlich_id);
                setDatlichs(_datlichs);
                    
                toast.current.show({
                        severity: 'success',
                        summary: 'Thành công',
                        detail: 'Xóa lịch hẹn thành công',
                        life: 3000
                    });
                } else {
                    throw new Error("Không thể xóa lịch hẹn.");
                }
            } catch (error) {
                console.error("Lỗi khi xóa lịch hẹn:", error);
                toast.current.show({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail: 'Xóa lịch hẹn thất bại',
                    life: 3000
                });
            } finally {
                // Đóng dialog và reset trạng thái
                setDeleteDatlichDialog(false);
                setDatlich(emptydatlich);
            }
    };

    // const createId = () => {
    //     return Math.random().toString(36).substr(2, 9);
    // };

    const customerDialogFooter = (
        <>
            <Button label="Hủy" icon="pi pi-times" onClick={hideDialog} />
            <Button label="Lưu" icon="pi pi-check" onClick={saveDatlich} />
        </>
    );

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h4 className="m-0">Đặt lịch</h4>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    
    const deleteDatlichFooter = (
        <>
            <Button label="Không" icon="pi pi-times" onClick={() => setDeleteDatlichDialog(false)} />
            <Button label="Có" icon="pi pi-check" onClick={deleteDatLich} />
        </>
    ); 
    const timeSlots = [
        "08:00:00", "08:30:00", "09:00:00", "09:30:00",
        "10:00:00", "10:30:00", "11:00:00", "11:30:00",
        "12:00:00", "12:30:00", "13:00:00", "13:30:00",
        "14:00:00", "14:30:00", "15:00:00", "15:30:00",
        "16:00:00", "16:30:00", "17:00:00", "17:30:00",
        "18:00:00", "18:30:00", "19:00:00", "19:30:00",
    ];
    const handleSelect = (time) => {
        setSelectedTime(time);
        setDatlich({ ...datlich, Gio_Kham: time });
        setShowDropdown(false);
    };

    const actionBodyTemplate = (rowData) => {
        // console.log('Trang_Thai:', rowData.Trang_Thai);
        return (
            <div className="flex gap-2">
                {(() => {
                    switch (rowData.Trang_Thai) {
                        case 'Hủy':
                            return (
                                <Button
                                    icon="pi pi-trash"
                                    onClick={() => confirmDeleteDatlich(rowData)}
                                />
                            );
                        case 'Đã xác nhận':
                            return (
                                <>
                                    <Button
                                        icon="pi pi-plus"
                                        tooltip="Thêm hóa đơn"
                                        onClick={() => {
                                            const query = new URLSearchParams({
                                                datlich_id: rowData.datlich_id,
                                                benhnhan_id: rowData.benhnhan_id,
                                                bacsi_id: rowData.bacsi_id,
                                                dichvu_id: rowData.dichvu_id,
                                                ngaytao: rowData.Ngay_Kham,
                                                openDialog: 'true'
                                            }).toString();
                                            window.location.href = `/hoadon?${query}`;
                                        }}
                                    />
                                    <Button
                                        icon="pi pi-pencil"
                                        onClick={() => { setDatlich(rowData); setDatlichDialog(true); }}
                                    />
                                </>
                            );
                        case 'Hoàn thành':
                            return("");
                        default:
                            return (
                                <Button
                                    icon="pi pi-pencil"
                                    onClick={() => { setDatlich(rowData); setDatlichDialog(true); }}
                                />
                            );
                    }
                })()}
            </div>
        );
    };

    return (
        <div className="card">
            <Toast ref={toast} />
            <Toolbar className="mb-4" left={() => (
                <div className="flex gap-2">
                <Button
                    label="Hiển thị Tất cả" 
                    icon="pi pi-database" 
                    className="p-button-outlined p-button-info" 
                    onClick={LoadPage} 
                />
                <Button
                    label="Hiển thị hôm nay" 
                    icon="pi pi-calendar" 
                    className="p-button-outlined p-button-success" 
                    onClick={LoadDay} 
                />
            </div>
            )} />

            <DataTable value={datlichs} paginator rows={5} globalFilter={globalFilter} header={header} emptyMessage="Không có lịch đặt hôm nay.">
                <Column header="STT" body={(rowData, options) => options.rowIndex + 1} className='text-center'/>
                <Column field="benhnhan_name" header="Bệnh nhân" />
                <Column field="bacsi_name" header="Nha sĩ" />
                <Column field="dichvu_name" header="Dịch vụ" />
                <Column field="Ngay_Kham" header="Ngày khám" sortable body={(rowData) => formatDate(rowData.Ngay_Kham)} />
                <Column field="Gio_Kham" header="Giờ khám" sortable />
                <Column field="Trang_Thai" header="Trạng thái" />
                <Column body={actionBodyTemplate} />
            </DataTable>

            <Dialog visible={datlichDialog} style={{ width: '450px' }} header="Thông tin đặt lịch" footer={customerDialogFooter} onHide={hideDialog}>
                <InputText value={datlich.benhnhan_id} readOnly onChange={(e) => setDatlich({ ...datlich, datlich_id: e.target.value })} placeholder="Bệnh nhân ID" className="w-full" />
                <InputText value={datlich.bacsi_id} readOnly onChange={(e) => setDatlich({ ...datlich, datlich_id: e.target.value })} placeholder="Bác sĩ ID" className="w-full" />
                <InputText value={datlich.dichvu_id} readOnly onChange={(e) => setDatlich({ ...datlich, dichvu_id: e.target.value })} placeholder="Dịch vụ ID" className="w-full mt-2" />
                <InputText
                    type="date"
                    value={datlich.Ngay_Kham ? formatDate(datlich.Ngay_Kham) : ""}
                    onChange={(e) =>
                        setDatlich({ ...datlich, Ngay_Kham: e.target.value }) // Không cần parseDate
                    }
                    className="w-full mt-2"
                />
               <div className="relative w-48">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-center mt-2 bg-white"
                    >
                        {selectedTime}
                    </button>
                    {showDropdown && (
                        <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
                            <div className="grid grid-cols-4 gap-3 p-3 place-items-center">
                                {timeSlots.map((time) => (
                                    <div
                                        key={time}
                                        onClick={() => handleSelect(time)}
                                        className={`p-3 min-w-[80px] text-center cursor-pointer rounded-lg shadow-sm border 
                                        transition-all duration-200 font-mono 
                                        ${selectedTime === time ? "bg-green-100 border-green-300" : "bg-gray-50 hover:bg-green-50"}`}
                                    >
                                        {time}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <select
                    value={datlich.Trang_Thai || ""}
                    onChange={(e) => setDatlich({ ...datlich, Trang_Thai: e.target.value })}
                    className="w-full pt-3 pb-3 mt-2 text-gray-700"
                    style={{
                        borderRadius: '8px',
                        border: '1px solid #CCC',
                        padding: '10px',
                        fontSize: '13px',
                    }}
                    >
                    <option value="">Chọn Trạng thái</option>
                    <option value="Chờ xác nhận">Chờ xác nhận</option>
                    <option value="Đã Xác nhận">Đã Xác nhận</option>
                    <option value="Hủy">Hủy</option>
                </select>  
            </Dialog>
            <Dialog visible={deleteDatlichDialog} style={{ width: '450px' }} header="Xác nhận xóa lịch" footer={deleteDatlichFooter} onHide={() => setDeleteDatlichDialog(false)}>
                <p>Bạn có chắc chắn muốn xóa lịch hẹn không?</p>
            </Dialog>
        </div>
    );
};

export default Datlich;