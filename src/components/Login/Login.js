import "./Login.scss";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Cookies from "universal-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const cookies = new Cookies();
    const navigate = useNavigate();
    const notify = () => toast();

    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleLogin = (e) => {
        e.preventDefault();
        let data = {
            username: username,
            password: password,
        };
        axios
            .post("http://localhost/DACN1_API/api/getUser.php", data)
            .then((response) => {
                if (response.data.user === null) {
                    toast.error("Đăng nhập thất bại", {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                } else {
                    cookies.set("user", response.data.user, {});
                    toast.success("Đăng nhập thành công! Chuyển hướng sau 3s", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setTimeout(() => {
                        navigate("/");
                    }, 3500);
                }
            });
    };

    return (
        <>
            <Header />
            <div className="login-container">
                <div className="login">
                    <h1 className="login-heading">Đăng Nhập</h1>
                    <button className="login-social">
                        <FcGoogle className="login-social-icon" />
                        <span className="login-social-text">
                            Đăng Nhập Với Tài Khoản Google
                        </span>
                    </button>
                    <div className="login-or">
                        <span>hoặc</span>
                    </div>
                    <form className="login-form" onSubmit={handleLogin}>
                        <label htmlFor="username" className="login-label">
                            User name
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="login-input"
                            placeholder="Nhập tài khoản..."
                            autoComplete="off"
                            onChange={handleChangeUsername}
                        />

                        <label htmlFor="password" className="login-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="login-input"
                            placeholder="Nhập mật khẩu..."
                            autoComplete="off"
                            onChange={handleChangePassword}
                        />
                        <button onClick={notify} className="login-submit">
                            Đăng Nhập
                        </button>
                        <ToastContainer />
                    </form>
                    <p className="login-resetpass">
                        <span>Bạn chưa có tài khoản ? </span>
                        <a href="/register" className="register-link">
                            {" "}
                            Đăng ký
                        </a>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Login;
