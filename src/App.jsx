import './css/index.css'
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Flashcards from "./pages/Flashcards";
import Homepage from "./pages/Homepage";
import NotFoundPage from "./pages/NotFoundPage";
import NavigationBar from "./components/NavigationBar";
import SideBarNav from "./components/SideBarNav.jsx";
import About from "./pages/About";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword"
import UpdateProfile from "./components/UpdateProfile";
import Collections from './pages/Collections';
import AddWords from './components/AddWords';
import Category from './pages/Category';
import BottomPage from './components/BottomPage';
import UsersList from './components/UsersList.jsx';
import UserStatistics from './components/UserStatistics.jsx';

function App() {
  return (
    <>
      <NavigationBar className="navigationbar"/>
      <SideBarNav />
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
          <Route path="/flashcards/:category?" element={ <PrivateRoute><Flashcards /></PrivateRoute> } />
          <Route path="/add-word-form" element={ <PrivateRoute><AddWords /></PrivateRoute> } />
          <Route path="/users" element={ <PrivateRoute><UsersList /></PrivateRoute> } />
          <Route path="/stats" element={ <PrivateRoute><UserStatistics /></PrivateRoute> } />
        </Routes>
      </AuthProvider>
      <BottomPage className="bottompage"/>
     
    </>
  );
}

export default App;
