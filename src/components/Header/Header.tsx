import Navigation from "@/components/Navigation";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="main-header">
      <div className="container">
        <div className="main-header__app-title">
          <img
            className="main-header__logo"
            src="/logo.svg"
            alt="Logotipo The Refactor Project"
            width={35}
            height={30}
          />
          <span className="main-header__title">Dinereitor</span>
        </div>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
