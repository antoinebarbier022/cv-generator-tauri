import { DropResult } from "react-beautiful-dnd";

export const useSection = (sectionKey: string) => {
  // TODO avoir une liste d'id des items et non pas leurs contenu
  console.log(sectionKey);
  const sectionList: string[] = [];

  const dragEnded = (result: DropResult) => {
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    // Reorder the list
    const items = () => {
      const tempArray = Array.from(sectionList);
      const [removed] = tempArray.splice(startIndex, 1);
      return tempArray.splice(endIndex, 0, removed);
    };

    // TODO mettre à jour la liste avec le nouveau positionnement
    console.log(items);
  };

  const addItem = (): string => {
    return crypto.randomUUID();
  };

  const changeItemVisibility = (visible: boolean): void => {
    console.log(visible);
  };

  const isEmpty = (): boolean => {
    return false;
  };

  return { addItem, dragEnded, isEmpty, changeItemVisibility };
};
