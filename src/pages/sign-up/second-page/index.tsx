import toast from "react-hot-toast";
import EColorPalette from "../../../enums/EColorPalette";
import PasswordInput from "../../../components/input/password-input";

import { Dayjs } from "dayjs";
import { api } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Form, { IButton } from "../../../components/form";
import { StyledBar, StyledProgress, StyledSpan, StyledText } from "../style";

interface ISecondPageProps {
    completeName: string;
    username: string;
    email: string;
    birthDate: Dayjs | null;
    setInit: (e: boolean) => void;
}

interface INumberDictionary {
    [key: number]: string;
}

const SecondPage = ({ completeName, username, email, birthDate, setInit }: ISecondPageProps) => {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [invalidPassword, setInvalidPassword] = useState(false);
    const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(false);

    const [passwordProgress, setPasswordProgress] = useState(0);
    const [color, setColor] = useState(EColorPalette.JET.toString());

    const [rules, setRules] = useState({
        charRule: false,
        letterRule: false,
        numberRule: false,
        matchRule: false
    });

    const colors: INumberDictionary = {
        1: "#ad2222",
        2: "#c57233",
        3: "#d1a71a",
        4: "#4fa032"
    };

    useEffect(() => {
        const updatedRules = {
            charRule: password.length >= 8,
            letterRule: /[a-zA-Z]/.test(password),
            numberRule: /\d/.test(password),
            matchRule: password === confirmPassword && password.length > 0
        };

        setRules(updatedRules);

        const progress = Object.values(updatedRules).filter(Boolean).length;
        setColor(colors[progress]);
        setPasswordProgress(progress / 4);

        setInvalidPassword(!(password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password)));
        setInvalidConfirmPassword(!(confirmPassword === password && password.length > 0));
    }, [password, confirmPassword]);

    const register = async (e: React.FormEvent) => {

        e.preventDefault();

        if (invalidPassword) {
            toast.error("Invalid password!");
            return;
        }
        
        if (password !== confirmPassword) {
            toast.error("Password and confirm password must match!");
            return;
        }

        try {
            const response = await api.post("/users", {
                name: completeName,
                username,
                email,
                birthdate: birthDate,
                password,
            });

            navigate("/");
            toast.success("New account created!");
        } catch (error: any) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    };
    const button: IButton = {
        title: "Sign up",
        action: register,
    };

    const PasswordForm = () => (
        <>
            <PasswordInput onChange={(e) => setPassword(e.target.value)} error={invalidPassword} />
            <PasswordInput label="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} error={invalidConfirmPassword} show={false} />

            <StyledProgress>
                <StyledBar width={`${passwordProgress * 100}%`} bgcolor={color} />
            </StyledProgress>

            <StyledText>
                <StyledSpan>{(rules.charRule ? "✔️" : "❌") + " Be at least 8 characters long."}</StyledSpan>
                <StyledSpan>{(rules.letterRule ? "✔️" : "❌") + " Contain at least one letter."}</StyledSpan>
                <StyledSpan>{(rules.numberRule ? "✔️" : "❌") + " Contain at least one number."}</StyledSpan>
                <StyledSpan>{(rules.matchRule ? "✔️" : "❌") + " Match with the confirmation password."}</StyledSpan>
            </StyledText>
        </>
    );

    return (
        <Form actionBack={() => setInit(true)} title="Register password" inputs={PasswordForm()} button={button} />
    );
};

export default SecondPage;
