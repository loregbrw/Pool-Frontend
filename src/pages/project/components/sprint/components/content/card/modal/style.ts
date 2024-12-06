import styled from "styled-components";
import chroma from "chroma-js";
import EColorPalette from "../../../../../../../../enums/EColorPalette";
import { Grid } from "@mui/material";

export const StyledTitle = styled.span`
    font-size: 17px !important;
    font-weight: 700;

    user-select: none;
    cursor: pointer;

    white-space: normal;
`

export const StyledDiv = styled.div`
    display: flex;
    align-items: flex-start;

    justify-content: space-between;

    width: 100%;
`

export const StyledInput = styled.input`
    font-size: 16px !important;
    font-weight: 700;

    min-width: fit-content;
    background-color: transparent;

    min-width: 150px;
    width: 100%;

    border-radius: 5px;
    border: 2px solid ${EColorPalette.JET};

    padding: 0 3px;
    text-align: center;
`

export const StyledSection = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;

    gap: 7px;

    background-color: ${chroma(EColorPalette.MINTCREAM).darken(0.2).hex()};
    padding: 10px;
    border-radius: 5px;
`

export const StyledSectionTitle = styled.span`
    font-size: 15px !important;
    font-weight: 600;
`

export const StyledButton = styled.button`
    padding: 2px 12px;
    border: none;

    color: ${EColorPalette.MINTCREAM};
    background-color: ${EColorPalette.JET};

    filter: opacity(40%);
    border-radius: 3px;

    transition: 300ms;
    cursor: pointer;

    &:hover {
        filter: opacity(50%);
    }
`

export const StyledDescription = styled.span`
    width: 100%;
    white-space: normal;

    text-align: justify;

    font-size: 14px;
`

export const StyledCardButton = styled.button`
    width: 100%;

    color: ${EColorPalette.MINTCREAM};
    background-color: ${EColorPalette.JET};

    border: none;
    border-radius: 3px;

    padding: 5px 0;

    cursor: pointer;
    transition: 300ms;

    font-size: 12px;
    font-weight: 500;

    &:hover {
        background-color: ${chroma(EColorPalette.JET).darken(1).hex()};
    }
`

export const StyledGrid = styled(Grid)`
    align-items: stretch;
    cursor: pointer;
`
