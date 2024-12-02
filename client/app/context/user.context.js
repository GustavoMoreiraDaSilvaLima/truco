'use client'

const { useContext, useState, createContext, useEffect } = require("react")

const UserContext = createContext();

export const UserProvider = ({ children }) => {


    let usuario = null;
    const [user, setUser] = useState(usuario);
    useEffect(()=>{
        if(localStorage.getItem('usuario') != null){
            usuario = JSON.parse(localStorage.getItem("usuario"));
            setUser(usuario);
        }
    },[]);
    
    return <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
}

export default UserContext;