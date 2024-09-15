import { useQuery } from "@tanstack/react-query";
import { ComponentProps, useEffect, useRef, useState } from "react";
import ButtonOutline from "../ButtonOutline";
import "./AutoComplete.css";

interface AutoCompleteProps<Entity extends { _id: string }> {
  entitySingular: string;
  entityPlural: string;
  fieldToShow: keyof Entity;
  onComplete: (entity: Entity | null) => void;
}

const AutoComplete = <Entity extends { _id: string }>({
  entityPlural,
  fieldToShow,
  onComplete,
  id,
}: AutoCompleteProps<Entity> & ComponentProps<"input">) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Entity[]>([]);
  const [selectedResult, setSelectedResult] = useState<Entity | null>();
  const [resultName, setResultName] = useState("");

  const timer = useRef<number>();

  const { data } = useQuery<Entity[]>({
    queryKey: [`${entityPlural}SearchResults`, search],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${entityPlural}/search/${search}`,
      );

      const body = await response.json();

      return body[entityPlural];
    },
    staleTime: 30000,
    enabled: search.length >= 3,
  });

  const triggerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    timer.current = window.setTimeout(() => {
      clearTimeout(timer.current);

      setSearch(event.target.value);
    }, 300);
  };

  const onSelectResult = (entity: Entity) => {
    setSelectedResult(entity);

    onComplete(entity);
  };

  const onDeselectResult = () => {
    setSelectedResult(null);
    setResults([]);
    onComplete(null);
  };

  useEffect(() => {
    setResults(data ?? []);
  }, [data]);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (selectedResult) {
      const name = selectedResult[fieldToShow] as string;

      setResultName(name);
    } else {
      setResultName("");
    }
  }, [fieldToShow, selectedResult]);

  return (
    <div className="autocomplete">
      {selectedResult ? (
        <div className="autocomplete__selected-result">
          <span>{resultName}</span>
          <ButtonOutline isRound hasIcon onClick={onDeselectResult}>
            <img
              src="/icons/close.svg"
              alt="Deseleccionar"
              width="24"
              height="24"
            />
          </ButtonOutline>
        </div>
      ) : (
        <>
          <input
            type="text"
            className="form__control"
            id={id}
            onChange={triggerSearch}
          />
          {results && results.length > 0 && (
            <ul className="autocomplete__results">
              {results.map((result) => (
                <li key={result._id}>
                  <button
                    type="button"
                    className="autocomplete__result-button"
                    onClick={() => onSelectResult(result)}
                  >
                    {result[fieldToShow] as string}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default AutoComplete;
