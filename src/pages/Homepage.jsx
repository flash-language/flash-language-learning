import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../css/homepage.css";

function Homepage() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div>
      <div className="homepage-container">
        <h1 className="homepage-header">Flash Language Learning</h1>

        <h2 className="homepage-subheader">
          Practice anywhere and fit language learning into your busy schedule!
        </h2>

        <p>
          Learning a language with flashcards is effective because it helps
          reinforce vocabulary through active recall and spaced repetition,
          which improve memory retention. Flashcards allow learners to focus on
          individual words or phrases, making it easier to build a strong
          vocabulary foundation.
        </p>

        <div className="homepage-profile">
          <h2>Profile</h2>
          {error && <div className="error-alert">{error}</div>}
          <span className="profile-email">Email: {currentUser.email}</span>
          <Link to="/update-profile" className="update-profile-link">
            Update Profile
          </Link>
        </div>

        <div className="w-100 text-center mt-2">
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
