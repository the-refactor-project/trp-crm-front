import { useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import useTitle from "../../../../hooks/useTitle";
import { useLeadEventsQuery } from "../../queries/useLeadEventsQuery";
import { LeadStructure } from "../../../leads/schema";
import { LeadEventFormDataStructure, LeadEventStructure } from "../../schema";
import {
  useAddLeadEventMutation,
  useDeleteLeadEventMutation,
} from "../../mutations/leadEventsMutations";
import LeadEventsList from "../../components/LeadEventsList";
import LeadEventForm from "../../components/LeadEventForm";
import { useState } from "react";
import Confirm from "../../../../components/Confirm";

const LeadEventsPage: React.FC = () => {
  useTitle("Histórico del lead");
  const { leadId } = useParams<{ leadId: string }>();
  const [isConfirmOpen, setIsConfirmOpen] =
    useState<LeadEventStructure["_id"]>("");

  const { data, isSuccess, isLoading } = useLeadEventsQuery(
    leadId as LeadStructure["_id"],
  );

  const { mutateAsync: mutateAsyncAdd, isPending: isAddPending } =
    useAddLeadEventMutation();
  const { mutateAsync: mutateAsyncDelete, isPending: isDeletePending } =
    useDeleteLeadEventMutation();

  const submitForm = async (formValues: LeadEventFormDataStructure) => {
    formValues.date = new Date(formValues.date);
    formValues.leadId = leadId!;

    await mutateAsyncAdd(formValues);
  };

  const closeConfirm = () => {
    setIsConfirmOpen("");
  };

  const openConfirm = (leadEventId: LeadEventStructure["_id"]) => {
    setIsConfirmOpen(leadEventId);
  };

  const deleteLeadEvent = async () => {
    await mutateAsyncDelete(isConfirmOpen);

    closeConfirm();
  };

  return (
    <>
      <header className="section-header">
        <h1>Histórico del lead {data?.lead.name}</h1>
      </header>
      {isSuccess && (
        <LeadEventsList
          leadEvents={data.leadEvents}
          onDeleteLeadEvent={openConfirm}
        />
      )}
      <LeadEventForm onSubmit={submitForm} />
      {(isLoading || isAddPending || isDeletePending) && <Loading />}
      {isConfirmOpen && (
        <Confirm
          text="¿Seguro que quieres eliminar este evento?"
          onConfirm={deleteLeadEvent}
          onCancel={closeConfirm}
        />
      )}
    </>
  );
};

export default LeadEventsPage;
