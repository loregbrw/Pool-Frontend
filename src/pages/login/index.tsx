import toast from "react-hot-toast";
import React, { useState } from "react"
import PasswordInput from "../../components/input/password-input";

import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import Form, { IButton } from "../../components/form";
import { StyledInput } from "../../components/form/input-form/style";

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

    const button: IButton = {
        title: "Sign in",
        action: doLogin
    }

    const LoginForm = () => {
        return (
            <>

                <StyledInput
                    type="text"
                    label="Email or username"
                    onChange={(e) => setLogin(e.target.value)}
                    inputProps={{ maxLength: 255 }}
                    required
                />
                <PasswordInput onChange={(e) => setPassword(e.target.value)} obs="Forgot password?" />
            </>
        )
    }

    return (
        <>
            <Form actionBack={() => navigate("/")} title={"Welcome back"} inputs={LoginForm()} button={button} />
        </>
    )
}

export default Login;