import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "@/store/useAppStore";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { getPath } from "@/router/paths";
import ButtonSolid from "@/components/ButtonSolid";
import { LeadStructure } from "../../schema";
import { useLeadsQuery } from "../../queries/useLeadsQuery";
import Confirm from "../../../../components/Confirm";
import LeadsTable from "../../components/LeadsTable";
import { useDeleteLead } from "../../mutations/leadsMutations";

const LeadsPage: React.FC = () => {
  const {
    leads,
    loadLeads,
    deleteLeadById: deleteMovementById,
  } = useAppStore((state) => state);
  const [isConfirmOpen, setIsConfirmOpen] = useState<LeadStructure["_id"]>("");
  const { data, isSuccess, isLoading, isError } = useLeadsQuery();
  const { mutateAsync, isError: isMutationError, isPending } = useDeleteLead();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      loadLeads(data);
    }
  }, [data, isSuccess, loadLeads]);

  const navigateToNewLeadPage = () => {
    navigate(getPath("leads", "new"));
  };

  const deleteLead = async () => {
    await mutateAsync(isConfirmOpen);

    deleteMovementById(isConfirmOpen);

    closeConfirm();
  };

  const closeConfirm = () => {
    setIsConfirmOpen("");
  };

  const openConfirm = (leadId: LeadStructure["_id"]) => {
    setIsConfirmOpen(leadId);
  };

  return (
    <>
      <header className="section-header">
        <h1>Leads ({leads.length})</h1>
        <ButtonSolid onClick={navigateToNewLeadPage}>Nuevo</ButtonSolid>
      </header>
      <LeadsTable leads={leads} onDeleteLead={openConfirm} />
      {isLoading || (isPending && <Loading />)}
      {isError && <Error message="No se han podido cargar los datos" />}
      {isMutationError && <Error message="No se ha podido eliminar el lead" />}
      {isConfirmOpen && (
        <Confirm
          text="¿Seguro que quieres eliminar este lead?"
          onConfirm={deleteLead}
          onCancel={closeConfirm}
        />
      )}
    </>
  );
};

export default LeadsPage;
