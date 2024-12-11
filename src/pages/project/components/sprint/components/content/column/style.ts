import styled from "styled-components";
import EColorPalette from "../../../../../../../enums/EColorPalette";

import { Paper } from "@mui/material";

export const StyledColumn = styled(Paper)`

    width: 265px;
    
    && {
        border-radius: 5px;
        background-color: ${EColorPalette.COOLGRAY};
    }
    
    gap: 7px;
    padding: 8px;
    
    display: flex;
    flex-direction: column;
    height: fit-content;
`

export const StyledSpaceBetween = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 5px;
    width: 100%;
`

export const StyledContent = styled.div`
    height: fit-content;
    max-height: calc(100vh - 280px);
    width: 100%;

    overflow-y: auto;
    white-space: nowrap;

    &::-webkit-scrollbar {
        background-color: ${EColorPalette.JET};
        width: 8px;

        border-radius: 10px;
        cursor: default;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${EColorPalette.COOLGRAY};
        border-radius: 15px;

        border: solid ${EColorPalette.JET} 2px;
        cursor: pointer;
    }
`

export const StyledSections = styled.div`
    display: flex;
    flex-direction: column;

    gap: 10px;
    width: 100%;
`
