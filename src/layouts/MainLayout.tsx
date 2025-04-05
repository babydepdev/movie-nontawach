import Footer from "./Footer";
import NavbarHeader from "./NavbarHeader";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <NavbarHeader />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
