import chroma from "chroma-js";
import styled from "styled-components";
import EColorPalette from "../enums/EColorPalette";

import { Button } from "@mui/material";

export const getContrastYIQ = (bgcolor: string) => {
    const hex = bgcolor.replace('#', '');
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    const yiq = (r * 299 + g * 587 + b * 114) / 255000;
    
    return yiq >= 0.5 ? 'black' : 'white'; 
}

export const StyledMain = styled.main`
    display: flex;
    flex-direction: column;

    width: 100%;

    min-height: 100vh;
    height: fit-content;

    align-items: center;

    gap: 25px;

    padding: 70px max(5%, 25px) max(5%, 25px) max(5%, 25px);
`

export const StyledButton = styled(Button)<{ bgcolor: string }>`
    && {

    height: 100%;

    border-radius: 5px;
    color: ${EColorPalette.MINTCREAM};
    background-color: ${(props) => props.bgcolor};

    padding: 5px 20px;
    text-transform: none;

    font-size: 12px;
    font-weight: 700;
    font-family: 'Euclid Circular A', sans-serif;

    cursor: pointer;
        transition: 300ms;
    }


    &:hover {
        background-color: ${(props) => chroma(props.bgcolor).darken(1).hex()};
    }
`