import React, { useState } from "react";
import { StyledInput } from "../../form/input-form/style";
import { StyledContainer, StyledObs, StyledLink, StyledSpan, StyledDiv } from "./style";

interface IPasswordInputProps {
    error?: boolean;
    obs?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    show?: boolean;
}

const PasswordInput = ({ onChange, obs, error, label, show }: IPasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <StyledContainer>
                <StyledInput
                    error={error}
                    type={showPassword ? "text" : "password"}
                    label={label ? label : "Password"}
                    onChange={onChange}
                    inputProps={{ maxLength: 100 }}
                    required
                />
                <StyledObs>
                    {
                        show || show === undefined &&
                        <StyledDiv>
                            <input type="checkbox" onChange={(e) => setShowPassword(e.target.checked)} style={{ cursor: "pointer" }} />
                            <StyledSpan>Show password</StyledSpan>
                        </StyledDiv>
                    }
                    <StyledLink to={""} style={{ justifySelf: "flex-end" }}>{obs}</StyledLink>
                </StyledObs>
            </StyledContainer>
        </>

    );
};

export default PasswordInput;
