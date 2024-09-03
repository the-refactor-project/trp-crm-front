import { useNavigate, useParams } from "react-router-dom";
import MovementForm from "@/components/MovementForm";
import { MovementFormDataStructure } from "@movements/schema";
import { useAddMovementMutation } from "@movements/mutations/movementsMutations";
import useAppStore from "@/store/useAppStore";
import Loading from "@/components/Loading";
import { getPath } from "@/router/paths";
import { useMovementQuery } from "@movements/queries/useMovementQuery";
import Error from "@/components/Error";

const EditMovementPage: React.FC = () => {
  const { addMovement } = useAppStore((state) => state);
  const { movementId } = useParams<{ movementId: string }>();
  const { data, isLoading, isError } = useMovementQuery(movementId!);
  const { mutateAsync, isPending } = useAddMovementMutation();
  const navigate = useNavigate();

  const createMovement = async (newMovementData: MovementFormDataStructure) => {
    const newMovement = await mutateAsync(newMovementData);

    addMovement(newMovement);

    navigate(getPath("movements"));
  };

  return (
    <>
      <h1>Editar movimiento</h1>
      <MovementForm
        onSubmit={createMovement}
        initialValues={data as MovementFormDataStructure}
      />
      {isError && <Error message="No se han podido cargar los datos" />}
      {(isLoading || isPending) && <Loading />}
    </>
  );
};

export default EditMovementPage;
