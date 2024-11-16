'use client'

const { useContext, useState, createContext } = require("react")

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    let usuario = null;
    if (localStorage.getItem('usuario') != null)
        usuario = JSON.parse(localStorage.getItem("usuario"));

    const [user, setUser] = useState(usuario);
    console.log(user);

    return <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
}

export default UserContext;