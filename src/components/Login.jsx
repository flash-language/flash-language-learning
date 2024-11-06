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
      {error && <div className="error-message">{error}</div>}
      <Card className="max-w-sm">
      <h2 className="auth-title">Login</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput id="email1" type="email" placeholder="name@flowbite.com" required ref={emailRef}/>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput id="password1" type="password" required ref={passwordRef} />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button disabled={loading} type="submit">Submit</Button>
        <div>
            <Link to="/forgot-password">Forgot password?</Link>
        </div>
      <div className="login-link">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
      </form>
    </Card>
      </>
    );
  }

