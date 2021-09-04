import React, {ReactNode} from "react";
import { useState } from "react";
import {User} from "../screens/project-list/search-panel"
import * as auth from "../auth-provider"

interface AuthForm {
    username: string,
    password: string
}

const AuthContext = React.createContext<{
    user: User | null,
    register: (form: AuthForm) => Promise<void>,
    login: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>
} | undefined>(undefined);

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    //point free
    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))

    return <AuthContext.Provider children={children} value={{user, register, login, logout}}/>
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}