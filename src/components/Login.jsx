import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../css/auth.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/')
    } catch {
      setError("Failed to log in");
    } finally {
      setLoading(false);
    }
  }

    return (
      <>
        <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">Log In</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              ref={emailRef}
              id="email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              ref={passwordRef}
              id="password"
              required
            />
          </div>
          
          <button
            disabled={loading}
            type="submit"
            className="submit-button"
          >
            Log In
          </button>
        </form>
        <div>
            <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </div>
      
      <div className="login-link">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
      </>
    );
  }

