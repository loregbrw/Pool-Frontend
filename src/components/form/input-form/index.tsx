import BackImg from "/Back.png";

import { IFormProps } from ".."
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StyledBack, StyledButton, StyledContainer, StyledDate, StyledDiv, StyledField, StyledForm, StyledHeader, StyledInput, StyledObs, StyledTitle } from "./style"
import EColorPalette from "../../../enums/EColorPalette";

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
                                {inputs.map((input, index) => (
                                    <StyledField key={index}>
                                        {input.type === 'date' ? (
                                            <StyledDate
                                                label={input.label}
                                                onChange={(e) => input.onChange(e)}
                                                slotProps={{
                                                    textField: {
                                                        required: true,
                                                    },
                                                }}
                                            />
                                        ) : (
                                            <StyledInput
                                                type={input.type}
                                                label={input.label}
                                                onChange={(e) => input.onChange(e.target.value)}
                                                inputProps={{ maxLength: 255 }}
                                                required
                                            />
                                        )}

                                        {input.obs && (
                                            <StyledObs
                                                fontSize={"14px"}
                                                fontWeight={700}
                                                color={EColorPalette.JET}
                                                onClick={input.obs.action}
                                            >
                                                {input.obs.obs}
                                            </StyledObs>
                                        )}
                                    </StyledField>
                                ))}
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