import { useQuery } from "@tanstack/react-query";
import { StorageService } from "../services/StorageService";

export const useGetDataStorage = () => {
  return useQuery({
    queryKey: ["data"],
    queryFn: StorageService.getContentData,
  });
};
