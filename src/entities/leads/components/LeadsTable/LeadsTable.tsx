import ButtonSolid from "../../../../components/ButtonSolid";
import { Link } from "react-router-dom";
import { getPath } from "../../../../router/paths";
import { LeadStructure } from "../../schema";
import "./LeadsTable.css";

interface LeadsTableProps {
  leads: LeadStructure[];
  onDeleteLead: (leadId: LeadStructure["_id"]) => void;
}

const LeadsTable: React.FC<LeadsTableProps> = ({ leads, onDeleteLead }) => {
  const deleteLead = (leadId: LeadStructure["_id"]) => {
    onDeleteLead(leadId);
  };

  return (
    <table className="datatable">
      <thead>
        <tr className="datatable__row">
          <th className="datatable__cell datatable__cell--checkbox">&nbsp;</th>
          <th className="datatable__cell datatable__cell--date">Fecha</th>
          <th className="datatable__cell">Nombre</th>
          <th className="datatable__cell datatable__cell--quantity">
            Cantidad
          </th>
          <th className="datatable__cell datatable__cell--actions">&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {leads.map(({ _id, name, lastName, entryDate }) => (
          <tr className="datatable__row" key={_id}>
            <td className="datatable__cell datatable__cell--checkbox">
              <input type="checkbox" />
            </td>
            <td className="datatable__cell datatable__cell--date">
              {new Date(entryDate).toLocaleDateString()}
            </td>
            <td className="datatable__cell">
              {name} {lastName}
            </td>
            <td className="datatable__cell datatable__cell--quantity"></td>
            <td className="datatable__cell datatable__cell--actions">
              <Link
                to={getPath("leads", "edit", _id)}
                className="button button--solid"
              >
                editar
              </Link>
              <ButtonSolid onClick={() => deleteLead(_id)}>borrar</ButtonSolid>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeadsTable;
