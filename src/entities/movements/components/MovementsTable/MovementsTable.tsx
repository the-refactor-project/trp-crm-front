import { MovementStructure } from "../../schema";
import "./MovementsTable.css";

interface MovementsTableProps {
  movements: MovementStructure[];
}

const MovementsTable: React.FC<MovementsTableProps> = ({ movements }) => {
  const currencies: Record<MovementStructure["currency"], string> = {
    EUR: "€",
    USD: "$",
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
        </tr>
      </thead>
      <tbody>
        {movements.map(
          ({ id, date, quantity, currency, description, type }) => (
            <tr className="datatable__row" key={id}>
              <td className="datatable__cell datatable__cell--checkbox">
                <input type="checkbox" />
              </td>
              <td className="datatable__cell datatable__cell--date">
                {new Date(date).toLocaleDateString()}
              </td>
              <td className="datatable__cell">{description}</td>
              <td className="datatable__cell datatable__cell--quantity">
                {type === "out" && "-"}
                {quantity}
                {currencies[currency]}
              </td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
};

export default MovementsTable;
