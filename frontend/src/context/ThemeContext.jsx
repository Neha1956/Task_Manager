import { createContext,useState } from "react";
const ThemeContext=createContext();
const ThemeProvider=({children})=>{
   const [darkMode,setDarkMode]=useState("light");
   const[toggle,setToggle]=useState(false);
   const toggleTheme = () => {
  setDarkMode((prev) => (prev === "light" ? "dark" : "light"));
};
   
   const toggleSidebar=()=>{
    setToggle(!toggle);
   }
    return (
        <ThemeContext.Provider value={{ toggleTheme, darkMode,setDarkMode,toggle,setToggle,toggleSidebar }}>
            {children}
        </ThemeContext.Provider>
    );
};
export { ThemeContext, ThemeProvider };