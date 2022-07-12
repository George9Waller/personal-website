import React, { useState } from "react";
import { createContext, useContext } from "react";
import { ProjectCategories } from "../../utils/projects";

interface IAppContext {
  categories: string[];
  addCategory: (name: ProjectCategories) => void;
  removeCategory: (name: ProjectCategories) => void;
}

const appContextDefaultValues: IAppContext = {
  categories: Object.entries(ProjectCategories).map(([_key, category]) => category),
  addCategory: (name) => {},
  removeCategory: (name) => {},
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

  const addCategory = (name: ProjectCategories) =>
    setCategories([...categories, name]);

  const removeCategory = (name: ProjectCategories) =>
    setCategories(categories.filter((value: string) => value !== name));

  const value = {
    categories,
    addCategory,
    removeCategory,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
