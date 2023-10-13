import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";


export default function LoginAndRegister({ onCloseModal }) {

    const [isRegister, setIsRegister] = useState(false);


    return (isRegister ? (
        <RegisterForm setIsRegister={setIsRegister} onCloseModal={onCloseModal} />
    ) : (
        <LoginForm setIsRegister={setIsRegister} onCloseModal={onCloseModal} />
    ))
}
