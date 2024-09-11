import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "@/store/useAppStore";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { getPath } from "@/router/paths";
import ButtonSolid from "@/components/ButtonSolid";
import { ProviderStructure } from "../../schema";
import { useProvidersQuery } from "../../queries/useProvidersQuery";
import Confirm from "../../../../components/Confirm";
import ProvidersTable from "../../components/ProvidersTable";
import { useDeleteProviderMutation } from "../../mutations/providersMutations";

const ProvidersPage: React.FC = () => {
  const { providers, loadProviders, deleteProviderById } = useAppStore(
    (state) => state,
  );
  const [isConfirmOpen, setIsConfirmOpen] =
    useState<ProviderStructure["_id"]>("");
  const { data, isSuccess, isLoading, isError } = useProvidersQuery();
  const {
    mutateAsync,
    isError: isMutationError,
    isPending,
  } = useDeleteProviderMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      loadProviders(data);
    }
  }, [data, isSuccess, loadProviders]);

  const navigateToNewProviderPage = () => {
    navigate(getPath("providers", "new"));
  };

  const deleteProvider = async () => {
    await mutateAsync(isConfirmOpen);

    deleteProviderById(isConfirmOpen);

    closeConfirm();
  };

  const closeConfirm = () => {
    setIsConfirmOpen("");
  };

  const openConfirm = (providerId: ProviderStructure["_id"]) => {
    setIsConfirmOpen(providerId);
  };

  return (
    <>
      <header className="section-header">
        <h1>Proveedores ({providers.length})</h1>
        <ButtonSolid onClick={navigateToNewProviderPage}>Nuevo</ButtonSolid>
      </header>
      <ProvidersTable providers={providers} onDeleteProvider={openConfirm} />
      {isLoading || (isPending && <Loading />)}
      {isError && <Error message="No se han podido cargar los datos" />}
      {isMutationError && (
        <Error message="No se ha podido eliminar el proveedor" />
      )}
      {isConfirmOpen && (
        <Confirm
          text="¿Seguro que quieres eliminar este proveedor?"
          onConfirm={deleteProvider}
          onCancel={closeConfirm}
        />
      )}
    </>
  );
};

export default ProvidersPage;
