import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Card, Label, TextInput } from "flowbite-react";



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
        {error && <div className="error-message">{error}</div>}
      <Card className="max-w-sm">
      <h2 className="auth-title">Sign Up</h2>
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
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password-confirm" value="Confirm Password" />
          </div>
          <TextInput id="password-confirm" type="password" required ref={passwordConfirmRef} />
        </div>
        <Button disabled={loading} type="submit">Submit</Button>
      <div className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
      </form>
    </Card>
      </>
    );
  }
