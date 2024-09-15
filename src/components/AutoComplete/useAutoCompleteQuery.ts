import { useQuery } from "@tanstack/react-query";

const useAutoCompleteQuery = <Entity>(search: string, entityPlural: string) => {
  return useQuery<Entity[]>({
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
};

export default useAutoCompleteQuery;
