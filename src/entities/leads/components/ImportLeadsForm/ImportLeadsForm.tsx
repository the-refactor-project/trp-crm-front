import * as XLSX from "xlsx";
import { useState } from "react";
import ButtonSolid from "../../../../components/ButtonSolid";
import "./ImportLeadsForm.css";

interface ImportLeadsFormProps {
  onSubmit: (formData: FormData) => void;
}

const ImportLeadsForm: React.FC<ImportLeadsFormProps> = ({ onSubmit }) => {
  const [contacts, setContacts] = useState<string[][]>([]);
  const [selectedContactsIndexes, setSelectedContactsIndexes] = useState<
    number[]
  >([]);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = form.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const file = fileInput?.files?.[0];

    if (!file) {
      throw new Error("Missing file");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("selectedIndexes", JSON.stringify(selectedContactsIndexes));

    onSubmit(formData);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const arrayBuffer = event.target?.result;

        if (arrayBuffer) {
          const data = new Uint8Array(arrayBuffer as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });

          const worksheet = workbook.Sheets.Contactos;

          const jsonData = XLSX.utils.sheet_to_json<string[]>(worksheet, {
            header: 1,
          });
          jsonData.splice(0, 1);
          setContacts(jsonData);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const toggleContact = (index: number) => {
    if (selectedContactsIndexes.includes(index)) {
      setSelectedContactsIndexes((selectedContactsIndexes) =>
        selectedContactsIndexes.filter(
          (selectedContactIndex) => selectedContactIndex !== index,
        ),
      );
    } else {
      setSelectedContactsIndexes((selectedContactsIndexes) => [
        ...selectedContactsIndexes,
        index,
      ]);
    }
  };

  const selectAllContacts = () => {
    setSelectedContactsIndexes(
      contacts.map((_contact, index) => {
        return index;
      }),
    );
  };

  const unSelectAllContacts = () => {
    setSelectedContactsIndexes([]);
  };

  return (
    <>
      <form className="form" onSubmit={submitForm}>
        <div className="form__group">
          <label htmlFor="xlsx" className="form__label">
            Archivo XLSX:
          </label>
          <input
            type="file"
            className="form__control"
            id="xlsx"
            accept=".xlsx"
            onChange={handleFileChange}
          />
        </div>
        {contacts.length > 0 && (
          <div className="form__group form__actions">
            <ButtonSolid
              type="submit"
              disabled={selectedContactsIndexes.length === 0}
            >
              Importar
            </ButtonSolid>
            <ButtonSolid type="button" onClick={selectAllContacts}>
              Marcar todos
            </ButtonSolid>
            <ButtonSolid type="button" onClick={unSelectAllContacts}>
              Desmarcar todos
            </ButtonSolid>
          </div>
        )}
      </form>
      <ul className="contacts">
        {contacts.map((contactData, index) => (
          <li key={index}>
            <input
              type="checkbox"
              id={`contact-${index}`}
              checked={selectedContactsIndexes.includes(index)}
              onChange={() => toggleContact(index)}
            />{" "}
            <label htmlFor={`contact-${index}`}>
              {contactData.slice(0, 6).join(", ")}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ImportLeadsForm;
