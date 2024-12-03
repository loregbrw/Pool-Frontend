import { StyledLink } from "./style";
import { StyledHr, StyledModal } from "../style";
import React from "react";

interface IOptionsModal {
    options: {
        action: () => void,
        label: string
    }[],
    align?: "left" | "right";
}

const OptionsModal = ({ options, align }: IOptionsModal) => {
    return (
        <>
            <StyledModal elevation={3} style={{ top: "35px", right: "0", width: "110px", padding: "10px", gap: "5px" }} >
                {
                    options.map((op, index) => (
                        <React.Fragment key={index}>
                            <StyledLink onClick={op.action} style={{ textAlign: align || "left" }} >{op.label}</StyledLink>
                            {
                                index != options.length - 1 && 
                                <StyledHr />
                            }
                        </React.Fragment>
                    ))
                }
            </StyledModal>
        </>
    )
}

export default OptionsModal;