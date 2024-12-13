import React from "react";

import { StyledLink } from "./style";
import { StyledHr, StyledModal } from "../style";
import { Box } from "@mui/material";

interface IOptionsModal {
    options: {
        action: () => void,
        label: string
    }[],
    align?: "left" | "right";
    onClose: () => void;
}

const OptionsModal = ({ onClose, options, align }: IOptionsModal) => {
    return (
        <>
            <Box onClick={onClose} sx={{ cursor: "default", position: "fixed", width: "100%", height: "100%", backgroundColor: "rgba(51, 49, 56, 0.25)", top: 0, left: 0, zIndex: 9999 }} />
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