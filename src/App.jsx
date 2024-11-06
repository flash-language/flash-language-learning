import './css/index.css'
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Flashcards from "./pages/Flashcards";
import Homepage from "./pages/Homepage";
import NotFoundPage from "./pages/NotFoundPage";
import NavigationBar from "./components/NavigationBar";
import SideBar from "./components/SideBar";
import About from "./pages/About";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword"
import UpdateProfile from "./components/UpdateProfile";
import Collections from './pages/Collections';
import AddWords from './components/AddWords';
import Category from './pages/Category';
import BottomPage from './components/BottomPage';

function App() {
  return (
    <>
      <NavigationBar className="navigationbar"/>
      <SideBar/>
      <AuthProvider>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:categoryName" element={<Category />} />
          <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute><Homepage /></PrivateRoute>} />
          <Route path="/flashcards/:categoryName?" element={ <PrivateRoute><Flashcards /></PrivateRoute> } />
          <Route path="/add-word-form" element={ <PrivateRoute><AddWords /></PrivateRoute> } />
        </Routes>
      </AuthProvider>
      <BottomPage className="bottompage"/>
     
    </>
  );
}

export default App;
