import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Card, Label, TextInput } from "flowbite-react";

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
      {error && <div className="error-message">{error}</div>}
      <Card className="max-w-sm">
        <h2 className="auth-title">Update Profile</h2>
        <h2 className="auth-title">Sign Up</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              defaultValue={currentUser.email}
              required
              ref={emailRef}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="New password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              ref={passwordRef}
              placeholder="Leave blank to keep the same"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password-confirm" value="Confirm New Password" />
            </div>
            <TextInput
              id="password-confirm"
              type="password"
              ref={passwordConfirmRef}
              placeholder="Leave blank to keep the same"
            />
          </div>
          <Button disabled={loading} type="submit">
            Submit
          </Button>
          <div>
            <Link to="/">Cancel</Link>
          </div>
        </form>
      </Card>
    </>
  );
}
