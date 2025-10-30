import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie"

export const AuthContext = createContext();



export const AuthProvider = ({children})=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Currently token is getting undefined
    const token =  Cookies.get("token");


    useEffect(()=>{

        const token =  Cookies.get("token");

        if(token){
            setIsAuthenticated(true)
        }else{
            setIsAuthenticated(false);
        }

    },[]);


    const login = (token) =>{
        Cookies.set("token", token, {expires: 7});
        setIsAuthenticated(true);
    }

    const logout = (token) =>{
        Cookies.remove("token");
        setIsAuthenticated(false);
    }


    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )



}