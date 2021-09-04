import { Button } from "antd"
import React, { useState } from "react"
import { LoginScreen } from "./login"
import { RegisterScreen } from "./register"

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] =  useState(false)

    return <div>
        {
            isRegister ? <RegisterScreen/> : <LoginScreen/>
        }
        <Button onClick={() => setIsRegister(!isRegister)}>切换到{isRegister ? '登录' : '注册'}</Button>
    </div>

}