import Navigation from "@/components/Navigation";
import "./Header.css";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="main-header">
      <div className="container">
        <div className="main-header__app-title">
          <Link to="/">
            <img
              className="main-header__logo"
              src="/logo.svg"
              alt="Logotipo The Refactor Project"
              width={35}
              height={30}
            />
          </Link>
          <Link to="/">
            <span className="main-header__title">Dinereitor</span>
          </Link>
        </div>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
