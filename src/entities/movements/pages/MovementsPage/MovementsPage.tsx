import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "@/store/useAppStore";
import { useMovementsQuery } from "@movements/queries/useMovementsQuery";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import MovementsTable from "@movements/components/MovementsTable";
import { getPath } from "@/router/paths";
import ButtonSolid from "@/components/ButtonSolid";
import { useDeleteMovementMutation } from "../../mutations/movementsMutations";
import { MovementStructure } from "../../schema";
import Confirm from "@/components/Confirm";
import useTitle from "../../../../hooks/useTitle";

const MovementsPage: React.FC = () => {
  useTitle("Movimientos");
  const { movements, loadMovements, deleteMovementById } = useAppStore(
    (state) => state,
  );
  const [isConfirmOpen, setIsConfirmOpen] =
    useState<MovementStructure["_id"]>("");
  const { data, isSuccess, isLoading, isError } = useMovementsQuery();
  const {
    mutateAsync,
    isError: isMutationError,
    isPending,
  } = useDeleteMovementMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      loadMovements(data);
    }
  }, [data, isSuccess, loadMovements]);

  const navigateToNewMovementPage = () => {
    navigate(getPath("movements", "new"));
  };

  const deleteMovement = async () => {
    await mutateAsync(isConfirmOpen);

    deleteMovementById(isConfirmOpen);

    closeConfirm();
  };

  const closeConfirm = () => {
    setIsConfirmOpen("");
  };

  const openConfirm = (movementId: MovementStructure["_id"]) => {
    setIsConfirmOpen(movementId);
  };

  return (
    <>
      <header className="section-header">
        <h1>Movimientos ({movements.length})</h1>
        <ButtonSolid onClick={navigateToNewMovementPage}>Nuevo</ButtonSolid>
      </header>
      <MovementsTable movements={movements} onDeleteMovement={openConfirm} />
      {(isLoading || isPending) && <Loading />}
      {isError && <Error message="No se han podido cargar los datos" />}
      {isMutationError && (
        <Error message="No se ha podido eliminar el movimiento" />
      )}
      {isConfirmOpen && (
        <Confirm
          text="¿Seguro que quieres eliminar este movimiento?"
          onConfirm={deleteMovement}
          onCancel={closeConfirm}
        />
      )}
    </>
  );
};

export default MovementsPage;
