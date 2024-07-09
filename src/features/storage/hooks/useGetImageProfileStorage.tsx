import { useQuery } from "@tanstack/react-query";
import { StorageService } from "../services/StorageService";

export const useGetImageProfileStorage = () => {
  return useQuery({
    queryKey: ["image_profile"],
    queryFn: StorageService.getImageProfile,
  });
};
