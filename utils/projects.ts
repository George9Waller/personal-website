enum ProjectCategories {
  PHOTOGRAPHY = "Photography",
}

export const getCategoryClasses = (category: string, baseClass: string) => {
  switch (category) {
    case ProjectCategories.PHOTOGRAPHY:
      return `${baseClass} ${baseClass}-primary`;
    default:
      return `${baseClass} ${baseClass}-outline ${baseClass}-secondary`;
  }
};
