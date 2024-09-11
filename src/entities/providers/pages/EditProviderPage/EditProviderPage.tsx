import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import { getPath } from "@/router/paths";
import Error from "@/components/Error";
import useAppStore from "../../../../store/useAppStore";
import { useProviderQuery } from "../../queries/useProviderQuery";
import { useUpdateProviderMutation } from "../../mutations/providersMutations";
import { ProviderFormDataStructure } from "../../schema";
import ProviderForm from "../../components/ProviderForm";

const EditProviderPage: React.FC = () => {
  const { updateProvider } = useAppStore();
  const { providerId } = useParams<{ providerId: string }>();
  const { data, isLoading, isError } = useProviderQuery(providerId!);
  const { mutateAsync, isPending } = useUpdateProviderMutation();
  const navigate = useNavigate();

  const onUpdateProvider = async (provider: ProviderFormDataStructure) => {
    const updatedProvider = await mutateAsync(provider);

    updateProvider(updatedProvider);

    navigate(getPath("providers"));
  };

  return (
    <>
      <h1>Editar proveedor</h1>
      <ProviderForm
        onSubmit={(formValues) => onUpdateProvider(formValues)}
        initialValues={data}
      />
      {isError && <Error message="No se han podido cargar los datos" />}
      {(isLoading || isPending) && <Loading />}
    </>
  );
};

export default EditProviderPage;
