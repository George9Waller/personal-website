enum ProjectCategories {
  PHOTOGRAPHY = "Photography",
}

export const getCategoryClasses = (category: string) => {
  switch (category) {
    case ProjectCategories.PHOTOGRAPHY:
      return 'badge badge-secondary';
    default:
      return 'badge badge-outline badge-primary';
  }
};

export const getProjectDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en", {  // FIXME: translate
    month: "short",
    year: "numeric",
  });
}
