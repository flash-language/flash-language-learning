import { NavLink } from "react-router-dom";
import { Navbar, Button } from "flowbite-react";

function NavigationBar() {
  return (

    <>

      <Navbar fluid rounded>

        <Navbar.Brand>
          <img src="../public/vite.svg" className="mr-3 h-6 sm:h-9" alt="flashwords Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flashwords</span>
          
        </Navbar.Brand>

        <div className="flex md:order-2">
          <Button>Get started</Button>
          <Navbar.Toggle />
        </div>

        <Navbar.Collapse>

          <Navbar.Link active>
            <NavLink to="/">Home</NavLink>
          </Navbar.Link>

          <Navbar.Link >
            <NavLink to="/about">About</NavLink>
          </Navbar.Link>

        </Navbar.Collapse>
      </Navbar>


      {/** 
    <div className="navbar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/collections">Collections</NavLink>
        </li>
        <li>
          <NavLink to="/flashcards">Flashcards</NavLink>
        </li>
      </ul>
    </div>
    */}

    </>




  );
}

export default NavigationBar;
