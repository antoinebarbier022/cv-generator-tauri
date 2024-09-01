export const useItemSection = (sectionKey: string, itemId: string) => {
  // Récupérer le contenu d'un item ici

  const handleDelete = (): void => {
    console.log("delete item", { sectionKey, itemId });
  };

  const handleChangeVisibility = (visible: boolean): void => {
    console.log(visible);
  };

  const isEmpty = (): boolean => {
    return false;
  };

  return { handleDelete, isEmpty, handleChangeVisibility };
};
