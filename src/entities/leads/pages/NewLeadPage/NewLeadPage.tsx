import { useNavigate } from "react-router-dom";
import useAppStore from "@/store/useAppStore";
import Loading from "@/components/Loading";
import { getPath } from "../../../../router/paths";
import { LeadFormDataStructure } from "../../schema";
import LeadForm from "../../components/LeadForm";
import { useAddLeadMutation } from "../../mutations/leadsMutations";
import useTitle from "../../../../hooks/useTitle";

const NewLeadPage: React.FC = () => {
  useTitle("Crear lead");
  const { addLead } = useAppStore((state) => state);
  const { mutateAsync, isPending } = useAddLeadMutation();
  const navigate = useNavigate();

  const createLead = async (newLeadData: LeadFormDataStructure) => {
    const newLead = await mutateAsync(newLeadData);

    addLead(newLead);

    navigate(getPath("leads"));
  };

  return (
    <>
      <h1>Nuevo lead</h1>
      <LeadForm onSubmit={createLead} />
      {isPending && <Loading />}
    </>
  );
};

export default NewLeadPage;
