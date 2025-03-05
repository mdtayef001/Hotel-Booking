import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AuthLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container mx-auto">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default AuthLayout;
