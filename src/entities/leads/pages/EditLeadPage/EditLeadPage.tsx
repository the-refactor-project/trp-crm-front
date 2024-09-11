import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import { getPath } from "@/router/paths";
import Error from "@/components/Error";
import useAppStore from "../../../../store/useAppStore";
import { useLeadQuery } from "../../queries/useLeadQuery";
import { useUpdateLeadMutation } from "../../mutations/leadsMutations";
import { LeadFormDataStructure, LeadStructure } from "../../schema";
import LeadForm from "../../components/LeadForm";
import useTitle from "../../../../hooks/useTitle";

const EditLeadPage: React.FC = () => {
  useTitle("Editar lead");
  const { updateLead } = useAppStore();
  const { leadId } = useParams<{ leadId: string }>();
  const { data, isLoading, isError } = useLeadQuery(leadId!);
  const { mutateAsync, isPending } = useUpdateLeadMutation();
  const navigate = useNavigate();

  const onUpdateLead = async (lead: LeadStructure) => {
    await mutateAsync(lead);

    updateLead(lead);

    navigate(getPath("leads"));
  };

  return (
    <>
      <h1>Editar lead</h1>
      <LeadForm
        onSubmit={(formValues) => onUpdateLead(formValues as LeadStructure)}
        initialValues={data as LeadFormDataStructure}
      />
      {isError && <Error message="No se han podido cargar los datos" />}
      {(isLoading || isPending) && <Loading />}
    </>
  );
};

export default EditLeadPage;
