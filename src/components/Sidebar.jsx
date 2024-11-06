import { NavLink } from "react-router-dom";
import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import { useState } from "react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";


function SideBar () {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flex min-h-[10vh] items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>Show navigation</Button>
      </div>

      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <form className="pb-3 md:hidden">
                  <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
                </form>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item icon={HiPencil}>
                    <NavLink to="/flashcards">Flashwords</NavLink>
                    </Sidebar.Item>
                    <Sidebar.Item icon={HiCollection}>
                    <NavLink to="/collections">Collections</NavLink>
                    </Sidebar.Item>
                    <Sidebar.Item href="/" icon={HiChartPie}>
                      Dashboard
                    </Sidebar.Item>
                    <Sidebar.Item href="/users/list" icon={HiUsers}>
                      Users list
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>

                  <Sidebar.ItemGroup>             
                    <Sidebar.Item href="https://github.com/themesberg/flowbite-react/issues" icon={HiInformationCircle}>
                      Help
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>

                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
}

export default SideBar;





{/*<Sidebar aria-label="Default sidebar example" className="h-screen">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item icon={HiViewBoards} label="Pro" labelColor="dark">
          <NavLink to="/collections">Collections</NavLink>
          </Sidebar.Item>

          <Sidebar.Item icon={HiInbox}>
          <NavLink to="/flashcards">Flashcards</NavLink>
          </Sidebar.Item>
          <Sidebar.Item icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar> */}



