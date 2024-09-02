import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "@/store/useAppStore";
import { useMovementsQuery } from "@movements/queries/useMovementsQuery";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import MovementsTable from "@movements/components/MovementsTable";
import { getPath } from "@/router/paths";
import ButtonSolid from "@/components/ButtonSolid";

const MovementsPage: React.FC = () => {
  const { movements, loadMovements } = useAppStore((state) => state);
  const { data, isSuccess, isLoading, isError } = useMovementsQuery(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      loadMovements(data?.movements);
    }
  }, [data?.movements, isSuccess, loadMovements]);

  const navigateToNewMovementPage = () => {
    navigate(getPath("movements", "new"));
  };

  return (
    <>
      <header className="section-header">
        <h1>Movimientos ({movements.length})</h1>
        <ButtonSolid onClick={navigateToNewMovementPage}>Nuevo</ButtonSolid>
      </header>
      <MovementsTable movements={movements} />
      {isLoading && <Loading />}
      {isError && <Error message="No se han podido cargar los datos" />}
    </>
  );
};

export default MovementsPage;
