import toast from "react-hot-toast";

import dayjs, { Dayjs } from "dayjs";
import { StyledSpan } from "../style";
import React, { useState } from "react";
import { api } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import Form, { IButton } from "../../../components/form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StyledContainer } from "../../../components/input/password-input/style";
import { StyledDate, StyledInput } from "../../../components/form/input-form/style";

interface IFirstPageProps {
    setInit: (e: boolean) => void;

    completeName: string;
    setCompleteName: (e: string) => void;
    username: string;
    setUsername: (e: string) => void;
    email: string;
    setEmail: (e: string) => void;
    birthDate: Dayjs | null;
    setBirthDate: (e: Dayjs | null) => void;
}

const FirstPage = ({ completeName, setCompleteName, username, setUsername, email, setEmail, birthDate, setBirthDate, setInit }: IFirstPageProps) => {

    const navigate = useNavigate();

    const [invalidBirthDate, setInvalidBirthDate] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidUsername, setInvalidUsername] = useState(false);

    const button: IButton = {
        title: "Continue",
        action: (e: React.FormEvent) => {
            e.preventDefault();

            if (invalidBirthDate)
                toast.error("Invalid birth date!");
            else if (invalidEmail)
                toast.error("Invalid email!");
            else if (invalidUsername)
                toast.error("Invalid username!");

            setInit(false);
        }
    }

    const checkData = async (data: string): Promise<boolean> => {
        try {
            if (data) {
                const response = await api.get(`/users/exists/${data}`);
                console.log(response.data)
                return response.data.exists;
            }
            return false;
        } catch (error: any) {
            console.log(error);
            return true;
        }
    }

    const checkDate = (date: Dayjs | null): boolean => {
        if (!date) return true;

        const today = dayjs();
        const age = today.diff(date, 'year');
        return age >= 13 && age <= 120;
    }

    const checkusername = async (value: string) => {
        setUsername(value);
        setInvalidUsername(await checkData(value) || !/^[a-zA-Z0-9_.]*$/.test(value));
    }

    const checkEmail = async (value: string) => {
        setEmail(value);
        setInvalidEmail(await checkData(value) || !/^(|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(value));
    }

    const checkBirthDate = (value: Dayjs | null) => {
        setBirthDate(value);
        setInvalidBirthDate(!checkDate(value));
    }

    const RegisterForm = () => {
        return (
            <>
                <StyledInput
                    type="text"
                    label="Complete name"
                    value={completeName}
                    onChange={(e) => { setCompleteName(e.target.value) }}
                    inputProps={{ maxLength: 255 }}
                    required
                />
                <StyledInput
                    type="text"
                    label="Username"
                    value={username}
                    error={invalidUsername}
                    onChange={(e) => checkusername(e.target.value)}
                    inputProps={{ maxLength: 50 }}
                    required
                />
                <StyledInput
                    type="email"
                    label="Email"
                    value={email}
                    error={invalidEmail}
                    onChange={(e) => checkEmail(e.target.value)}
                    inputProps={{ maxLength: 255 }}
                    required
                />
                <StyledContainer>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StyledDate
                            label="Date of birth"
                            value={birthDate}
                            error={invalidBirthDate}
                            onChange={(e) => checkBirthDate(e)}
                            slotProps={{
                                textField: {
                                    required: true,
                                }
                            }}
                        />
                    </LocalizationProvider>
                    <StyledSpan>*Pool users must be 13 or older.</StyledSpan>
                </StyledContainer>
            </>
        )
    }

    return (
        <>
            <Form actionBack={() => navigate("/")} title={"Welcome to Pool"} inputs={RegisterForm()} button={button} />
        </>
    )
}

export default FirstPage;