'use client'

const { useContext, useState, createContext, useEffect } = require("react")

const UserContext = createContext();

export const UserProvider = ({ children }) => {



    const [user, setUser] = useState(null);
    useEffect(()=>{
        if(localStorage.getItem('usuario') != null){
            const usuario = JSON.parse(localStorage.getItem("usuario"));
            setUser(usuario);
        }
    },[]);
    
    return <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
}

export default UserContext;