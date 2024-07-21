import {
  ResumeContentSection,
  Translation,
} from "../features/storage/types/storage";

export const reorderListSection = (
  list: ResumeContentSection<Translation>[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
