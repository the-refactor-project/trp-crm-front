import { useNavigate } from "react-router-dom";
import useAppStore from "@/store/useAppStore";
import Loading from "@/components/Loading";
import { getPath } from "../../../../router/paths";
import ProviderForm from "../../components/ProviderForm";
import { useAddProviderMutation } from "../../mutations/providersMutations";
import { ProviderFormDataStructure } from "../../schema";

const NewProviderPage: React.FC = () => {
  const { addProvider } = useAppStore((state) => state);
  const { mutateAsync, isPending } = useAddProviderMutation();
  const navigate = useNavigate();

  const createProvider = async (newProviderData: ProviderFormDataStructure) => {
    const newProvider = await mutateAsync(newProviderData);

    addProvider(newProvider);

    navigate(getPath("providers"));
  };

  return (
    <>
      <h1>Nuevo proveedor</h1>
      <ProviderForm onSubmit={createProvider} />
      {isPending && <Loading />}
    </>
  );
};

export default NewProviderPage;
