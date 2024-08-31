import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout: React.FC = () => {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
};

export default Layout;
