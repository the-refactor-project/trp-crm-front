import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { getPath } from "../../router/paths";

const Navigation: React.FC = () => {
  return (
    <nav className="main-navigation">
      <ul>
        <li>
          <NavLink
            to={getPath("movements")}
            className={({ isActive }) =>
              `main-navigation__link${isActive ? " main-navigation__link--active" : ""}`
            }
            end
          >
            Movimientos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
