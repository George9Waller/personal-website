import React, { useState } from "react";
import { createContext, useContext } from "react";
import { BlogImageOrdering } from "../../utils/constants";
import { ProjectCategories } from "../../utils/projects";

interface IAppContext {
  categories: string[];
  addCategory: (name: ProjectCategories) => void;
  removeCategory: (name: ProjectCategories) => void;
  addSingularCategory: (name: ProjectCategories) => void;
  addAllCategories: () => void;
  sort: keyof BlogImageOrdering;
  setSort: (key: keyof BlogImageOrdering) => void;
}

const appContextDefaultValues: IAppContext = {
  categories: Object.entries(ProjectCategories).map(
    ([_key, category]) => category
  ),
  sort: "VIEWS_DESC",
  /* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars */
  addCategory: (name) => {},
  removeCategory: (name) => {},
  addSingularCategory: (name) => {},
  addAllCategories: () => {},
  setSort: (key) => {},
  /* eslint-enable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars */
};

const AppContext = createContext<IAppContext>(appContextDefaultValues);

export const useAppContext = () => useContext(AppContext);

interface Props {
  children: React.ReactNode;
}

export const AppContextProvider = ({ children }: Props) => {
  const [categories, setCategories] = useState<string[]>(
    appContextDefaultValues.categories
  );
  const [sort, setSortState] = useState(appContextDefaultValues.sort);

  const addCategory = (name: ProjectCategories) =>
    setCategories([...categories, name]);

  const removeCategory = (name: ProjectCategories) =>
    setCategories(categories.filter((value: string) => value !== name));

  const addSingularCategory = (name: ProjectCategories) =>
    setCategories([name]);

  const addAllCategories = () =>
    setCategories(
      Object.entries(ProjectCategories).map(([_key, category]) => category)
    );

  const setSort = (key: keyof BlogImageOrdering) => setSortState(key);

  const value = {
    categories,
    addCategory,
    removeCategory,
    addSingularCategory,
    addAllCategories,
    sort,
    setSort,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
