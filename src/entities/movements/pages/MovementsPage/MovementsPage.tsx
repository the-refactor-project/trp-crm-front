import { useEffect } from "react";
import useAppStore from "@/store/useAppStore";
import { useMovementsQuery } from "@movements/queries/useMovementsQuery";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

const MovementsPage: React.FC = () => {
  const { movements, loadMovements } = useAppStore((state) => state);
  const { data, isSuccess, isLoading, isError } = useMovementsQuery(1);

  useEffect(() => {
    if (isSuccess) {
      loadMovements(data?.movements);
    }
  }, [data?.movements, isSuccess, loadMovements]);

  return (
    <>
      <h1>Movimientos ({movements.length})</h1>
      {isLoading && <Loading />}
      {isError && <Error />}
    </>
  );
};

export default MovementsPage;
