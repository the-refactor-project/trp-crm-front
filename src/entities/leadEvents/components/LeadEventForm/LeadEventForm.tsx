import { useState } from "react";
import ButtonSolid from "../../../../components/ButtonSolid";
import { LeadEventFormDataStructure } from "../../schema";

interface LeadEventFormProps {
  onSubmit: (formValues: LeadEventFormDataStructure) => void;
}

const LeadEventForm: React.FC<LeadEventFormProps> = ({ onSubmit }) => {
  const initialFormValues: LeadEventFormDataStructure = {
    description: "",
    date: "",
    leadId: "",
  };
  const [formValues, setFormValues] =
    useState<LeadEventFormDataStructure>(initialFormValues);

  const changeFormValues = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [event.target.id]: event.target.value,
    }));
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit(formValues);
  };

  return (
    <>
      <h2>Nuevo evento</h2>
      <form className="form" onSubmit={submitForm}>
        <div className="form__group">
          <label htmlFor="date" className="form__label">
            Fecha:
          </label>
          <input
            type="date"
            id="date"
            className="form__control"
            value={formValues.date.toString()}
            onChange={changeFormValues}
          />
        </div>
        <div className="form__group">
          <label htmlFor="description" className="form__label">
            Descripción:
          </label>
          <textarea
            id="description"
            className="form__control"
            value={formValues.description}
            onChange={changeFormValues}
          />
        </div>
        <div className="form__group">
          <ButtonSolid type="submit">Añadir</ButtonSolid>
        </div>
      </form>
    </>
  );
};

export default LeadEventForm;
