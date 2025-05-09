// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// import "./login.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();


//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${BACKEND_URL}/login`, { email, password });
  
//       console.log("Response Data:", res.data);
  
//       const token = res.data.token;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
  
//       if (token) {
//         localStorage.setItem("token", token);
//         navigate("/");
//       } else {
//         alert("Token not found in response.");
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert("Invalid Credentials");
//     }
//   };


//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h1 className="login-title">Login In</h1>

//         <form onSubmit={handleLogin}>
//           <div className="input-group">
//             <div className="input-icon email-icon"></div>
//             <input
//               type="email"
//               placeholder="E-mail"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <div className="input-icon lock-icon"></div>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <div
//               className="eye-icon"
//               onClick={() => setShowPassword(!showPassword)}
//             ></div>
//           </div>

//           <button type="submit" className="login-button">
//             LOGIN IN
//           </button>
//         </form>
//         <p className="signup-link">
//           Don't have an account?{" "}
//           <button className="signup-btn" onClick={() => navigate("/signup")}>Sign Up</button>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;


import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // 👈 Added loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // 🚀 Start Loading

    try {
      const res = await axios.post(`${BACKEND_URL}/login`, { email, password });

      console.log("Response Data:", res.data);

      const token = res.data.token;

      if (token) {
        localStorage.setItem("token", token);

        // 👇 Ensure token is set properly before navigation
        setTimeout(() => {
          if (localStorage.getItem("token")) {
            console.log("Token successfully stored!");
            navigate("/"); // 🚀 Navigate to Todo Page
          } else {
            console.error("Token not stored!");
            alert("Login Successful but Token not saved!");
          }
          setLoading(false); // 👈 Stop loading
        }, 100); // 👈 Slight delay to ensure it's stored
      } else {
        alert("Token not found in response.");
        setLoading(false); // 👈 Stop loading
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid Credentials");
      setLoading(false); // 👈 Stop loading
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login In</h1>

        <form onSubmit={handleLogin}>
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

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "LOGIN IN"}
          </button>
        </form>
        <p className="signup-link">
          Don't have an account?{" "}
          <button className="signup-btn" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;

