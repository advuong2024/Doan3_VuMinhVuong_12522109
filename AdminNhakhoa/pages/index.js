import React, { useState, useEffect, useContext } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { LayoutContext } from '../layout/context/layoutcontext';
import ThongkeService from '../demo/service/ThongkeService';

const RevenueDashboard = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [chartOptions, setChartOptions] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [customerCount, setCustomerCount] = useState(0);
    const [bookingCount, setBookingCount] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [loading, setLoading] = useState(true);

    // State cho bộ lọc (dùng cho biểu đồ)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filterType, setFilterType] = useState(null);
    const [filterError, setFilterError] = useState('');

    const filterTypes = [
        { label: 'Tuần', value: 'tuan' },
        { label: 'Tháng', value: 'thang' },
        { label: 'Quý', value: 'quy' },
        { label: 'Năm', value: 'nam' },
    ];

    // Hàm định dạng ngày thành chuỗi YYYY-MM-DD
    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Hàm lấy dữ liệu cho thẻ thống kê (không cần tham số lọc)
    const fetchStatsData = async () => {
        try {
            setLoading(true);

            // Lấy số lượng khách hàng
            const hoadonData = await ThongkeService.gethoadonCount();
            setCustomerCount(hoadonData?.length || 0);

            // Lấy số lượng đặt lịch
            const bookingData = await ThongkeService.getBooking();
            setBookingCount(bookingData?.bookingCount || 0);

            // Lấy tổng doanh thu
            const revenueData = await ThongkeService.getRevenue();
            const total = revenueData && typeof revenueData === 'object' && 'revenue' in revenueData ? revenueData.revenue : 0;
            setTotalRevenue(total);

            const ChartMonth = await ThongkeService.getchartMonth();
            setChartData(ChartMonth);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu thống kê:', error);
            setCustomerCount(0);
            setBookingCount(0);
            setTotalRevenue(0);
        } finally {
            setLoading(false);
        }
    };

    // Hàm lấy dữ liệu biểu đồ
    const fetchChartData = async (filter, start, end) => {
        try {
            setLoading(true);
            const chartResponse = await ThongkeService.getChart(filter || '', start || '', end || '');
            setChartData(chartResponse);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu biểu đồ:', error);
            setChartData({
                labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                datasets: [
                    {
                        label: 'Doanh thu (VNĐ)',
                        backgroundColor: '#6f42c1',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                ],
            });
        } finally {
            setLoading(false);
        }
    };

    // Hàm xử lý khi nhấn nút "Lọc dữ liệu" (cho biểu đồ)
    const handleFilter = () => {
        // Kiểm tra nếu không chọn kiểu lọc nào
        if (!startDate && !endDate && !filterType) {
            setFilterError('Vui lòng chọn ít nhất một kiểu lọc: theo ngày hoặc theo kiểu lọc.');
            return;
        }

        // Nếu có filterType, ưu tiên lọc theo filterType
        if (filterType) {
            setFilterError('');
            fetchChartData(filterType, '', '');
        }
        // Nếu không có filterType, kiểm tra startDate và endDate
        else if (startDate && endDate) {
            setFilterError('');
            fetchChartData(null, formatDate(startDate), formatDate(endDate));
        }
        // Nếu chỉ chọn startDate hoặc endDate (thiếu một trong hai)
        else {
            setFilterError('Vui lòng chọn cả ngày bắt đầu và ngày kết thúc để lọc theo ngày.');
        }
    };

    // Hàm xử lý khi thay đổi filterType
    const handleFilterTypeChange = (e) => {
        const newFilterType = e.value;
        setFilterType(newFilterType);
        // Nếu chọn filterType, xóa startDate và endDate
        if (newFilterType) {
            setStartDate(null);
            setEndDate(null);
        }
    };

    // Hàm xử lý khi thay đổi startDate
    const handleStartDateChange = (e) => {
        const newStartDate = e.value;
        setStartDate(newStartDate);
        // Nếu cả startDate và endDate đều có giá trị, xóa filterType
        if (newStartDate && endDate) {
            setFilterType(null);
        }
    };

    // Hàm xử lý khi thay đổi endDate
    const handleEndDateChange = (e) => {
        const newEndDate = e.value;
        setEndDate(newEndDate);
        // Nếu cả startDate và endDate đều có giá trị, xóa filterType
        if (startDate && newEndDate) {
            setFilterType(null);
        }
    };

    const RefreshPage = () => {
        window.location.reload();
    }

    // Theme cho biểu đồ
    const applyLightTheme = () => {
        const options = {
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#495057',
                    },
                },
            },
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#495057',
                        callback: (value) => value.toLocaleString('vi-VN'),
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
                x: {
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
            },
        };
        setChartOptions(options);
    };

    const applyDarkTheme = () => {
        const options = {
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#ebedef',
                    },
                },
            },
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#ebedef',
                        callback: (value) => value.toLocaleString('vi-VN'),
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    },
                },
                x: {
                    ticks: {
                        color: '#ebedef',
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    },
                },
            },
        };
        setChartOptions(options);
    };

    // Cập nhật theme khi colorScheme thay đổi
    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);

    // Lấy dữ liệu cho thẻ thống kê khi component mount
    useEffect(() => {
        fetchStatsData();
    }, []);

    if (loading) return <div>Đang tải...</div>;

    return (
        <div className="grid">
            {/* Thẻ thống kê */}
            <div className="col-12 md:col-4">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Khách hàng</span>
                            <div className="text-900 font-medium text-xl">{customerCount}</div>
                        </div>
                        <div
                            className="flex align-items-center justify-content-center bg-purple-100 border-round"
                            style={{ width: '3.5rem', height: '3.5rem' }}
                        >
                            <i className="pi pi-users text-purple-500 text-xl" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 md:col-4">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Đặt lịch</span>
                            <div className="text-900 font-medium text-xl">{bookingCount}</div>
                        </div>
                        <div
                            className="flex align-items-center justify-content-center bg-purple-100 border-round"
                            style={{ width: '3.5rem', height: '3.5rem' }}
                        >
                            <i className="pi pi-calendar text-purple-500 text-xl" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 md:col-4">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Tổng doanh thu</span>
                            <div className="text-900 font-medium text-xl">{totalRevenue.toLocaleString('vi-VN')}đ</div>
                        </div>
                        <div
                            className="flex align-items-center justify-content-center bg-purple-100 border-round"
                            style={{ width: '3.5rem', height: '3.5rem' }}
                        >
                            <i className="pi pi-wallet text-purple-500 text-xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bộ lọc duy nhất (dùng cho biểu đồ) */}
            <div className="col-12">
                <div className="card">
                    <h5>Lọc dữ liệu biểu đồ</h5>
                    <div className="grid">
                        {/* Luôn hiển thị startDate và endDate */}
                        <div className="col-12 md:col-4">
                            <label className="block text-500 font-medium mb-2">Ngày bắt đầu</label>
                            <Calendar
                                showIcon
                                className="w-full"
                                value={startDate}
                                onChange={handleStartDateChange}
                                placeholder="Chọn ngày bắt đầu"
                            />
                        </div>
                        <div className="col-12 md:col-4">
                            <label className="block text-500 font-medium mb-2">Ngày kết thúc</label>
                            <Calendar
                                showIcon
                                className="w-full"
                                value={endDate}
                                onChange={handleEndDateChange}
                                placeholder="Chọn ngày kết thúc"
                            />
                        </div>
                        {/* Luôn hiển thị dropdown filterType */}
                        <div className="col-12 md:col-4">
                            <label className="block text-500 font-medium mb-2">Lọc theo</label>
                            <Dropdown
                                options={filterTypes}
                                value={filterType}
                                onChange={handleFilterTypeChange}
                                placeholder="Chọn kiểu lọc"
                                className="w-full"
                            />
                        </div>
                        <div className="col-12 md:col-2 flex align-items-end">
                            <Button
                                label="Lọc dữ liệu"
                                onClick={handleFilter}
                                className="w-full p-button-raised"
                                style={{ border: 'none' }}
                                disabled={loading}
                            />
                        </div>
                        <div className="col-12 md:col-1 flex align-items-end">
                            <Button
                                icon="pi pi-refresh"
                                onClick={RefreshPage}
                                className="w-full p-button-raised"
                                style={{ border: 'none' }}
                            />
                        </div>
                    </div>
                    {filterError && (
                        <div className="text-red-500 mt-2">{filterError}</div>
                    )}
                </div>
            </div>

            {/* Biểu đồ */}
            <div className="col-12">
                <div className="card">
                    <h5 className="text-center">Biểu đồ Doanh thu</h5>
                    {chartData ? (
                        <Chart type="bar" data={chartData} options={chartOptions} />
                    ) : (
                        <div>Vui lòng chọn kiểu lọc và nhấn "Lọc dữ liệu" để xem biểu đồ.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RevenueDashboard;