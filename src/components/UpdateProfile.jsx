import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../css/auth.css";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    try {
      if (emailRef.current.value !== currentUser.email) {
        promises.push(updateEmail(emailRef.current.value));
      }
      if (passwordRef.current.value) {
        promises.push(updatePassword(passwordRef.current.value));
      }

      await Promise.all(promises);
      navigate("/");
    } catch (error) {
      setError("Failed to update account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="auth-container">
        <div className="auth-form">
          <h2 className="auth-title">Update Profile</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                ref={emailRef}
                id="email"
                required
                defaultValue={currentUser.email}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                ref={passwordRef}
                id="password"
                placeholder="Leave blank to keep the same"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password-confirm">Confirm Password</label>
              <input
                type="password"
                ref={passwordConfirmRef}
                id="password-confirm"
                placeholder="Leave blank to keep the same"
              />
            </div>

            <button disabled={loading} type="submit" className="submit-button">
              Update
            </button>
          </form>
        </div>

        <div className="login-link">
          <Link to="/">Cancel</Link>
        </div>
      </div>
    </>
  );
}
