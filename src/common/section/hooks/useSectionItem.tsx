
export const useSectionItem = (sectionKey: string, itemId: string) => {
  // Récupérer le contenu d'un item ici

  const handleDelete = (): void => {
    console.log("section item handleDelete" + sectionKey + itemId );
  };

  const handleChangeVisibility = (visible: boolean): void => {
    console.log("section item  handleChangeVisibility : " + visible);
  };

  const isEmpty = (): boolean => {
    return false;
  };

  return { handleDelete, isEmpty, handleChangeVisibility };
};
