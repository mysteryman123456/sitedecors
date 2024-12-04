import React, { createContext, useState, useContext } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [activeButton, setActiveButton] = useState(0);

  return (
    <CategoryContext.Provider value={{ activeButton, setActiveButton }}>
      {children}
    </CategoryContext.Provider>
  );
};


export const useCategory = () => useContext(CategoryContext);