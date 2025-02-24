import React, { useState } from "react";
import style from "./Register.module.css";
import frame from "../../assets/Frame.png";
import logo from "../../assets/Group.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // handling the form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    // checking if the password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
    }

    // sending the Registerform data to the backend
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        formData
      );

      if (response.status === 200) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        toast.success("User Registrated successfully");
        navigate("/login");
      } else {
        console.log(response.data);
        toast.error("Registration failed");
      }
    } catch (error) {
      console.error(error.response.data);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className={style.signupContainer}>
      <div className={style.formSection}>
        <div className={style.logo}>
          <img src={logo} alt="logo" />
          <span>SPARK</span>
        </div>
        <div className={style.main}>
          <h1 className={style.title}>Sign up to your Spark</h1>

          <div className={style.signinLink}>
            <span>Create an account </span>
            <Link to="/login" className={style.link}>
              Sign in instead
            </Link>
          </div>

          <form onSubmit={handleRegisterSubmit} className={style.signupForm}>
            <div className={style.inputGroup}>
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                required
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className={style.termsGroup}>
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="agreeToTerms">
                By creating an account, I agree to the
                <a href="#" className={style.link}>
                  Terms of use
                </a>
                and
                <a href="#" className={style.link}>
                  Privacy Policy
                </a>
              </label>
            </div>

            <button type="submit" className={style.submitButton}>
              Create an account
            </button>
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

export default Register;
