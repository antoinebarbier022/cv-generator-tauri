import { useQuery } from "@tanstack/react-query";
import { DataService } from "../services/DataService";

export const useGetDataStorage = () => {
  return useQuery({ queryKey: ["data"], queryFn: DataService.get });
};
