import styled from "styled-components";
import EColorPalette from "../../enums/EColorPalette";

import { Paper } from "@mui/material";

export const StyledModalBackground = styled.div`
    height: 100vh;
    width: 100%;

    top: 0;
    left: 0;

    z-index: 999;
    position: fixed;

    background-color: ${EColorPalette.JET};
    filter: opacity(25%);
`

export const StyledModal = styled(Paper)`

    z-index: 1000;
    position: absolute;

    padding: 15px;
    border-radius: 5px;

    display: flex;
    flex-direction: column;

    gap: 15px;
    align-items: center;

    && {

        background-color: ${EColorPalette.MINTCREAM};
    }

    overflow-x: auto;
    white-space: nowrap;

    &::-webkit-scrollbar {
        background-color: ${EColorPalette.COOLGRAY};
        width: 10px;

        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${EColorPalette.FRENCHGRAY};
        border-radius: 15px;

        border: solid ${EColorPalette.COOLGRAY} 2px;
    }
`

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;

    gap: 15px;
    align-items: center;

    width: 100%;
    padding: 10px;
`

export const StyledTitle = styled.span`
    font-size: 18px;
    font-weight: 600;

    cursor: default;
`

export const StyledInput = styled.input<{ error?: boolean }>`
    border: none;

    height: 30px;
    padding: 3px 5px;
    background-color: ${EColorPalette.FRENCHGRAY};

    width: 100%;
    border-radius: 5px;

    color: ${(props) => props.error ? EColorPalette.ENGINEERINGORANGE : EColorPalette.JET};

    border: ${(props) => props.error ? `solid 2px ${EColorPalette.ENGINEERINGORANGE}` : "none" };
`

export const StyledLabel = styled.span`
    font-size: 14px;
    font-weight: 500;

    cursor: default;
`

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;

    gap: 1px;
`


export const StyledHr = styled.hr`
    width: 100%;
    border-color: ${EColorPalette.JET};

    height: fit-content;
    align-self: center;
`