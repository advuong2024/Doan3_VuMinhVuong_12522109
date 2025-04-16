import { jwtDecode } from "jwt-decode"; 
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function useAuth() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("❌ Token không tồn tại. Chuyển hướng...");
            router.push("/auth/login");
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {
                console.warn("Token đã hết hạn");
                localStorage.removeItem("token");
                alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
                router.push("/auth/login");
            } else {
                setIsAuthenticated(true);
                console.log("Token hợp lệ");
            }
        } catch (error) {
            console.error("Lỗi khi giải mã token:", error);
            localStorage.removeItem("token");
            router.push("/auth/login");
        }
    }, [router]);

    return isAuthenticated;
}

export default useAuth;
