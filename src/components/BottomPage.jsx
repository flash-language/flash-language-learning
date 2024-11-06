import { Footer } from "flowbite-react";
import { NavLink } from "react-router-dom";

function BottomPage() {
  
  return (
    <Footer id="footer" container >
      <Footer.Copyright href="#" by="Flashwords™" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link ><NavLink to="/about">About</NavLink></Footer.Link>
        <Footer.Link href="../index.html">Privacy Policy</Footer.Link>
        <Footer.Link href="https://github.com/flash-language/flash-language-learning">Github</Footer.Link>
        <Footer.Link href="../index.html">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
  
}

export default BottomPage;

