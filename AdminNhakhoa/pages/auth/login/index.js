import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect } from 'react';
import AppConfig from '../../../layout/AppConfig';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import bacsiService from '../../../demo/service/BacsiService';

const LoginPage = () => {
    const [taikhoan, setTaikhoan] = useState('');
    const [matkhau, setMatkhau] = useState('');
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(null);
    const { layoutConfig } = useContext(LayoutContext);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleLogin = async () => {
        setError(null); // Xóa lỗi cũ trước khi gửi yêu cầu
        // console.log("✅ Hàm handleLogin() đã được gọi!");
        // console.log("Tài khoản nhập vào:", taikhoan); // ✅ Kiểm tra giá trị
        // console.log("Mật khẩu nhập vào:", matkhau);

        if (!taikhoan || !matkhau) {
            setError('Vui lòng nhập đầy đủ tài khoản và mật khẩu!');
            return;
        }

        try {
            const data = await bacsiService.login(taikhoan, matkhau);
            // console.log("API Response:", data);

            // Nếu API trả về token, lưu vào localStorage
            if (data && data.token) {
                if (typeof window !== "undefined") {
                    localStorage.setItem('token', data.token); // Chỉ chạy trên client
                }
                router.push('/'); // Điều hướng sau khi đăng nhập thành công
            } else {
                throw new Error('Đăng nhập thất bại, vui lòng thử lại.');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const router = useRouter();
    if (!isClient) return null;

    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                {/* <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" /> */}
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Xin chào, bạn</div>
                            <span className="text-600 font-medium">Đăng nhập để tiếp tục</span>
                        </div>

                        <div>
                            <label htmlFor="taikhoan1" className="block text-900 text-xl font-medium mb-2">
                                Tài khoản
                            </label>
                            <InputText id="taikhoan1" value={taikhoan} onChange={(e) => {setTaikhoan(e.target.value)}} placeholder="Tài khoản" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="matkhau1" className="block text-900 font-medium text-xl mb-2">
                                Mật khẩu
                            </label>
                            <Password id="matkhau1" value={matkhau} onChange={(e) => setMatkhau(e.target.value)} placeholder="Mật khẩu" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                {/* <div className="flex align-items-center">
                                    <Checkbox inputid="nhotaikhoan1" checked={checked} onChange={(e) => setChecked(e.checked)} className="mr-2"></Checkbox>
                                    <label htmlFor="nhotaikhoan1">Nhớ tài khoản</label>
                                </div>
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Quên mật khẩu?
                                </a> */}
                            </div>
                            {error && <p className="error-text" style={{ color: 'red' }}>{error}</p>}
                            <Button label="Đăng nhập" className="w-full p-3 text-xl" onClick={handleLogin}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

LoginPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};
export default LoginPage;
