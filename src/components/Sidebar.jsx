import { NavLink } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

function SideBar () {
return(
<Sidebar aria-label="Default sidebar example">
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
    </Sidebar>

)

}

export default SideBar;