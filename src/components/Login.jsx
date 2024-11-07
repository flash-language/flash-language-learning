import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch {
      setError("Failed to log in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="max-w-sm w-full">
        <h2 className="auth-title text-center text-2xl font-semibold mb-4">Login</h2>
        {error && (
          <div className="text-red-600 text-center mb-4">
            {error}
          </div>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@flowbite.com"
              required
              ref={emailRef}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              required
              ref={passwordRef}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button disabled={loading} type="submit">
            Submit
          </Button>
          <div className="text-center mt-4">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <div className="login-link text-center mt-4">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
