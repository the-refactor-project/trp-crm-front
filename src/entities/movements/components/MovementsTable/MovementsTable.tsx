import { MovementStructure } from "@movements/schema";
import ButtonSolid from "../../../../components/ButtonSolid";
import { Link } from "react-router-dom";
import { getPath } from "../../../../router/paths";
import "./MovementsTable.css";

interface MovementsTableProps {
  movements: MovementStructure[];
  onDeleteMovement: (movementId: MovementStructure["_id"]) => void;
}

const MovementsTable: React.FC<MovementsTableProps> = ({
  movements,
  onDeleteMovement,
}) => {
  const currencies: Record<MovementStructure["currency"], string> = {
    EUR: "€",
    USD: "$",
  };

  const deleteMovement = (movementId: MovementStructure["_id"]) => {
    onDeleteMovement(movementId);
  };

  return (
    <table className="datatable">
      <thead>
        <tr className="datatable__row">
          <th className="datatable__cell datatable__cell--checkbox">&nbsp;</th>
          <th className="datatable__cell datatable__cell--date">Fecha</th>
          <th className="datatable__cell">Descripción</th>
          <th className="datatable__cell datatable__cell--quantity">
            Cantidad
          </th>
          <th className="datatable__cell datatable__cell--actions">&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {movements.map(
          ({ _id, date, quantity, currency, description, type, isCard }) => (
            <tr className="datatable__row" key={_id}>
              <td className="datatable__cell datatable__cell--checkbox">
                <input type="checkbox" />
              </td>
              <td className="datatable__cell datatable__cell--date">
                {new Date(date).toLocaleDateString()}
              </td>
              <td className="datatable__cell">
                {description}
                {isCard && (
                  <img
                    className="datatable__icon"
                    src="/icons/card.svg"
                    alt="Bank card"
                    title="Con tarjeta"
                    width={20}
                  />
                )}
              </td>
              <td className="datatable__cell datatable__cell--quantity">
                {type === "out" && "-"}
                {quantity}
                {currencies[currency]}
              </td>
              <td className="datatable__cell datatable__cell--actions">
                <Link
                  to={getPath("movements", "edit", _id)}
                  className="button button--solid"
                >
                  editar
                </Link>
                <ButtonSolid onClick={() => deleteMovement(_id)}>
                  borrar
                </ButtonSolid>
              </td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
};

export default MovementsTable;
