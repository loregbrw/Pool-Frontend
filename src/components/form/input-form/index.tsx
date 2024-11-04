import BackImg from "/Back.png";

import { IFormProps } from ".."
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StyledBack, StyledButton, StyledContainer, StyledDiv, StyledForm, StyledHeader, StyledTitle } from "./style"

const InputForm = ({ title, inputs, button, actionBack: back }: IFormProps) => {
    return (
        <>
            <StyledHeader />
            <StyledContainer>
                <StyledBack onClick={back} src={BackImg} />
                <StyledForm onSubmit={(e) => button.action(e)}>
                    <StyledTitle>{title}</StyledTitle>
                    <StyledDiv>
                        {
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                { inputs }
                            </LocalizationProvider>
                        }

                    </StyledDiv>
                    <StyledButton
                        size="large"
                        variant="contained"
                        type="submit"
                    > {button.title}
                    </StyledButton>
                </StyledForm>
            </StyledContainer>
        </>
    )
}

export default InputForm;