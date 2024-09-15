import ButtonSolid from "../../../../components/ButtonSolid";
import { Link } from "react-router-dom";
import { getPath } from "../../../../router/paths";
import { ExpenseStructure } from "../../schema";
import "./ExpensesTable.css";

interface ExpensesTableProps {
  expenses: ExpenseStructure[];
  onDeleteExpense: (expenseId: ExpenseStructure["_id"]) => void;
}

const ExpensesTable: React.FC<ExpensesTableProps> = ({
  expenses,
  onDeleteExpense,
}) => {
  const currencies: Record<ExpenseStructure["currency"], string> = {
    EUR: "€",
    USD: "$",
  };

  const deleteExpense = (expenseId: ExpenseStructure["_id"]) => {
    onDeleteExpense(expenseId);
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
        {expenses.map(
          ({ _id, date, quantity, currency, description, isCard }) => (
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
                <ButtonSolid onClick={() => deleteExpense(_id)}>
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

export default ExpensesTable;
