import { useEffect, useState } from "react";
import ButtonSolid from "../../../../components/ButtonSolid";
import { LeadFormDataStructure } from "../../schema";
import "./LeadForm.css";

interface LeadFormProps {
  initialValues?: LeadFormDataStructure;
  onSubmit: (formValues: LeadFormDataStructure) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ initialValues, onSubmit }) => {
  const initialFormValues: LeadFormDataStructure = {
    name: "",
    lastName: "",
    address: {
      address: "",
      city: "",
      country: "",
      locality: "",
      zip: "",
    },
    askedFor: "",
    channel: "",
    email: "",
    formComments: "",
    nif: "",
    origin: "",
    phoneNumber: "",
    referralOf: "",
    entryDate: "",
  };

  const [formValues, setFormValues] =
    useState<LeadFormDataStructure>(initialFormValues);

  useEffect(() => {
    if (initialValues) {
      setFormValues({
        ...initialValues,
        entryDate: initialValues.entryDate.toString().split("T")[0],
      });
    }
  }, [initialValues]);

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
    formValues.entryDate = new Date(formValues.entryDate);

    onSubmit(formValues);
  };

  return (
    <form className="form" onSubmit={submitForm}>
      <div className="form__group">
        <label htmlFor="entryDate" className="form__label">
          Fecha:
        </label>
        <input
          type="date"
          className="form__control"
          id="entryDate"
          value={formValues.entryDate.toString()}
          onChange={changeFormValues}
        />
      </div>
      <div className="form__group">
        <label htmlFor="name" className="form__label">
          Nombre:
        </label>
        <input
          type="text"
          className="form__control"
          id="name"
          value={formValues.name}
          onChange={changeFormValues}
        />
      </div>
      <div className="form__group">
        <label htmlFor="lastName" className="form__label">
          Apellidos:
        </label>
        <input
          type="text"
          className="form__control"
          id="lastName"
          value={formValues.lastName}
          onChange={changeFormValues}
        />
      </div>
      <div className="form__group">
        <label htmlFor="email" className="form__label">
          Email:
        </label>
        <input
          type="email"
          className="form__control"
          id="email"
          value={formValues.email}
          onChange={changeFormValues}
        />
      </div>
      <div className="form__group">
        <label htmlFor="phoneNumber" className="form__label">
          Teléfono:
        </label>
        <input
          type="tel"
          className="form__control"
          id="phoneNumber"
          value={formValues.phoneNumber}
          onChange={changeFormValues}
        />
      </div>
      <div className="form__group">
        <label htmlFor="nif" className="form__label">
          NIF:
        </label>
        <input
          type="text"
          className="form__control"
          id="nif"
          value={formValues.nif}
          onChange={changeFormValues}
        />
      </div>
      <div className="form__group">
        <label htmlFor="formComments" className="form__label">
          Comentarios del formulario:
        </label>
        <textarea
          className="form__control"
          id="formComments"
          value={formValues.formComments}
          onChange={changeFormValues}
        />
      </div>
      <div className="form__group">
        <label htmlFor="channel" className="form__label">
          Canal:
        </label>
        <input
          type="text"
          className="form__control"
          id="channel"
          value={formValues.channel}
          onChange={changeFormValues}
        />
      </div>
      <div className="form__group">
        <label htmlFor="origin" className="form__label">
          Origen:
        </label>
        <input
          type="text"
          className="form__control"
          id="origin"
          value={formValues.origin}
          onChange={changeFormValues}
        />
      </div>
      <div className="form__group">
        <label htmlFor="askedFor" className="form__label">
          Preguntó por:
        </label>
        <input
          type="text"
          className="form__control"
          id="askedFor"
          value={formValues.askedFor}
          onChange={changeFormValues}
        />
      </div>
      <div className="form__group">
        <label htmlFor="referralOf" className="form__label">
          Referido de:
        </label>
        <input
          type="text"
          className="form__control"
          id="referralOf"
          value={formValues.referralOf}
          onChange={changeFormValues}
        />
      </div>
      <div className="form__group">
        <ButtonSolid type="submit">
          {initialValues ? "Modificar" : "Crear"}
        </ButtonSolid>
      </div>
    </form>
  );
};

export default LeadForm;
