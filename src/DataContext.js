import React, {
  useState,
  createContext,

} from "react";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [showNavbar,setShowNavbar] = useState(false);
    const navigate =useNavigate();
    const [role,setRole]=useState("admin");
    const[value,setValue]= useState([]);
  return (
    <DataContext.Provider
      value={{
      showNavbar,
      setShowNavbar,
      navigate,
      role,
      setRole,
      value,
      setValue
        }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
