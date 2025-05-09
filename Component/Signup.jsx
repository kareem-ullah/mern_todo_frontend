import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleRegister = async () => {
    try {
      console.log("BACKEND_URL:", BACKEND_URL);
      await axios.post(`${BACKEND_URL}/register`, {
        name,
        email,
        password,
      });
      alert("Registration Successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration Failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Sign Up</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <div className="input-group">
            <div className="input-icon user-icon"></div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <div className="input-icon email-icon"></div>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <div className="input-icon lock-icon"></div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            ></div>
          </div>

          <div className="terms-group">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
            />
            <label htmlFor="terms">
              I read and agree to <a href="#">Terms & Conditions</a>
            </label>
          </div>

          <button type="submit" className="signup-button">
            CREATE ACCOUNT
          </button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <button className="signup-btn" onClick={() => navigate("/login")}>LogIn</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
