import useTitle from "../../../../hooks/useTitle";
import ImportLeadsForm from "../../components/ImportLeadsForm";
import { useImportLeadsMutation } from "../../mutations/leadsMutations";

const ImportLeadsPage: React.FC = () => {
  useTitle("Importar leads");

  const importLeadsMutation = useImportLeadsMutation();

  const sendContacts = (formData: FormData) => {
    importLeadsMutation.mutateAsync(formData);
  };

  return (
    <>
      <header className="section-header">
        <h1>Importar leads</h1>
      </header>
      <ImportLeadsForm onSubmit={sendContacts} />
    </>
  );
};

export default ImportLeadsPage;
