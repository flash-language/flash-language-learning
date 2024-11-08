import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Carousel, Card, Dropdown } from "flowbite-react";
import "../css/homepage.css"

function Homepage() {
  const [error, setError] = useState("");
  const { currentUser, logout, deleteAccount } = useAuth();
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

  async function handleDeleteAccount() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmDelete) {
      setError(""); // Clear any previous errors
      try {
        await deleteAccount();
        navigate("/signup"); // Redirect to signup page after deletion
      } catch (error) {
        setError("Failed to delete account. Please try again.");
        console.error("Delete account error:", error);
      }
    }
  }

  return (
  <>
  
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel>
          <img
            src="/public/learn-2001847_1280.jpg"
            alt="Hello"
            className="w-full h-full object-cover" 
          />
          <img
            src="/public/welcome-905562_1280.webp"
            alt="welcome"
            className="w-full h-full object-cover"
          />
          <img
            src="/public/Flashcards-language-cards-for-learning-a-foreign-language.-The-best-method-of-memorizing-words.jpg"
            alt="Flashcards"
            className="w-full h-full object-contain"
          />
        </Carousel>
      </div>
      <section className="hero-section bg-cyan-600 text-white text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Master a New Language with Flashcards</h1>
        <p className="text-xl mb-6">Learn Faster, Retain Longer</p>
        <Link to="/signup" className="cta-btn bg-blue-700 text-white py-3 px-6 rounded-lg text-lg">
          Start Learning Now
        </Link>
      </section>
      <section className="how-it-works py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="feature">
              <h3 className="text-xl font-semibold mb-4">Active Recall for Better Memory</h3>
              <p className="text-gray-600">Flashcards help reinforce memory through active recall, enhancing retention.</p>
            </div>
            <div className="feature">
              <h3 className="text-xl font-semibold mb-4">Spaced Repetition for Long-Term Retention</h3>
              <p className="text-gray-600">Spaced repetition algorithms ensure you review words at the optimal time.</p>
            </div>
            <div className="feature">
              <h3 className="text-xl font-semibold mb-4">Track Your Progress</h3>
              <p className="text-gray-600">Monitor your learning progress and see how much you’ve mastered.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="benefits-section bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Flashwords?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="benefit">
              <h3 className="text-xl font-semibold mb-4">Learn at Your Own Pace</h3>
              <p className="text-gray-600">Take control of your learning schedule and go at the pace that suits you.</p>
            </div>
            <div className="benefit">
              <h3 className="text-xl font-semibold mb-4">Practice Anytime, Anywhere</h3>
              <p className="text-gray-600">Access your flashcards and study anywhere, whether you're at home or on the go.</p>
            </div>
            <div className="benefit">
              <h3 className="text-xl font-semibold mb-4">Master Vocabulary Quickly</h3>
              <p className="text-gray-600">With consistent practice, you'll build your vocabulary in no time.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="language-options py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Language Options</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="language-card">
              <Card className="max-w-xs">
                <div className="text-center p-4">
                  <h3 className="text-xl font-semibold">Spanish</h3>
                  <p className="text-gray-600">Learn the most widely spoken language in the world!</p>
                </div>
              </Card>
            </div>
            <div className="language-card">
              <Card className="max-w-xs">
                <div className="text-center p-4">
                  <h3 className="text-xl font-semibold">French</h3>
                  <p className="text-gray-600">Master the language of romance and diplomacy.</p>
                </div>
              </Card>
            </div>
            <div className="language-card">
              <Card className="max-w-xs">
                <div className="text-center p-4">
                  <h3 className="text-xl font-semibold">German</h3>
                  <p className="text-gray-600">Unlock the rich culture and opportunities in Germany.</p>
                </div>
              </Card>
            </div>
            <div className="language-card">
              <Card className="max-w-xs">
                <div className="text-center p-4">
                  <h3 className="text-xl font-semibold">Arabic</h3>
                  <p className="text-gray-600">Learn one of the most spoken languages in the world.</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
        <div>
        <Card className="max-w-sm">
        {error && <div className="error-alert">{error}</div>}
      <div className="flex justify-end px-4 pt-4">
        <Dropdown inline label="">
          <Dropdown.Item>
            <Link to="/update-profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Edit
              </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link onClick={handleDeleteAccount} to="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Delete
            </Link>
            </Dropdown.Item>
            </Dropdown>
      </div>
      <div className="flex flex-col items-center pb-10">
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Email: {currentUser.email}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Language Learner</span>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <a onClick={handleLogout}
            href="#"
            className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            Log Out
          </a>
        </div>
      </div>
    </Card>
    </div>
  </>
  );
}

export default Homepage;
