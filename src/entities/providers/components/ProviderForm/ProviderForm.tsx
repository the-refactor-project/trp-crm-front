import { useEffect, useState } from "react";
import ButtonSolid from "../../../../components/ButtonSolid";
import { ProviderFormDataStructure, ProviderStructure } from "../../schema";
import "./ProviderForm.css";

interface LeadFormProps {
  initialValues?: ProviderStructure;
  onSubmit: (formValues: ProviderFormDataStructure) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ initialValues, onSubmit }) => {
  const initialFormValues: ProviderFormDataStructure = {
    _id: "",
    name: "",
    commercialName: "",
    address: "",
    city: "",
    country: "",
    locality: "",
    zip: "",
    email: "",
    nif: "",
    vat: "",
    currency: "EUR",
    phoneNumber: "",
  };

  const [formValues, setFormValues] =
    useState<ProviderFormDataStructure>(initialFormValues);

  useEffect(() => {
    if (initialValues) {
      setFormValues({
        _id: initialValues._id,
        name: initialValues.name,
        commercialName: initialValues.commercialName,
        nif: initialValues.nif,
        vat: initialValues.vat,
        email: initialValues.email,
        currency: initialValues.currency,
        phoneNumber: initialValues.phoneNumber,
        address: initialValues.address?.address,
        locality: initialValues.address?.locality,
        city: initialValues.address?.city,
        country: initialValues.address?.country,
        zip: initialValues.address?.zip,
      });
    }
  }, [initialValues]);

  const changeFormValues = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <form className="form" onSubmit={submitForm}>
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
        <label htmlFor="commercialName" className="form__label">
          Nombre comercial:
        </label>
        <input
          type="text"
          className="form__control"
          id="commercialName"
          value={formValues.commercialName}
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
        <label htmlFor="vat" className="form__label">
          VAT:
        </label>
        <input
          type="text"
          className="form__control"
          id="vat"
          value={formValues.vat}
          onChange={changeFormValues}
        />
      </div>
      <div className="form__group">
        <label htmlFor="address" className="form__label">
          Dirección:
        </label>
        <input
          type="text"
          className="form__control"
          id="address"
          value={formValues.address}
          onChange={changeFormValues}
        />
      </div>
      <div className="form__group">
        <label htmlFor="zip" className="form__label">
          Código postal:
        </label>
        <input
          type="text"
          className="form__control"
          id="zip"
          value={formValues.zip}
          onChange={changeFormValues}
        />
      </div>
      <div className="form__group">
        <label htmlFor="locality" className="form__label">
          Localidad:
        </label>
        <input
          type="text"
          className="form__control"
          id="locality"
          value={formValues.locality}
          onChange={changeFormValues}
        />
      </div>
      <div className="form__group">
        <label htmlFor="city" className="form__label">
          Ciudad:
        </label>
        <input
          type="text"
          className="form__control"
          id="city"
          value={formValues.city}
          onChange={changeFormValues}
        />
      </div>
      <div className="form__group">
        <label htmlFor="country" className="form__label">
          País:
        </label>
        <input
          type="text"
          className="form__control"
          id="country"
          value={formValues.country}
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
