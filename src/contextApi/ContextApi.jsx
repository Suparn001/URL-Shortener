import { createContext, useContext, useState } from "react";

// ✅ EXPORT CONTEXT
//This creates a global data container
const ContextApi = createContext(null);


//Provide Context
export const ContextProvider = ({ children }) => {
    const getToken = localStorage.getItem("JWT_TOKEN")
        ? JSON.parse(localStorage.getItem("JWT_TOKEN"))
        : null;

    const [token, setToken] = useState(getToken);

    return (
        <ContextApi.Provider value={{ token, setToken }}>
            {children}
        </ContextApi.Provider>
    );
};


export const useStoreContext = () => {
    const context = useContext(ContextApi);
    return context;
}