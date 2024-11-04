
import Card from './components/Card'
import './index.css'
import { Routes, Route } from "react-router-dom";
import Flashcards from "./pages/Flashcards";
import Homepage from "./pages/Homepage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import About from "./pages/About";

function App() {
  return (
    <>
      <Navbar />

      <Sidebar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
     <Card></Card>
    </>
  );
}

export default App;
