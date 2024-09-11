import ButtonSolid from "../../../../components/ButtonSolid";
import { Link } from "react-router-dom";
import { getPath } from "../../../../router/paths";
import { ProviderStructure } from "../../schema";
import "./ProvidersTable.css";

interface ProvidersTableProps {
  providers: ProviderStructure[];
  onDeleteProvider: (providerId: ProviderStructure["_id"]) => void;
}

const ProvidersTable: React.FC<ProvidersTableProps> = ({
  providers,
  onDeleteProvider,
}) => {
  const deleteProvider = (providerId: ProviderStructure["_id"]) => {
    onDeleteProvider(providerId);
  };

  return (
    <table className="datatable">
      <thead>
        <tr className="datatable__row">
          <th className="datatable__cell datatable__cell--checkbox">&nbsp;</th>
          <th className="datatable__cell">Nombre</th>
          <th className="datatable__cell">Nombre comercial</th>
          <th className="datatable__cell datatable__cell--actions">&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {providers.map(({ _id, name, commercialName }) => (
          <tr className="datatable__row" key={_id}>
            <td className="datatable__cell datatable__cell--checkbox">
              <input type="checkbox" />
            </td>
            <td className="datatable__cell">{name}</td>
            <td className="datatable__cell">{commercialName}</td>
            <td className="datatable__cell datatable__cell--actions">
              <Link
                to={getPath("providers", "edit", _id)}
                className="button button--solid"
              >
                editar
              </Link>
              <ButtonSolid onClick={() => deleteProvider(_id)}>
                borrar
              </ButtonSolid>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProvidersTable;
