import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import "./Layout.css";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
