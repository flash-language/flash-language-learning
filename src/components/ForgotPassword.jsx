import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../css/auth.css";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your email inbox for instructions')
    } catch {
      setError("Failed to reset password");
    } finally {
      setLoading(false);
    }
  }

    return (
      <>
        <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">Password Reset</h2>
        
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
        
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
          
          <button
            disabled={loading}
            type="submit"
            className="submit-button"
          >
            Reset Password
          </button>
        </form>
        <div>
            <Link to="/login">Login</Link>
        </div>
      </div>
      
      <div className="login-link">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
      </>
    );
  }

