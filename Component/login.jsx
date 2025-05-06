import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import "./login.css"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${BACKEND_URL}`, { email, password })
      const token = res.data.token

      
      localStorage.setItem("token", token)

      navigate("/")
    } catch (error) {
      console.error("Login failed:", error)
      alert("Invalid Credentials")
    }
  }

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
            <div className="eye-icon" onClick={() => setShowPassword(!showPassword)}></div>
          </div>

          <button type="submit" className="login-button">
            LOGIN IN
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <button  onClick={()=>navigate("/signup")}>Sign Up</button>
        </p>
      </div>
    </div>
  )
}

export default Login;