
import './css/index.css'
import Card from './components/Card'
import './css/index.css'
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Flashcards from "./pages/Flashcards";
import Homepage from "./pages/Homepage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword"
import UpdateProfile from "./components/UpdateProfile";
import Collections from './pages/Collections';
import AddWords from './components/AddWords';
import Category from './pages/Category';

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <AuthProvider>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:category" element={<Category />} />

          <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute><Homepage /></PrivateRoute>} />
          <Route path="/flashcards" element={ <PrivateRoute><Flashcards /></PrivateRoute> } />
          <Route path="/add-word-form" element={ <PrivateRoute><AddWords /></PrivateRoute> } />
        </Routes>
      </AuthProvider>
      <Footer />
     
    </>
  );
}

export default App;
