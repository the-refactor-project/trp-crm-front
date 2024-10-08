import { NavLink } from "react-router-dom";
import { getPath } from "@/router/paths";
import "./Navigation.css";

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
        <li>
          <NavLink
            to={getPath("expenses")}
            className={({ isActive }) =>
              `main-navigation__link${isActive ? " main-navigation__link--active" : ""}`
            }
            end
          >
            Gastos
          </NavLink>
        </li>
        <li>
          <NavLink
            to={getPath("leads")}
            className={({ isActive }) =>
              `main-navigation__link${isActive ? " main-navigation__link--active" : ""}`
            }
            end
          >
            Leads
          </NavLink>
        </li>
        <li>
          <NavLink
            to={getPath("providers")}
            className={({ isActive }) =>
              `main-navigation__link${isActive ? " main-navigation__link--active" : ""}`
            }
            end
          >
            Proveedores
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
