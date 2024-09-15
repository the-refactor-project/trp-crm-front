import { useQuery } from "@tanstack/react-query";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { ProviderStructure } from "../../../providers/schema";
import ButtonOutline from "../../../../components/ButtonOutline";
import "./AutoComplete.css";

interface AutoCompleteProps {
  onComplete: (provider: ProviderStructure | null) => void;
}

const AutoComplete: React.FC<AutoCompleteProps & ComponentProps<"input">> = (
  props,
) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<ProviderStructure[]>([]);
  const [selectedResult, setSelectedResult] =
    useState<ProviderStructure | null>();

  const timer = useRef<number>();

  const { data } = useQuery<ProviderStructure[]>({
    queryKey: ["searchResults", search],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/providers/start/${search}`,
      );

      const body = (await response.json()) as {
        providers: ProviderStructure[];
      };

      return body.providers;
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

  const onSelectResult = (provider: ProviderStructure) => {
    setSelectedResult(provider);

    props.onComplete(provider);
  };

  const onDeselectResult = () => {
    setSelectedResult(null);
    setResults([]);
    props.onComplete(null);
  };

  useEffect(() => {
    setResults(data ?? []);
  }, [data]);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className="autocomplete">
      {selectedResult ? (
        <div className="autocomplete__selected-result">
          <span>{selectedResult.name} </span>
          <ButtonOutline isRound hasIcon onClick={onDeselectResult}>
            <img
              src="/icons/close.svg"
              alt="Deseleccionar proveedor"
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
            id={props.id}
            onChange={triggerSearch}
          />
          {results && results.length > 0 && (
            <ul className="autocomplete__results">
              {results.map((provider) => (
                <li key={provider._id}>
                  <button
                    type="button"
                    className="autocomplete__result-button"
                    onClick={() => onSelectResult(provider)}
                  >
                    {provider.name}
                    {provider.name !== provider.commercialName &&
                      provider.commercialName}
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
