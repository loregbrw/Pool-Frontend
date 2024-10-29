import React, { useState } from "react"
import toast from "react-hot-toast";

import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import Form, { IButton, IInput } from "../../components/form";

const Login = () => {
    
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    
    const doLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth", {
                login: login,
                password: password
            });

            localStorage.setItem("Token", response.data.token);

            navigate("/home");
            toast.success("User logged successfully!");
            
        } catch (error: any) {

            console.log(error);

            if (error.response.data.message) {
                toast.error(error.response.data.message);
                return;
            }

            toast.error(error.message);
        }
    }
    
    
    const inputs: IInput[] = [
        { label: "Email or username", type: "text", onChange: (l) => setLogin(l) },
        { label: "Password", type: "password", obs: {obs: "Esqueceu a senha?", action: () => {}}, onChange: (p) => setPassword(p) }
    ]
    
    const button: IButton = {
        title: "Submit",
        action: doLogin
    }
    return (
        <>
            <Form actionBack={() => navigate("/")} title={"Login"} inputs={inputs} button={button} />
        </>
    )
}

export default Login;