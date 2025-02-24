import React, { useEffect, useState } from "react";
import style from "./Login.module.css";
import frame from "../../assets/Frame.png";
import logo from "../../assets/Group.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // handling the form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // sending the loginform data to the backend
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        formData
      );

      if (response.status === 200) {
        setFormData({
          email: "",
          password: "",
        });
        toast.success("User logged in successfully");
        navigate("/analytics");
        localStorage.setItem("token", response.data.token);
      } else {
        console.log(response.data);
        toast.error("Login failed");
      }
    } catch (error) {
      console.error(error.response.data);
      toast.error(error.response.data.message);
    }
  };

  // if user already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      toast.success("User Already Logged In");
    }
  }, []);

  return (
    <div className={style.signupContainer}>
      <div className={style.formSection}>
        <div className={style.logo}>
          <img src={logo} alt="logo" />
          <span>SPARK</span>
        </div>
        <div className={style.main}>
          <h1 className={style.title}>Sign in to your Spark</h1>

          <form onSubmit={handleLoginSubmit} className={style.signupForm}>
            <div className={style.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className={style.icon}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            <div className={style.end}>
              <button type="submit" className={style.submitButton}>
                Log in
              </button>
              <a href="#" className={style.link}>
                Forgot password?
              </a>
              <div className={style.dont}>
                <p>
                  Don't have an account ?{" "}
                  <Link to="/" className={style.link}>
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
        <p className={style.captchaText}>
          This site is protected by reCAPTCHA and the Google
          <a href="#" className={style.link}>
            Privacy Policy
          </a>
          and
          <a href="#" className={style.link}>
            Terms of Service
          </a>
          apply.
        </p>
      </div>

      <div className={style.imageSection}>
        <div className={style.decorativeImage}>
          <img src={frame} alt="frame" />
        </div>
      </div>
    </div>
  );
};

export default Login;
