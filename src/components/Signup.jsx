import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../css/auth.css";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/')
    } catch {
      setError("Failed to create an account");
    } finally {
      setLoading(false);
    }
  }

    return (
      <>
        <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">Sign Up</h2>

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

          <div className="form-group">
            <label htmlFor="password-confirm">Confirm Password</label>
            <input
              type="password"
              ref={passwordConfirmRef}
              id="password-confirm"
              required
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="submit-button"
          >
            Sign Up
          </button>
        </form>
      </div>

      <div className="login-link">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
      </>
    );
  }
