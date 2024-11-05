import React from "react";
import Logo from "./logo";
import InputForm from "./input-form";

import { StyledContainer } from "./style";

export interface IFormProps {
    title: string;
    inputs: React.ReactNode;
    button: IButton;
    actionBack: () => void;
}

export interface IButton {
    title: string;
    action: (e: any) => void;
}

export interface IObs {
    obs: string;
    action: () => void;
}

const Form = ({ title, inputs, button, actionBack: back }: IFormProps) => {
    return (
        <>
            <StyledContainer>
                <Logo />
                <InputForm actionBack={back} title={title} inputs={inputs} button={{ title: button.title, action: button.action }} />
            </StyledContainer>
        </>
    )
}

export default Form;