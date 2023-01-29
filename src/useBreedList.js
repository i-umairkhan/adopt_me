import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

export default function useBreedList(animal) {
  const queryKey = ["breeds", animal];
  const results = useQuery(queryKey, () => fetchBreedList(queryKey));

  return [results?.data?.breeds ?? [], results.status];
}
