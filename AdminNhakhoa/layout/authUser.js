"use client";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router"; // Hoặc "next/navigation" nếu dùng App Router
import { useEffect, useState } from "react";

function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!router.isReady) return; // Đợi router sẵn sàng
    let mounted = true;

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
        localStorage.removeItem("quyen");
        if (mounted) {
          alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          router.push("/auth/login");
        }
      } else if (mounted) {
        setIsAuthenticated(true);
        console.log("Token hợp lệ");
      }
    } catch (error) {
      console.error("Lỗi khi giải mã token:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("quyen");
      if (mounted) {
        router.push("/auth/login");
      }
    }

    return () => {
      mounted = false;
    };
  }, [router, router.isReady]);

  return isAuthenticated;
}

export default useAuth;