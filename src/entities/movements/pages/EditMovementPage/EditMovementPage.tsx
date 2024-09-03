import { useNavigate, useParams } from "react-router-dom";
import MovementForm from "@/components/MovementForm";
import {
  MovementFormDataStructure,
  MovementStructure,
} from "@movements/schema";
import { useUpdateMovementMutation } from "@movements/mutations/movementsMutations";
import Loading from "@/components/Loading";
import { getPath } from "@/router/paths";
import { useMovementQuery } from "@movements/queries/useMovementQuery";
import Error from "@/components/Error";

const EditMovementPage: React.FC = () => {
  const { movementId } = useParams<{ movementId: string }>();
  const { data, isLoading, isError } = useMovementQuery(movementId!);
  const { mutateAsync, isPending } = useUpdateMovementMutation();
  const navigate = useNavigate();

  const updateMovement = async (movement: MovementStructure) => {
    await mutateAsync(movement);

    // addMovement(updateMovement);

    navigate(getPath("movements"));
  };

  return (
    <>
      <h1>Editar movimiento</h1>
      <MovementForm
        onSubmit={(formValues) =>
          updateMovement(formValues as MovementStructure)
        }
        initialValues={data as MovementFormDataStructure}
      />
      {isError && <Error message="No se han podido cargar los datos" />}
      {(isLoading || isPending) && <Loading />}
    </>
  );
};

export default EditMovementPage;
